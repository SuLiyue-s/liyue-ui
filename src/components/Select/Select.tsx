import React, { forwardRef, useMemo, useState, useRef, useEffect } from 'react';
import './Select.css';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  /** 选择器大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否支持搜索 */
  searchable?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 选项列表 */
  options: SelectOption[];
  /** 当前值 */
  value?: (string | number) | (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number) | (string | number)[];
  /** 宽度 */
  width?: string | number;
  /** 选择器宽度 */
  dropdownWidth?: string | number;
  /** 最大显示标签数量（多选时） */
  maxTagCount?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 值变化回调 */
  onChange?: (value: string | number | (string | number)[]) => void;
  /** 自定义空数据文本 */
  emptyText?: React.ReactNode;
  /** 自定义最大标签文本 */
  maxTagText?: React.ReactNode;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}

export const Select = forwardRef<SelectRef, SelectProps>(
  (
    {
      size = 'md',
      disabled = false,
      multiple = false,
      searchable = false,
      clearable = false,
      placeholder = '请选择',
      options = [],
      value,
      defaultValue,
      width,
      dropdownWidth,
      maxTagCount,
      className = '',
      style,
      onChange,
      emptyText,
      maxTagText,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>(() => {
      if (value !== undefined) {
        return Array.isArray(value) ? value : [value];
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;

    useEffect(() => {
      if (isControlled && value !== undefined) {
        setSelectedValues(Array.isArray(value) ? value : [value]);
      }
    }, [value, isControlled]);

    React.useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const selectedOptions = useMemo(() => {
      return options.filter(opt => selectedValues.includes(opt.value));
    }, [options, selectedValues]);

    const filteredOptions = useMemo(() => {
      if (!searchValue) return options;
      return options.filter(opt =>
        opt.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [options, searchValue]);

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      let newValues: (string | number)[];
      if (multiple) {
        if (selectedValues.includes(option.value)) {
          newValues = selectedValues.filter(v => v !== option.value);
        } else {
          newValues = [...selectedValues, option.value];
        }
      } else {
        newValues = [option.value];
        setIsOpen(false);
      }

      if (!isControlled) {
        setSelectedValues(newValues);
      }
      onChange?.(multiple ? newValues : newValues[0]);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setSelectedValues([]);
      }
      onChange?.(multiple ? [] : '');
    };

    const displayValue = () => {
      if (selectedOptions.length === 0) return '';
      if (multiple) {
        if (maxTagCount && selectedOptions.length > maxTagCount) {
          return maxTagText || `已选择 ${selectedOptions.length} 项`;
        }
        return selectedOptions.map(opt => opt.label).join(', ');
      }
      return selectedOptions[0].label;
    };

    const classes = useMemo(() => {
      const classList = ['ly-select', `ly-select--${size}`];
      if (isOpen) classList.push('ly-select--open');
      if (disabled) classList.push('ly-select--disabled');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, isOpen, disabled, className]);

    const containerStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (width) {
        customStyle.width = typeof width === 'number' ? `${width}px` : width;
      }
      return customStyle;
    }, [width, style]);

    return (
      <div ref={containerRef} className={classes} style={containerStyle}>
        <div
          className="ly-select__trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              className="ly-select__search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={placeholder}
            />
          ) : (
            <span className="ly-select__value">
              {displayValue() || <span className="ly-select__placeholder">{placeholder}</span>}
            </span>
          )}
          {clearable && selectedValues.length > 0 && (
            <span className="ly-select__clear" onClick={handleClear}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          )}
          <span className="ly-select__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {isOpen && (
          <div
            className="ly-select__dropdown"
            style={dropdownWidth ? { width: typeof dropdownWidth === 'number' ? `${dropdownWidth}px` : dropdownWidth } : undefined}
          >
            {filteredOptions.length === 0 ? (
              <div className="ly-select__empty">{emptyText || '暂无数据'}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`ly-select__option ${
                    selectedValues.includes(option.value) ? 'ly-select__option--selected' : ''
                  } ${option.disabled ? 'ly-select__option--disabled' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {multiple && (
                    <span className="ly-select__checkbox">
                      {selectedValues.includes(option.value) && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                  )}
                  <span className="ly-select__option-label">{option.label}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
