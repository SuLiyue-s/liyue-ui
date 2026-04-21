import React, { forwardRef, useMemo } from 'react';
import './Switch.css';

export interface SwitchProps {
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 选中时的值 */
  activeValue?: boolean | string | number;
  /** 未选中时的值 */
  inactiveValue?: boolean | string | number;
  /** 选中时的文本/图标 */
  activeText?: React.ReactNode;
  /** 未选中时的文本/图标 */
  inactiveText?: React.ReactNode;
  /** 是否显示点内图标 */
  showIcon?: boolean;
  /** 变化回调 */
  onChange?: (value: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      disabled = false,
      size = 'md',
      activeValue = true,
      inactiveValue = false,
      activeText,
      inactiveText,
      showIcon = false,
      onChange,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(
      checked === undefined ? false : checked
    );
    const isControlled = checked !== undefined;

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !internalChecked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    const classes = useMemo(() => {
      const classList = ['ly-switch', `ly-switch--${size}`];
      if (internalChecked) classList.push('ly-switch--checked');
      if (disabled) classList.push('ly-switch--disabled');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, internalChecked, disabled, className]);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        className={classes}
        disabled={disabled}
        onClick={handleClick}
        aria-checked={internalChecked}
        style={style}
        {...props}
      >
        <span className="ly-switch__track">
          {showIcon && (
            <span className="ly-switch__icon">
              {internalChecked ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </span>
          )}
          {activeText && <span className="ly-switch__text">{internalChecked ? activeText : inactiveText}</span>}
          <span className="ly-switch__thumb" />
        </span>
      </button>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
