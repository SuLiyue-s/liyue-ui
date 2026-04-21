import React, { forwardRef, useMemo } from 'react';
import './Input.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
      ...props
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

    const classes = useMemo(() => {
      const classList = ['ly-textarea'];
      if (!bordered) classList.push('ly-textarea--borderless');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [bordered, className]);

    const textareaStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      return customStyle;
    }, [width, style]);

    return (
      <textarea
        ref={(el) => {
          (textareaRef as React.MutableRefObject<HTMLTextAreaElement>).current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        className={classes}
        style={textareaStyle}
        rows={autoSize ? minRows || rows : rows}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
