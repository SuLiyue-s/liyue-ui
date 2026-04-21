import React, { forwardRef, useMemo } from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'link' | 'text';
  /** 按钮大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否为朴素按钮 */
  plain?: boolean;
  /** 是否为圆角按钮 */
  round?: boolean;
  /** 是否为圆形按钮 */
  circle?: boolean;
  /** 是否为加载状态 */
  loading?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 加载图标 */
  loadingIcon?: React.ReactNode;
  /** 按钮宽度 */
  width?: string | number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'primary',
      size = 'md',
      plain = false,
      round = false,
      circle = false,
      loading = false,
      disabled = false,
      icon,
      loadingIcon,
      width,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = useMemo(() => {
      const classList = ['ly-button', `ly-button--${type}`, `ly-button--${size}`];

      if (plain) classList.push('ly-button--plain');
      if (round) classList.push('ly-button--round');
      if (circle) classList.push('ly-button--circle');
      if (loading) classList.push('ly-button--loading');
      if (isDisabled) classList.push('ly-button--disabled');
      if (className) classList.push(className);

      return classList.join(' ');
    }, [type, size, plain, round, circle, loading, isDisabled, className]);

    const buttonStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (circle && !width) {
        customStyle.width = 'auto';
        customStyle.padding = '0.75rem';
      }
      return customStyle;
    }, [width, circle, style]);

    const iconElement = useMemo(() => {
      if (loading && loadingIcon) return loadingIcon;
      if (loading && !loadingIcon) {
        return (
          <svg
            className="ly-button__loading-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="10"
            />
          </svg>
        );
      }
      return icon;
    }, [loading, loadingIcon, icon]);

    const content = useMemo(() => {
      if (circle) {
        return iconElement || children;
      }
      return (
        <>
          {iconElement && <span className="ly-button__icon">{iconElement}</span>}
          {children && <span className="ly-button__text">{children}</span>}
        </>
      );
    }, [circle, iconElement, children]);

    return (
      <button
        ref={ref}
        className={classes}
        style={buttonStyle}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
