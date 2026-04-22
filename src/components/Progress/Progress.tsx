import React, { forwardRef, useMemo } from 'react';
import './Progress.css';

export interface ProgressProps {
  /** 进度值 */
  percent?: number;
  /** 进度条类型 */
  type?: 'line' | 'circle' | 'dashboard';
  /** 是否显示内部文字 */
  showText?: boolean;
  /** 进度条宽度 */
  strokeWidth?: number;
  /** 进度条颜色 */
  strokeColor?: string;
  /** 轨道颜色 */
  trailColor?: string;
  /** 是否显示单位 */
  format?: (percent?: number) => React.ReactNode;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 状态 */
  status?: 'success' | 'exception' | 'normal';
  /** 是否为动画进度条 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      percent = 0,
      type = 'line',
      showText = true,
      strokeWidth,
      strokeColor,
      trailColor,
      format,
      size = 'md',
      status,
      animated = false,
      className = '',
      style,
    },
    ref
  ) => {
    const getStatus = () => {
      if (status) return status;
      if (percent >= 100) return 'success';
      if (percent < 0) return 'exception';
      return 'normal';
    };

    const currentStatus = getStatus();

    const getStrokeColor = () => {
      if (strokeColor) return strokeColor;
      if (currentStatus === 'success') return 'var(--ly-success)';
      if (currentStatus === 'exception') return 'var(--ly-danger)';
      return 'var(--ly-primary)';
    };

    const displayText = format ? format(percent) : `${Math.min(100, Math.max(0, percent))}%`;

    const classes = useMemo(() => {
      const classList = ['ly-progress', `ly-progress--${type}`, `ly-progress--${size}`];
      if (currentStatus) classList.push(`ly-progress--${currentStatus}`);
      if (animated) classList.push('ly-progress--animated');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [type, size, currentStatus, animated, className]);

    if (type === 'circle' || type === 'dashboard') {
      const sizeMap = { sm: 60, md: 80, lg: 100 };
      const strokeWidthMap = { sm: 4, md: 6, lg: 8 };
      const circleSize = sizeMap[size];
      const actualStrokeWidth = strokeWidth ?? strokeWidthMap[size];
      const radius = (circleSize - actualStrokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (percent / 100) * circumference;

      return (
        <div ref={ref} className={classes} style={style}>
          <svg className="ly-progress__circle" width={circleSize} height={circleSize}>
            <circle
              className="ly-progress__circle-trail"
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="none"
              stroke={trailColor || 'var(--ly-bg-tertiary)'}
              strokeWidth={actualStrokeWidth}
            />
            <circle
              className="ly-progress__circle-progress"
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              fill="none"
              stroke={getStrokeColor()}
              strokeWidth={actualStrokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            />
          </svg>
          {showText && <span className="ly-progress__text">{displayText}</span>}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} style={style}>
        <div className="ly-progress__track">
          <div
            className="ly-progress__bar"
            style={{
              width: `${Math.min(100, Math.max(0, percent))}%`,
              backgroundColor: getStrokeColor(),
            }}
          />
        </div>
        {showText && <span className="ly-progress__text">{displayText}</span>}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
