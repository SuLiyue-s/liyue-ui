import React, { forwardRef, useMemo } from 'react';
import './Card.css';

export interface CardProps {
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  /** 封面图片 */
  cover?: React.ReactNode;
  /** 封面图片填充方式 */
  coverFit?: 'cover' | 'contain' | 'fill';
  /** 头像 */
  avatar?: React.ReactNode;
  /** 操作区域 */
  actions?: React.ReactNode[];
  /** 是否有边框 */
  bordered?: boolean;
  /** 是否有阴影 */
  shadow?: boolean | 'hover' | 'always';
  /** 是否可点击 */
  clickable?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 圆角大小 */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subTitle,
      cover,
      coverFit = 'cover',
      avatar,
      actions,
      bordered = true,
      shadow = false,
      clickable = false,
      size = 'md',
      radius = 'md',
      children,
      className = '',
      style,
      onClick,
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const classList = ['ly-card', `ly-card--${size}`, `ly-card--radius-${radius}`];
      if (bordered) classList.push('ly-card--bordered');
      if (shadow === true) classList.push('ly-card--shadow');
      if (shadow === 'hover') classList.push('ly-card--shadow-hover');
      if (clickable) classList.push('ly-card--clickable');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, radius, bordered, shadow, clickable, className]);

    return (
      <div ref={ref} className={classes} style={style} onClick={onClick}>
        {cover && (
          <div className="ly-card__cover" style={{ objectFit: coverFit }}>
            {cover}
          </div>
        )}
        {(title || subTitle || avatar) && (
          <div className="ly-card__header">
            {avatar && <div className="ly-card__avatar">{avatar}</div>}
            {(title || subTitle) && (
              <div className="ly-card__header-content">
                {title && <div className="ly-card__title">{title}</div>}
                {subTitle && <div className="ly-card__subtitle">{subTitle}</div>}
              </div>
            )}
          </div>
        )}
        <div className="ly-card__body">{children}</div>
        {actions && actions.length > 0 && (
          <div className="ly-card__actions">
            {actions.map((action, index) => (
              <div key={index} className="ly-card__action">
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
