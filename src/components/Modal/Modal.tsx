import React, { forwardRef, useMemo, useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
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
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 是否居中显示 */
  centered?: boolean;
  /** 是否使用动画 */
  animated?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 关闭回调 */
  onClose?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open = false,
      title,
      children,
      footer,
      width,
      height,
      closable = true,
      mask = true,
      maskClosable = true,
      centered = false,
      animated = true,
      size = 'md',
      onClose,
      afterClose: _afterClose,
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
      const classList = ['ly-modal'];
      if (open) classList.push('ly-modal--open');
      if (centered) classList.push('ly-modal--centered');
      if (animated) classList.push('ly-modal--animated');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [open, centered, animated, className]);

    const sizeMap = {
      sm: 'var(--ly-modal-width-sm)',
      md: 'var(--ly-modal-width)',
      lg: 'var(--ly-modal-width-lg)',
      xl: 'var(--ly-modal-width-xl)',
      full: 'var(--ly-modal-width-full)',
    };

    const modalStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      customStyle.width = width || sizeMap[size];
      if (height) {
        customStyle.height = typeof height === 'number' ? `${height}px` : height;
      }
      return customStyle;
    }, [width, height, size, style]);

    if (!open && animated) return null;

    return (
      <div ref={ref} className={classes}>
        {mask && (
          <div
            className={`ly-modal__mask ${animated ? 'ly-modal__mask--animated' : ''}`}
            onClick={handleMaskClick}
          />
        )}
        <div
          className={`ly-modal__container ${animated ? 'ly-modal__container--animated' : ''}`}
        >
          <div className="ly-modal" style={modalStyle}>
            {closable && (
              <button className="ly-modal__close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            {title && <div className="ly-modal__header">{title}</div>}
            <div className="ly-modal__body">{children}</div>
            {footer !== undefined && <div className="ly-modal__footer">{footer}</div>}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
