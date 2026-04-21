import React, { forwardRef, useMemo } from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 输入框大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 输入框类型 */
  type?: string;
  /** 前缀图标 */
  prefix?: React.ReactNode;
  /** 后缀图标 */
  suffix?: React.ReactNode;
  /** 前置标签 */
  prepend?: React.ReactNode;
  /** 后置标签 */
  append?: React.ReactNode;
  /** 输入框宽度 */
  width?: string | number;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 是否显示密码切换按钮 */
  showPasswordToggle?: boolean;
  /** 是否有边框 */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
}

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      size = 'md',
      type = 'text',
      prefix,
      suffix,
      prepend,
      append,
      width,
      clearable = false,
      showPasswordToggle = false,
      bordered = true,
      className = '',
      style,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || value || '');
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const currentValue = value !== undefined ? value : internalValue;
    const isControlled = value !== undefined;

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      select: () => inputRef.current?.select(),
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      const event = new Event('change', { bubbles: true });
      const target = inputRef.current || document.createElement('input');
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.dispatchEvent(event);
      }
      onChange?.({
        ...event,
        target: inputRef.current || target,
        currentTarget: inputRef.current || target,
      } as React.ChangeEvent<HTMLInputElement>);
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const inputType = useMemo(() => {
      if (type === 'password') {
        return showPasswordToggle ? (passwordVisible ? 'text' : 'password') : 'password';
      }
      return type;
    }, [type, showPasswordToggle, passwordVisible]);

    const classes = useMemo(() => {
      const classList = ['ly-input', `ly-input--${size}`];
      if (prepend) classList.push('ly-input--has-prepend');
      if (append) classList.push('ly-input--has-append');
      if (!bordered) classList.push('ly-input--borderless');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, prepend, append, bordered, className]);

    const wrapperStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      return customStyle;
    }, [width, style]);

    const showClearButton = clearable && currentValue && String(currentValue).length > 0;

    return (
      <div className={classes} style={wrapperStyle}>
        {prepend && <div className="ly-input__prepend">{prepend}</div>}
        <div className="ly-input__wrapper">
          {prefix && <span className="ly-input__prefix">{prefix}</span>}
          <input
            ref={inputRef}
            className="ly-input__inner"
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            {...props}
          />
          {showClearButton && (
            <span className="ly-input__clear" onClick={handleClear}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          )}
          {type === 'password' && showPasswordToggle && (
            <span className="ly-input__password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          )}
          {suffix && <span className="ly-input__suffix">{suffix}</span>}
        </div>
        {append && <div className="ly-input__append">{append}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
