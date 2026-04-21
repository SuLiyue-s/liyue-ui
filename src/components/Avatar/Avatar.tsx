import React, { forwardRef, useMemo, useState } from 'react';
import './Avatar.css';

export interface AvatarProps {
  /** 图片地址 */
  src?: string;
  /** 头像大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | string | number;
  /** 头像形状 */
  shape?: 'circle' | 'square' | 'rounded';
  /** 头像文字 */
  text?: string;
  /** 图片无法加载时显示的文字 */
  fallback?: string;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 背景颜色 */
  bgColor?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      size = 'md',
      shape = 'circle',
      text,
      fallback,
      loading = false,
      icon,
      bgColor,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);

    const getInitials = (str: string) => {
      return str
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const classes = useMemo(() => {
      const classList = ['ly-avatar', `ly-avatar--${shape}`];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [shape, className]);

    const avatarStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (typeof size === 'number') {
        customStyle.width = `${size}px`;
        customStyle.height = `${size}px`;
        customStyle.fontSize = `${size * 0.4}px`;
      } else if (typeof size === 'string' && ['sm', 'md', 'lg', 'xl'].includes(size)) {
        // size class will handle it
      }
      if (bgColor) {
        customStyle.backgroundColor = bgColor;
      }
      return customStyle;
    }, [size, bgColor, style]);

    const displayContent = () => {
      if (loading) {
        return <div className="ly-avatar__loading" />;
      }

      if (src && !imgError) {
        return <img src={src} alt="" onError={() => setImgError(true)} className="ly-avatar__image" />;
      }

      if (icon) {
        return <div className="ly-avatar__icon">{icon}</div>;
      }

      if (text) {
        return <span className="ly-avatar__text">{getInitials(text)}</span>;
      }

      if (fallback) {
        return <span className="ly-avatar__text">{getInitials(fallback)}</span>;
      }

      return children;
    };

    return (
      <div ref={ref} className={classes} style={avatarStyle}>
        {displayContent()}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
