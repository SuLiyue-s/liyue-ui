import React, { forwardRef, useMemo } from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  /** 标题 */
  title: string;
  /** 链接 */
  href?: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** 面包屑数据 */
  items: BreadcrumbItem[];
  /** 分隔符 */
  separator?: React.ReactNode;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 最大显示数量 */
  maxCount?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items = [],
      separator = '/',
      showIcon = false,
      maxCount,
      className = '',
      style,
    },
    ref
  ) => {
    const displayItems = useMemo(() => {
      if (maxCount && items.length > maxCount) {
        const first = items[0];
        const last = items[items.length - 1];
        const middle = { title: '...' };
        return [first, middle, last];
      }
      return items;
    }, [items, maxCount]);

    const classes = useMemo(() => {
      const classList = ['ly-breadcrumb'];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {displayItems.map((item, index) => (
          <span key={index} className="ly-breadcrumb__item">
            {index > 0 && (
              <span className="ly-breadcrumb__separator">
                {typeof separator === 'string' ? (
                  <span>{separator}</span>
                ) : (
                  separator
                )}
              </span>
            )}
            <span
              className={`ly-breadcrumb__text ${
                index === displayItems.length - 1
                  ? 'ly-breadcrumb__text--last'
                  : 'ly-breadcrumb__text--link'
              }`}
              onClick={index < displayItems.length - 1 ? item.onClick : undefined}
            >
              {showIcon && item.icon && (
                <span className="ly-breadcrumb__icon">{item.icon}</span>
              )}
              {item.href && index < displayItems.length - 1 ? (
                <a href={item.href} className="ly-breadcrumb__link">
                  {item.title}
                </a>
              ) : (
                <span>{item.title}</span>
              )}
            </span>
          </span>
        ))}
      </div>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
