import React, { forwardRef, useMemo, useState, useRef, useEffect } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /** 提示内容 */
  content: React.ReactNode;
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 位置 */
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** 延迟显示时间（毫秒） */
  mouseEnterDelay?: number;
  /** 延迟隐藏时间（毫秒） */
  mouseLeaveDelay?: number;
  /** 最大宽度 */
  maxWidth?: string | number;
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      trigger = 'hover',
      placement = 'top',
      mouseEnterDelay = 100,
      mouseLeaveDelay = 100,
      maxWidth,
      children,
      className = '',
      style,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const showTimer = useRef<number | null>(null);
    const hideTimer = useRef<number | null>(null);

    const show = () => {
      if (hideTimer.current !== null) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      showTimer.current = window.setTimeout(() => {
        setVisible(true);
      }, mouseEnterDelay);
    };

    const hide = () => {
      if (showTimer.current !== null) {
        clearTimeout(showTimer.current);
        showTimer.current = null;
      }
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
      }, mouseLeaveDelay);
    };

    const handleMouseEnter = () => {
      if (trigger === 'hover') show();
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') hide();
    };

    const handleClick = () => {
      if (trigger === 'click') {
        setVisible(!visible);
      }
    };

    const handleFocus = () => {
      if (trigger === 'focus') show();
    };

    const handleBlur = () => {
      if (trigger === 'focus') hide();
    };

    useEffect(() => {
      return () => {
        if (showTimer.current !== null) clearTimeout(showTimer.current);
        if (hideTimer.current !== null) clearTimeout(hideTimer.current);
      };
    }, []);

    useEffect(() => {
      if (visible) {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            triggerRef.current &&
            !triggerRef.current.contains(e.target as Node) &&
            tooltipRef.current &&
            !tooltipRef.current.contains(e.target as Node)
          ) {
            setVisible(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [visible]);

    const classes = useMemo(() => {
      const classList = ['ly-tooltip'];
      if (visible) classList.push('ly-tooltip--visible');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [visible, className]);

    const tooltipStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (maxWidth) {
        customStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      }
      return customStyle;
    }, [maxWidth, style]);

    return (
      <div ref={ref} className={classes}>
        <div
          ref={triggerRef}
          className="ly-tooltip__trigger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
        {visible && (
          <div
            ref={tooltipRef}
            className={`ly-tooltip__popper ly-tooltip__popper--${placement}`}
            style={tooltipStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="ly-tooltip__content">
              <span style={{
                display: 'inline',
                writingMode: 'horizontal-tb' as const,
                textOrientation: 'mixed' as const,
                unicodeBidi: 'normal' as const,
                direction: 'ltr' as const,
                whiteSpace: 'normal' as const
              }}>
                {content}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
