import React, { forwardRef, useMemo } from 'react';
import './Tag.css';

export interface TagProps {
  /** 标签内容 */
  children?: React.ReactNode;
  /** 标签类型 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否可选中 */
  checkable?: boolean;
  /** 是否选中 */
  checked?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否带边框 */
  bordered?: boolean;
  /** 是否为圆角 */
  round?: boolean;
  /** 是否为空标签 */
  outline?: boolean;
  /** 颜色 */
  color?: string;
  /** 关闭回调 */
  onClose?: () => void;
  /** 点击回调 */
  onClick?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      type = 'default',
      closable = false,
      checkable = false,
      checked = false,
      size = 'md',
      bordered = true,
      round = false,
      outline = false,
      color,
      onClose,
      onClick,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose?.();
    };

    const handleClick = () => {
      if (checkable) {
        setIsChecked(!isChecked);
      }
      onClick?.();
    };

    const classes = useMemo(() => {
      const classList = ['ly-tag', `ly-tag--${size}`];
      if (type !== 'default' || color) {
        classList.push(`ly-tag--${type}`);
      }
      if (outline) classList.push('ly-tag--outline');
      if (bordered) classList.push('ly-tag--bordered');
      if (round) classList.push('ly-tag--round');
      if (checkable) classList.push('ly-tag--checkable');
      if (isChecked) classList.push('ly-tag--checked');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, type, outline, bordered, round, checkable, isChecked, className]);

    const tagStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (color) {
        if (outline) {
          customStyle.color = color;
          customStyle.borderColor = color;
        } else {
          customStyle.backgroundColor = color;
        }
      }
      return customStyle;
    }, [color, outline, style]);

    return (
      <span
        ref={ref}
        className={classes}
        style={tagStyle}
        onClick={handleClick}
        {...props}
      >
        <span className="ly-tag__text">{children}</span>
        {closable && (
          <span className="ly-tag__close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
