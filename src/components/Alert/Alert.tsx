import React, { forwardRef, useMemo } from 'react';
import './Alert.css';

export interface AlertProps {
  /** 警告提示内容 */
  message: React.ReactNode;
  /** 警告提示描述 */
  description?: React.ReactNode;
  /** 类型 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否使用大字标题样式 */
  largeTitle?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      message,
      description,
      type = 'info',
      closable = false,
      showIcon = true,
      largeTitle = false,
      onClose,
      icon,
      className = '',
      style,
    },
    ref
  ) => {
    const [closed, setClosed] = React.useState(false);

    const handleClose = () => {
      setClosed(true);
      onClose?.();
    };

    const getIcon = () => {
      if (icon) return icon;
      switch (type) {
        case 'success':
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          );
        case 'error':
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          );
        case 'warning':
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          );
        default:
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          );
      }
    };

    if (closed) return null;

    const classes = useMemo(() => {
      const classList = ['ly-alert', `ly-alert--${type}`];
      if (largeTitle) classList.push('ly-alert--large');
      if (showIcon) classList.push('ly-alert--icon');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [type, largeTitle, showIcon, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {showIcon && <span className="ly-alert__icon">{getIcon()}</span>}
        <div className="ly-alert__content">
          <div className={`ly-alert__message ${largeTitle ? 'ly-alert__message--large' : ''}`}>
            {message}
          </div>
          {description && <div className="ly-alert__description">{description}</div>}
        </div>
        {closable && (
          <button className="ly-alert__close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
