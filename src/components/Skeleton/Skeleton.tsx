import React, { forwardRef, useMemo } from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  /** 是否显示动画 */
  animated?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 圆角 */
  borderRadius?: string | number;
  /** 是否为圆形 */
  circle?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface SkeletonParagraphProps {
  /** 段落行数 */
  rows?: number;
  /** 是否显示最后一行短一点 */
  shortLastRow?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      animated = true,
      size = 'md',
      width,
      height,
      borderRadius,
      circle = false,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const classList = ['ly-skeleton', `ly-skeleton--${size}`];
      if (animated) classList.push('ly-skeleton--animated');
      if (circle) classList.push('ly-skeleton--circle');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, animated, circle, className]);

    const skeletonStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (height) {
        customStyle.height = typeof height === 'number' ? `${height}px` : height;
      }
      if (borderRadius) {
        customStyle.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
      }
      return customStyle;
    }, [width, height, borderRadius, style]);

    return (
      <div ref={ref} className={classes} style={skeletonStyle}>
        {children}
      </div>
    );
  }
);

export const SkeletonParagraph = forwardRef<HTMLDivElement, SkeletonParagraphProps>(
  ({ rows = 3, shortLastRow = true, children, className = '', style }, ref) => {
    const rowHeights = useMemo(() => {
      const heights = [];
      for (let i = 0; i < rows; i++) {
        if (i === rows - 1 && shortLastRow) {
          heights.push('60%');
        } else {
          heights.push('100%');
        }
      }
      return heights;
    }, [rows, shortLastRow]);

    if (children) {
      return <div ref={ref} className={className} style={style}>{children}</div>;
    }

    return (
      <div ref={ref} className={`ly-skeleton-paragraph ${className}`} style={style}>
        {rowHeights.map((height, index) => (
          <Skeleton key={index} height={height as string} style={{ marginBottom: index < rows - 1 ? '0.75rem' : 0 }} />
        ))}
      </div>
    );
  }
);

export const SkeletonAvatar = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'circle'>>(
  (props, ref) => {
    return <Skeleton {...props} circle ref={ref} />;
  }
);

Skeleton.displayName = 'Skeleton';
SkeletonParagraph.displayName = 'SkeletonParagraph';
SkeletonAvatar.displayName = 'SkeletonAvatar';

export default Skeleton;
