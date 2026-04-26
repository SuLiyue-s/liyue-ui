import React, { forwardRef, useMemo } from 'react';
import { Icon } from '../Icon';
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
          return <Icon type="check-circle" size={20} />;
        case 'error':
          return <Icon type="close-circle" size={20} />;
        case 'warning':
          return <Icon type="warning" size={20} />;
        default:
          return <Icon type="info-circle" size={20} />;
      }
    };

    if (closed) return null;

    const classes = useMemo(() => {
      const classList = ['ly-alert', `ly-alert--${type}`];
      if (largeTitle) classList.push('ly-alert--large');
      if (showIcon) classList.push('ly-alert--icon');
      if (!description) classList.push('ly-alert--no-desc');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [type, largeTitle, showIcon, description, className]);

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
            <Icon type="close" size={16} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
