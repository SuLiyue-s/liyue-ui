import React, { createContext, useContext, useState, useCallback, useMemo, useRef, forwardRef } from 'react';
import './Form.css';

export interface FormItemProps {
  /** 字段名 */
  name?: string;
  /** 标签 */
  label?: string;
  /** 初始值 */
  initialValue?: any;
  /** 验证规则 */
  rules?: ValidationRule[];
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  type?: 'string' | 'number' | 'email' | 'url' | 'pattern';
  pattern?: RegExp;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  validator?: (value: any) => boolean | string;
}

export interface FormProps {
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right' | 'center';
  /** 标签宽度 */
  labelWidth?: string | number;
  /** 表单数据 */
  value?: Record<string, any>;
  /** 默认表单数据 */
  defaultValue?: Record<string, any>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 变化回调 */
  onChange?: (values: Record<string, any>) => void;
  /** 提交回调 */
  onSubmit?: (values: Record<string, any>) => void;
  /** 重置回调 */
  onReset?: () => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  disabled: boolean;
  labelWidth?: string | number;
  labelAlign?: 'left' | 'right' | 'center';
  layout?: 'horizontal' | 'vertical' | 'inline';
  registerField: (name: string, field: { value: any; rules?: ValidationRule[]; required?: boolean }) => void;
  unregisterField: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => Promise<boolean>;
  validateAll: () => Promise<boolean>;
  resetFields: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form');
  }
  return context;
};

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      layout = 'vertical',
      labelAlign = 'right',
      labelWidth,
      value,
      defaultValue = {},
      disabled = false,
      onChange,
      onSubmit,
      onReset,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const [internalValues, setInternalValues] = useState<Record<string, any>>(defaultValue);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [fields, setFields] = useState<Record<string, { value: any; rules?: ValidationRule[]; required?: boolean }>>({});

    const values = value !== undefined ? value : internalValues;
    const isValueControlled = value !== undefined;

    const registerField = useCallback((name: string, field: { value: any; rules?: ValidationRule[]; required?: boolean }) => {
      setFields(prev => ({ ...prev, [name]: field }));
    }, []);

    const unregisterField = useCallback((name: string) => {
      setFields(prev => {
        const newFields = { ...prev };
        delete newFields[name];
        return newFields;
      });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setTouched(prev => {
        const newTouched = { ...prev };
        delete newTouched[name];
        return newTouched;
      });
    }, []);

    const setFieldValue = useCallback((name: string, value: any) => {
      if (!isValueControlled) {
        setInternalValues(prev => ({ ...prev, [name]: value }));
      }
      if (touched[name]) {
        validateField(name);
      }
      onChange?.({ ...values, [name]: value });
    }, [isValueControlled, touched, values, onChange]);

    const setFieldError = useCallback((name: string, error: string) => {
      setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
      setTouched(prev => ({ ...prev, [name]: isTouched }));
    }, []);

    const validateRule = (value: any, rule: ValidationRule): string | null => {
      if (rule.required && (value === undefined || value === null || value === '')) {
        return rule.message || '此字段为必填项';
      }
      if (value === undefined || value === null || value === '') {
        return null;
      }
      if (rule.type === 'string' && typeof value !== 'string') {
        return rule.message || '请输入字符串';
      }
      if (rule.type === 'number' && typeof value !== 'number') {
        return rule.message || '请输入数字';
      }
      if (rule.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return rule.message || '请输入有效的邮箱地址';
        }
      }
      if (rule.type === 'url') {
        try {
          new URL(value);
        } catch {
          return rule.message || '请输入有效的URL';
        }
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message || '格式不正确';
      }
      if (rule.minLength && value.length < rule.minLength) {
        return rule.message || `至少需要 ${rule.minLength} 个字符`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return rule.message || `最多只能输入 ${rule.maxLength} 个字符`;
      }
      if (rule.min !== undefined && Number(value) < rule.min) {
        return rule.message || `值不能小于 ${rule.min}`;
      }
      if (rule.max !== undefined && Number(value) > rule.max) {
        return rule.message || `值不能大于 ${rule.max}`;
      }
      if (rule.validator) {
        const result = rule.validator(value);
        if (result !== true && typeof result === 'string') {
          return result;
        } else if (result === false) {
          return rule.message || '验证失败';
        }
      }
      return null;
    };

    const validateField = useCallback(async (name: string): Promise<boolean> => {
      const field = fields[name];
      if (!field) return true;

      const value = values[name];
      const fieldRules = field.rules || [];

      for (const rule of fieldRules) {
        const error = validateRule(value, rule);
        if (error) {
          setErrors(prev => ({ ...prev, [name]: error }));
          return false;
        }
      }

      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    }, [fields, values]);

    const validateAll = useCallback(async (): Promise<boolean> => {
      let isValid = true;
      for (const name of Object.keys(fields)) {
        const valid = await validateField(name);
        if (!valid) isValid = false;
      }
      return isValid;
    }, [fields, validateField]);

    const resetFields = useCallback(() => {
      if (!isValueControlled) {
        setInternalValues(defaultValue);
      }
      setErrors({});
      setTouched({});
      onReset?.();
    }, [isValueControlled, defaultValue, onReset]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = await validateAll();
      if (isValid) {
        onSubmit?.(values);
      }
    }, [validateAll, values, onSubmit]);

    const handleReset = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      resetFields();
    }, [resetFields]);

    const contextValue = useMemo(() => ({
      values,
      errors,
      touched,
      disabled,
      labelWidth: labelWidth || (layout === 'horizontal' ? '100px' : undefined),
      labelAlign,
      layout,
      registerField,
      unregisterField,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      validateAll,
      resetFields,
    }), [values, errors, touched, disabled, labelWidth, labelAlign, layout, registerField, unregisterField, setFieldValue, setFieldError, setFieldTouched, validateField, validateAll, resetFields]);

    const classes = ['ly-form', `ly-form--${layout}`];
    if (className) classes.push(className);

    return (
      <FormContext.Provider value={contextValue}>
        <form ref={ref} className={classes.join(' ')} style={style} onSubmit={handleSubmit} onReset={handleReset}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      name,
      label,
      initialValue,
      rules,
      required,
      error,
      disabled,
      children,
      className = '',
      style
    },
    ref
  ) => {
    const context = useFormContext();
    const contextRef = useRef(context);
    contextRef.current = context;
    const [internalError, setInternalError] = useState<string>('');

    React.useEffect(() => {
      const currentContext = contextRef.current;
      if (name && currentContext) {
        currentContext.registerField(name, { value: initialValue, rules, required });
      }
      return () => {
        const cleanupContext = contextRef.current;
        if (name && cleanupContext) {
          cleanupContext.unregisterField(name);
        }
      };
    }, [name, initialValue, rules, required]);

    React.useEffect(() => {
      if (context) {
        setInternalError(context.errors[name || ''] || '');
      }
    }, [context, name, error]);

    const handleChange = (value: any) => {
      const currentContext = contextRef.current;
      if (name && currentContext) {
        currentContext.setFieldValue(name, value);
        currentContext.setFieldTouched(name, true);
        validateField(name, value);
      }
    };

    const validateField = (_fieldName: string, value: any) => {
      const fieldRules = rules || [];
      for (const rule of fieldRules) {
        const error = validateRule(value, rule);
        if (error) {
          setInternalError(error);
          return;
        }
      }
      setInternalError('');
    };

    const validateRule = (value: any, rule: ValidationRule): string | null => {
      if (rule.required && (value === undefined || value === null || value === '')) {
        return rule.message || '此字段为必填项';
      }
      if (value === undefined || value === null || value === '') {
        return null;
      }
      if (rule.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return rule.message || '请输入有效的邮箱地址';
        }
      }
      if (rule.minLength && value.length < rule.minLength) {
        return rule.message || `至少需要 ${rule.minLength} 个字符`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return rule.message || `最多只能输入 ${rule.maxLength} 个字符`;
      }
      return null;
    };

    const displayError = error || internalError;
    const isRequired = required || rules?.some(r => r.required);

    const labelStyle = context?.labelWidth ? { width: context.labelWidth } : {};

    const classes = ['ly-form-item'];
    if (displayError) classes.push('ly-form-item--error');
    if (className) classes.push(className);

    const child = React.Children.only(children);
    const childWithProps = React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, {
          onChange: handleChange,
          disabled: disabled || context?.disabled,
          name,
        })
      : children;

    return (
      <div ref={ref} className={classes.join(' ')} style={style}>
        {label && (
          <label className="ly-form-item__label" style={labelStyle}>
            {isRequired && <span className="ly-form-item__required">*</span>}
            {label}
          </label>
        )}
        <div className="ly-form-item__control">
          {childWithProps}
          {displayError && <div className="ly-form-item__error">{displayError}</div>}
        </div>
      </div>
    );
  }
);

Form.displayName = 'Form';
FormItem.displayName = 'FormItem';

export default Form;
