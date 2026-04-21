import React, { forwardRef, useMemo, useEffect } from 'react';
import './Drawer.css';

export interface DrawerProps {
  /** 是否显示 */
  open?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 位置 */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 是否使用动画 */
  animated?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open = false,
      title,
      children,
      footer,
      width,
      height,
      placement = 'right',
      closable = true,
      mask = true,
      maskClosable = true,
      animated = true,
      size = 'md',
      onClose,
      className = '',
      style,
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open && onClose) {
          onClose();
        }
      };
      if (open) {
        document.addEventListener('keydown', handleEscape);
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, onClose]);

    const handleMaskClick = () => {
      if (maskClosable && onClose) {
        onClose();
      }
    };

    const classes = useMemo(() => {
      const classList = ['ly-drawer', `ly-drawer--${placement}`];
      if (open) classList.push('ly-drawer--open');
      if (animated) classList.push('ly-drawer--animated');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [placement, open, animated, className]);

    const sizeMap = {
      sm: 'var(--ly-drawer-width-sm)',
      md: 'var(--ly-drawer-width)',
      lg: 'var(--ly-drawer-width-lg)',
      xl: 'var(--ly-drawer-width-xl)',
    };

    const drawerStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width && (placement === 'left' || placement === 'right')) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      } else if (height && (placement === 'top' || placement === 'bottom')) {
        customStyle.height = typeof height === 'number' ? `${height}px` : height;
      } else {
        customStyle.width = sizeMap[size];
      }
      return customStyle;
    }, [width, height, placement, size, style]);

    return (
      <div ref={ref} className={classes}>
        {mask && (
          <div
            className={`ly-drawer__mask ${animated ? 'ly-drawer__mask--animated' : ''}`}
            onClick={handleMaskClick}
          />
        )}
        <div className={`ly-drawer__panel ${animated ? 'ly-drawer__panel--animated' : ''}`} style={drawerStyle}>
          {closable && (
            <button className="ly-drawer__close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          {title && <div className="ly-drawer__header">{title}</div>}
          <div className="ly-drawer__body">{children}</div>
          {footer !== undefined && <div className="ly-drawer__footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
