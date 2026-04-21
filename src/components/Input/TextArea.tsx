import React, { forwardRef } from 'react';
import './Input.css';

export interface TextAreaProps {
  /** 行数 */
  rows?: number;
  /** 是否自动调整高度 */
  autoSize?: boolean;
  /** 最大行数 */
  maxRows?: number;
  /** 最小行数 */
  minRows?: number;
  /** 宽度 */
  width?: string | number;
  /** 是否有边框 */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 变化回调 */
  onChange?: React.FormEventHandler<HTMLTextAreaElement>;
  /** 占位符 */
  placeholder?: string;
  /** 禁用 */
  disabled?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      rows = 4,
      autoSize = false,
      maxRows,
      minRows,
      width,
      bordered = true,
      className = '',
      style,
      value,
      defaultValue,
      onChange,
      placeholder,
      disabled = false,
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue || value || '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const adjustHeight = () => {
      if (!autoSize || !textareaRef.current) return;
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight) || 24;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;
      const minHeight = minRows ? minRows * lineHeight : rows * lineHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    };

    React.useEffect(() => {
      adjustHeight();
    }, [currentValue, autoSize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      adjustHeight();
      onChange?.(e);
    };

    const classes = ['ly-textarea'];
    if (!bordered) classes.push('ly-textarea--borderless');
    if (className) classes.push(className);

    const textareaStyle = {
      ...style,
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    };

    return (
      <textarea
        ref={textareaRef}
        className={classes.join(' ')}
        style={textareaStyle}
        rows={autoSize ? minRows || rows : rows}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
