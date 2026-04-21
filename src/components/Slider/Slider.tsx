import React, { forwardRef, useMemo, useRef, useEffect, useState } from 'react';
import './Slider.css';

export interface SliderProps {
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示输入框 */
  showInput?: boolean;
  /** 是否显示提示 */
  showTooltip?: boolean;
  /** 范围选择 */
  range?: boolean;
  /** 范围起始值 */
  rangeValue?: [number, number];
  /** 范围默认值 */
  defaultRangeValue?: [number, number];
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 变化回调 */
  onChange?: (value: number | [number, number]) => void;
  /** 完成回调 */
  onAfterChange?: (value: number | [number, number]) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showInput = false,
      showTooltip = true,
      range = false,
      rangeValue,
      defaultRangeValue = [0, 100],
      size = 'md',
      className = '',
      style,
      onChange,
      onAfterChange,
    },
    ref
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState<number>(() => {
      if (value !== undefined) return value;
      return defaultValue !== undefined ? defaultValue : 0;
    });

    const [internalRangeValue, setInternalRangeValue] = useState<[number, number]>(() => {
      if (rangeValue !== undefined) return rangeValue;
      return defaultRangeValue || [min, max];
    });

    const [isDragging, setIsDragging] = useState(false);
    const [draggingThumb, setDraggingThumb] = useState<'start' | 'end' | null>(null);

    const isControlled = value !== undefined;
    const isRangeControlled = rangeValue !== undefined;

    useEffect(() => {
      if (isControlled && value !== undefined) {
        setInternalValue(value);
      }
    }, [value, isControlled]);

    useEffect(() => {
      if (isRangeControlled && rangeValue !== undefined) {
        setInternalRangeValue(rangeValue);
      }
    }, [rangeValue, isRangeControlled]);

    const currentValue = range ? internalRangeValue : internalValue;
    const isControlledRange = range && isRangeControlled;

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };

    const getValueFromPosition = (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    };

    const handleMouseDown = (e: React.MouseEvent, thumb?: 'start' | 'end') => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      if (range && thumb) {
        setDraggingThumb(thumb);
      }

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newValue = getValueFromPosition(moveEvent.clientX);
        if (range) {
          const [start, end] = isControlledRange ? rangeValue! : internalRangeValue;
          let newRangeValue: [number, number];
          if (thumb === 'start') {
            newRangeValue = [Math.min(newValue, end - step), end];
          } else {
            newRangeValue = [start, Math.max(newValue, start + step)];
          }
          if (!isRangeControlled) {
            setInternalRangeValue(newRangeValue);
          }
          onChange?.(newRangeValue);
        } else {
          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setDraggingThumb(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        onAfterChange?.(range ? internalRangeValue : internalValue);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      if (!isNaN(newValue) && !range) {
        const clampedValue = Math.max(min, Math.min(max, newValue));
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
      }
    };

    const classes = useMemo(() => {
      const classList = ['ly-slider', `ly-slider--${size}`];
      if (disabled) classList.push('ly-slider--disabled');
      if (isDragging) classList.push('ly-slider--dragging');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, disabled, isDragging, className]);

    const trackStyle = useMemo(() => {
      if (range) {
        const [start, end] = currentValue as [number, number];
        return {
          '--ly-slider-start': `${getPercentage(start)}%`,
          '--ly-slider-end': `${getPercentage(end)}%`,
        } as React.CSSProperties;
      }
      return {
        '--ly-slider-progress': `${getPercentage(currentValue as number)}%`,
      } as React.CSSProperties;
    }, [range, currentValue]);

    return (
      <div ref={ref} className={classes} style={style}>
        <div
          ref={trackRef}
          className="ly-slider__track"
          onMouseDown={(e) => !range && handleMouseDown(e)}
        >
          <div className="ly-slider__rail" />
          <div className="ly-slider__progress" />
          {range && (
            <>
              <div
                className="ly-slider__thumb"
                style={{ left: `${getPercentage((currentValue as [number, number])[0])}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'start')}
              >
                {showTooltip && (
                  <div className="ly-slider__tooltip">
                    {(currentValue as [number, number])[0]}
                  </div>
                )}
              </div>
              <div
                className="ly-slider__thumb"
                style={{ left: `${getPercentage((currentValue as [number, number])[1])}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'end')}
              >
                {showTooltip && (
                  <div className="ly-slider__tooltip">
                    {(currentValue as [number, number])[1]}
                  </div>
                )}
              </div>
            </>
          )}
          {!range && (
            <div
              className="ly-slider__thumb"
              style={{ left: `${getPercentage(currentValue as number)}%` }}
              onMouseDown={handleMouseDown}
            >
              {showTooltip && (
                <div className="ly-slider__tooltip">{currentValue as number}</div>
              )}
            </div>
          )}
        </div>
        {showInput && !range && (
          <input
            type="number"
            className="ly-slider__input"
            value={currentValue as number}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
          />
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
