import React, { forwardRef, useMemo } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否不确定状态 */
  indeterminate?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 标签 */
  label?: string;
  /** 值 */
  value?: string | number;
  /** 变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps {
  /** 选项列表 */
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
  /** 当前值 */
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 变化回调 */
  onChange?: (value: (string | number)[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      disabled = false,
      indeterminate = false,
      size = 'md',
      label,
      value,
      onChange,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(checked || false);
    const isControlled = checked !== undefined;

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    const classes = useMemo(() => {
      const classList = ['ly-checkbox', `ly-checkbox--${size}`];
      if (internalChecked) classList.push('ly-checkbox--checked');
      if (indeterminate) classList.push('ly-checkbox--indeterminate');
      if (disabled) classList.push('ly-checkbox--disabled');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, internalChecked, indeterminate, disabled, className]);

    return (
      <label className={classes} style={style}>
        <input
          ref={ref}
          type="checkbox"
          className="ly-checkbox__input"
          checked={internalChecked}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <span className="ly-checkbox__box">
          {internalChecked && !indeterminate && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {indeterminate && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
        {label && <span className="ly-checkbox__label">{label}</span>}
      </label>
    );
  }
);

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options = [],
      value,
      defaultValue = [],
      disabled = false,
      direction = 'horizontal',
      onChange,
      className = '',
      style,
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<(string | number)[]>(() => {
      if (value !== undefined) return value;
      return defaultValue;
    });

    const isControlled = value !== undefined;

    React.useEffect(() => {
      if (isControlled && value !== undefined) {
        setSelectedValues(value);
      }
    }, [value, isControlled]);

    const handleChange = (optionValue: string | number, checked: boolean) => {
      let newValues: (string | number)[];
      if (checked) {
        newValues = [...selectedValues, optionValue];
      } else {
        newValues = selectedValues.filter(v => v !== optionValue);
      }
      if (!isControlled) {
        setSelectedValues(newValues);
      }
      onChange?.(newValues);
    };

    const classes = useMemo(() => {
      const classList = ['ly-checkbox-group', `ly-checkbox-group--${direction}`];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [direction, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedValues.includes(option.value)}
            disabled={disabled || option.disabled}
            label={option.label}
            value={option.value}
            onChange={(checked) => handleChange(option.value, checked)}
          />
        ))}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;
