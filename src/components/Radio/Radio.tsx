import React, { forwardRef, useMemo } from 'react';
import './Radio.css';

export interface RadioProps {
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 标签 */
  label?: string;
  /** 值 */
  value?: string | number;
  /** 名称（用于分组） */
  name?: string;
  /** 变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface RadioGroupProps {
  /** 选项列表 */
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
  /** 当前值 */
  value?: string | number;
  /** 默认值 */
  defaultValue?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 变化回调 */
  onChange?: (value: string | number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      disabled = false,
      size = 'md',
      label,
      value,
      name,
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
      const classList = ['ly-radio', `ly-radio--${size}`];
      if (internalChecked) classList.push('ly-radio--checked');
      if (disabled) classList.push('ly-radio--disabled');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, internalChecked, disabled, className]);

    return (
      <label className={classes} style={style}>
        <input
          ref={ref}
          type="radio"
          className="ly-radio__input"
          checked={internalChecked}
          disabled={disabled}
          value={value}
          name={name}
          onChange={handleChange}
          {...props}
        />
        <span className="ly-radio__box">
          <span className="ly-radio__dot" />
        </span>
        {label && <span className="ly-radio__label">{label}</span>}
      </label>
    );
  }
);

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options = [],
      value,
      defaultValue,
      disabled = false,
      direction = 'horizontal',
      onChange,
      className = '',
      style,
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<string | number | undefined>(() => {
      if (value !== undefined) return value;
      return defaultValue;
    });

    const isControlled = value !== undefined;

    React.useEffect(() => {
      if (isControlled && value !== undefined) {
        setSelectedValue(value);
      }
    }, [value, isControlled]);

    const handleChange = (optionValue: string | number) => {
      if (!isControlled) {
        setSelectedValue(optionValue);
      }
      onChange?.(optionValue);
    };

    const classes = useMemo(() => {
      const classList = ['ly-radio-group', `ly-radio-group--${direction}`];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [direction, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {options.map((option) => (
          <Radio
            key={option.value}
            checked={selectedValue === option.value}
            disabled={disabled || option.disabled}
            label={option.label}
            value={option.value}
            onChange={() => handleChange(option.value)}
          />
        ))}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';

export default Radio;
