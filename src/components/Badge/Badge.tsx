import React, { forwardRef, useMemo } from 'react';
import './Badge.css';

export interface BadgeProps {
  /** 显示的内容 */
  count?: number | React.ReactNode;
  /** 最大数字 */
  maxCount?: number;
  /** 是否显示原点 */
  dot?: boolean;
  /** 徽标类型 */
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  /** 颜色 */
  color?: string;
  /** 是否显示 */
  show?: boolean;
  /** 偏移量 */
  offset?: [string | number, string | number];
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      count,
      maxCount = 99,
      dot = false,
      status,
      color,
      show = true,
      offset,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const displayCount = useMemo(() => {
      if (dot) return null;
      if (typeof count === 'number') {
        return count > maxCount ? `${maxCount}+` : count;
      }
      return count;
    }, [count, dot, maxCount]);

    const classes = useMemo(() => {
      const classList = ['ly-badge'];
      if (status) classList.push(`ly-badge--${status}`);
      if (dot) classList.push('ly-badge--dot');
      if (!children) classList.push('ly-badge--standalone');
      if (!show) classList.push('ly-badge--hidden');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [status, dot, children, show, className]);

    const badgeStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (color) {
        customStyle.backgroundColor = color;
      }
      if (offset) {
        customStyle.top = typeof offset[1] === 'number' ? `${offset[1]}px` : offset[1];
        customStyle.right = typeof offset[0] === 'number' ? `${-parseFloat(String(offset[0]))}px` : `calc(100% - ${offset[0]})`;
      }
      return customStyle;
    }, [color, offset, style]);

    return (
      <div ref={ref} className={classes}>
        {children}
        <span className="ly-badge__count" style={badgeStyle}>
          {displayCount}
        </span>
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
