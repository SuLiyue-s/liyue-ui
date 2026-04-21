import React, { forwardRef, useMemo } from 'react';
import './Layout.css';

export interface ContainerProps {
  /** 容器最大宽度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string | number;
  /** 是否居中 */
  centered?: boolean;
  /** 内边距 */
  padding?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface GridProps {
  /** 列数 */
  cols?: number | { [key: string]: number };
  /** 间距 */
  gap?: string | number;
  /** 行间距 */
  rowGap?: string | number;
  /** 列间距 */
  colGap?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface GridItemProps {
  /** 列数占比 */
  span?: number;
  /** 偏移列数 */
  offset?: number;
  /** 起始列 */
  start?: number;
  /** 响应式列数 */
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface FlexProps {
  /** 排列方向 */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** 是否换行 */
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  /** 主轴对齐方式 */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /** 交叉轴对齐方式 */
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  /** 元素间距 */
  gap?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface StackProps extends Omit<FlexProps, 'direction'> {
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 分隔符 */
  divider?: React.ReactNode;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface DividerProps {
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 粗细 */
  thickness?: string | number;
  /** 颜色 */
  color?: string;
  /** 样式 */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /** 子元素（带文字分割线） */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'lg', centered = false, padding, children, className = '', style }, ref) => {
    const classes = useMemo(() => {
      const classList = ['ly-container'];
      if (centered) classList.push('ly-container--centered');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [centered, className]);

    const containerStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (typeof maxWidth === 'string') {
        customStyle.maxWidth = `var(--ly-container-max-width-${maxWidth})`;
      } else if (typeof maxWidth === 'number') {
        customStyle.maxWidth = `${maxWidth}px`;
      }
      if (padding) {
        customStyle.padding = typeof padding === 'number' ? `${padding}px` : padding;
      }
      return customStyle;
    }, [maxWidth, padding, style]);

    return (
      <div ref={ref} className={classes} style={containerStyle}>
        {children}
      </div>
    );
  }
);

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 12, gap, rowGap, colGap, children, className = '', style }, ref) => {
    const classes = useMemo(() => {
      const classList = ['ly-grid'];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [className]);

    const gridStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (typeof cols === 'number') {
        customStyle.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      }
      if (gap) {
        customStyle.gap = typeof gap === 'number' ? `${gap}px` : gap;
      }
      if (rowGap) {
        customStyle.rowGap = typeof rowGap === 'number' ? `${rowGap}px` : rowGap;
      }
      if (colGap) {
        customStyle.columnGap = typeof colGap === 'number' ? `${colGap}px` : colGap;
      }
      return customStyle;
    }, [cols, gap, rowGap, colGap, style]);

    return (
      <div ref={ref} className={classes} style={gridStyle}>
        {children}
      </div>
    );
  }
);

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ span = 1, offset = 0, start, sm, md, lg, xl, children, className = '', style }, ref) => {
    const classes = useMemo(() => {
      const classList = ['ly-grid-item'];
      if (span) classList.push(`ly-grid-item--span-${span}`);
      if (offset) classList.push(`ly-grid-item--offset-${offset}`);
      if (start) classList.push(`ly-grid-item--start-${start}`);
      if (sm) classList.push(`ly-grid-item--sm-${sm}`);
      if (md) classList.push(`ly-grid-item--md-${md}`);
      if (lg) classList.push(`ly-grid-item--lg-${lg}`);
      if (xl) classList.push(`ly-grid-item--xl-${xl}`);
      if (className) classList.push(className);
      return classList.join(' ');
    }, [span, offset, start, sm, md, lg, xl, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {children}
      </div>
    );
  }
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      wrap = false,
      justify = 'start',
      align = 'stretch',
      gap,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const classList = ['ly-flex'];
      if (wrap) classList.push(`ly-flex--wrap-${typeof wrap === 'boolean' ? 'wrap' : wrap}`);
      if (className) classList.push(className);
      return classList.join(' ');
    }, [wrap, className]);

    const flexStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      customStyle.flexDirection = direction;
      customStyle.flexWrap = wrap ? 'wrap' : 'nowrap';
      customStyle.justifyContent = `flex-${justify === 'between' ? 'space-' : ''}${justify === 'around' ? 'space-' : ''}${justify === 'evenly' ? 'space-' : ''}${justify}`;
      customStyle.alignItems = align === 'stretch' ? 'stretch' : `flex-${align}`;
      if (gap) {
        customStyle.gap = typeof gap === 'number' ? `${gap}px` : gap;
      }
      return customStyle;
    }, [direction, wrap, justify, align, gap, style]);

    return (
      <div ref={ref} className={classes} style={flexStyle}>
        {children}
      </div>
    );
  }
);

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      divider,
      gap = 'md',
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const stackStyle = useMemo(() => {
      return {
        ...style,
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: typeof gap === 'number' ? `${gap}px` : gap,
      };
    }, [direction, gap, style]);

    const childArray = React.Children.toArray(children).filter(Boolean);

    return (
      <Flex ref={ref} className={className} style={stackStyle} {...props}>
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {divider && index < childArray.length - 1 && (
              <Stack direction={direction === 'horizontal' ? 'vertical' : 'horizontal'}>
                {divider}
              </Stack>
            )}
          </React.Fragment>
        ))}
      </Flex>
    );
  }
);

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      direction = 'horizontal',
      thickness = 1,
      color,
      lineStyle = 'solid',
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const classList = ['ly-divider', `ly-divider--${direction}`];
      if (children) classList.push('ly-divider--with-text');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [direction, children, className]);

    const dividerStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (direction === 'horizontal') {
        customStyle.height = typeof thickness === 'number' ? `${thickness}px` : thickness;
        customStyle.borderTopWidth = typeof thickness === 'number' ? `${thickness}px` : thickness;
      } else {
        customStyle.width = typeof thickness === 'number' ? `${thickness}px` : thickness;
        customStyle.borderLeftWidth = typeof thickness === 'number' ? `${thickness}px` : thickness;
      }
      if (color) {
        customStyle.borderColor = color;
      }
      customStyle.borderStyle = lineStyle;
      return customStyle;
    }, [direction, thickness, color, lineStyle, style]);

    if (children) {
      return (
        <div ref={ref} className={classes} style={dividerStyle}>
          <span className="ly-divider__text">{children}</span>
        </div>
      );
    }

    return <div ref={ref} className={classes} style={dividerStyle} />;
  }
);

Container.displayName = 'Container';
Grid.displayName = 'Grid';
GridItem.displayName = 'GridItem';
Flex.displayName = 'Flex';
Stack.displayName = 'Stack';
Divider.displayName = 'Divider';

export default Container;
