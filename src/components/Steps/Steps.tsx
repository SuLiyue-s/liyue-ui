import React, { forwardRef, useMemo } from 'react';
import { Icon } from '../Icon';
import './Steps.css';

export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface StepsProps {
  /** 步骤数据 */
  items: StepItem[];
  /** 当前步骤 */
  current?: number;
  /** 默认当前步骤 */
  defaultCurrent?: number;
  /** 方向 */
  direction?: 'horizontal' | 'vertical';
  /** 步骤状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 是否显示步骤图标 */
  showIcon?: boolean;
  /** 是否简化显示 */
  simple?: boolean;
  /** 大小 */
  size?: 'sm' | 'md';
  /** 变化回调 */
  onChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items = [],
      current,
      defaultCurrent = 0,
      direction = 'horizontal',
      status,
      showIcon = true,
      simple = false,
      size = 'md',
      onChange,
      className = '',
      style,
    },
    ref
  ) => {
    const [internalCurrent, setInternalCurrent] = React.useState(current || defaultCurrent);
    const isCurrentControlled = current !== undefined;
    const currentStep = isCurrentControlled ? current! : internalCurrent;

    React.useEffect(() => {
      if (isCurrentControlled && current !== undefined) {
        setInternalCurrent(current);
      }
    }, [current, isCurrentControlled]);

    const getStepStatus = (index: number) => {
      if (status) return status;
      if (index < currentStep) return 'finish';
      if (index === currentStep) return 'process';
      return 'wait';
    };

    const handleStepClick = (index: number) => {
      if (!isCurrentControlled) {
        setInternalCurrent(index);
      }
      onChange?.(index);
    };

    const classes = useMemo(() => {
      const classList = ['ly-steps', `ly-steps--${direction}`, `ly-steps--${size}`];
      if (simple) classList.push('ly-steps--simple');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [direction, size, simple, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {items.map((item, index) => {
          const stepStatus = item.status || getStepStatus(index);
          return (
            <div
              key={index}
              className={`ly-steps__item ly-steps__item--${stepStatus}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="ly-steps__icon-container">
                <div className="ly-steps__icon">
                  {showIcon && (
                    <>
                      {stepStatus === 'finish' && !item.icon && (
                        <Icon type="check-circle" size={16} />
                      )}
                      {stepStatus === 'error' && !item.icon && (
                        <Icon type="close-circle" size={16} />
                      )}
                      {stepStatus !== 'finish' && stepStatus !== 'error' && !item.icon && (
                        <span className="ly-steps__number">{index + 1}</span>
                      )}
                      {item.icon && <span className="ly-steps__custom-icon">{item.icon}</span>}
                    </>
                  )}
                </div>
                {index < items.length - 1 && <div className="ly-steps__line" />}
              </div>
              <div className="ly-steps__content">
                <div className="ly-steps__title">{item.title}</div>
                {item.description && <div className="ly-steps__description">{item.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = 'Steps';

export default Steps;
