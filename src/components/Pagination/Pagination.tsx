import React, { forwardRef, useMemo } from 'react';
import './Pagination.css';
import { useI18n } from '../../i18n/index';

export interface PaginationProps {
  /** 当前页码 */
  current?: number;
  /** 默认页码 */
  defaultCurrent?: number;
  /** 总页数 */
  total?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 是否显示总数 */
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示页面大小选择器 */
  showSizeChanger?: boolean;
  /** 页面大小选项 */
  pageSizeOptions?: number[];
  /** 是否显示简化的分页器 */
  simple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 变化回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 页面大小变化回调 */
  onShowSizeChange?: (current: number, size: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义上一页文本 */
  prevText?: React.ReactNode;
  /** 自定义下一页文本 */
  nextText?: React.ReactNode;
  /** 自定义跳转文本 */
  jumpText?: React.ReactNode;
  /** 自定义页码文本 */
  pageText?: React.ReactNode;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      current,
      defaultCurrent = 1,
      total = 0,
      pageSize,
      defaultPageSize = 10,
      showTotal = false,
      showQuickJumper = false,
      showSizeChanger = false,
      pageSizeOptions = [10, 20, 50, 100],
      simple = false,
      disabled = false,
      size = 'md',
      onChange,
      onShowSizeChange,
      className = '',
      style,
      prevText,
      nextText,
      jumpText,
      pageText,
    },
    ref
  ) => {
    const { t } = useI18n();
    const [internalCurrent, setInternalCurrent] = React.useState(current || defaultCurrent);
    const [internalPageSize, setInternalPageSize] = React.useState(pageSize || defaultPageSize);

    const isCurrentControlled = current !== undefined;
    const isPageSizeControlled = pageSize !== undefined;

    const totalPages = useMemo(() => {
      return Math.ceil(total / internalPageSize);
    }, [total, internalPageSize]);

    const displayCurrent = isCurrentControlled ? current! : internalCurrent;

    React.useEffect(() => {
      if (isCurrentControlled && current !== undefined) {
        setInternalCurrent(current);
      }
    }, [current, isCurrentControlled]);

    React.useEffect(() => {
      if (isPageSizeControlled && pageSize !== undefined) {
        setInternalPageSize(pageSize);
      }
    }, [pageSize, isPageSizeControlled]);

    const handlePageChange = (page: number) => {
      if (disabled || page < 1 || page > totalPages || page === displayCurrent) return;
      if (!isCurrentControlled) {
        setInternalCurrent(page);
      }
      onChange?.(page, internalPageSize);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newPageSize = parseInt(e.target.value, 10);
      if (!isPageSizeControlled) {
        setInternalPageSize(newPageSize);
        setInternalCurrent(1);
      }
      onShowSizeChange?.(1, newPageSize);
    };

    const handleQuickJumperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 1 && value <= totalPages) {
        handlePageChange(value);
      }
    };

    const renderPageNumbers = () => {
      if (simple) return null;

      const pages: (number | 'ellipsis')[] = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (displayCurrent <= 3) {
          for (let i = 1; i <= 5; i++) pages.push(i);
          pages.push('ellipsis');
          pages.push(totalPages);
        } else if (displayCurrent >= totalPages - 2) {
          pages.push(1);
          pages.push('ellipsis');
          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('ellipsis');
          pages.push(displayCurrent - 1);
          pages.push(displayCurrent);
          pages.push(displayCurrent + 1);
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      }

      return pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="ly-pagination__ellipsis">
              ···
            </span>
          );
        }
        return (
          <span
            key={page}
            className={`ly-pagination__item ${displayCurrent === page ? 'ly-pagination__item--active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </span>
        );
      });
    };

    const classes = useMemo(() => {
      const classList = ['ly-pagination', `ly-pagination--${size}`];
      if (disabled) classList.push('ly-pagination--disabled');
      if (simple) classList.push('ly-pagination--simple');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, disabled, simple, className]);

    const range = useMemo(() => {
      const start = (displayCurrent - 1) * internalPageSize + 1;
      const end = Math.min(displayCurrent * internalPageSize, total);
      return [start, end];
    }, [displayCurrent, internalPageSize, total]);

    return (
      <div ref={ref} className={classes} style={style}>
        {showTotal && (
          <div className="ly-pagination__total">
            {typeof showTotal === 'function'
              ? showTotal(total, range as [number, number])
              : t('pagination.total', { total })}
          </div>
        )}
        <div className="ly-pagination__controls">
          <span
            className={`ly-pagination__item ly-pagination__prev ${
              displayCurrent === 1 ? 'ly-pagination__item--disabled' : ''
            }`}
            onClick={() => handlePageChange(displayCurrent - 1)}
          >
            {prevText || (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span>{t('pagination.prev')}</span>
              </>
            )}
          </span>
          {renderPageNumbers()}
          <span
            className={`ly-pagination__item ly-pagination__next ${
              displayCurrent === totalPages ? 'ly-pagination__item--disabled' : ''
            }`}
            onClick={() => handlePageChange(displayCurrent + 1)}
          >
            {nextText || (
              <>
                <span>{t('pagination.next')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </span>
        </div>
        <div className="ly-pagination__options">
          {showSizeChanger && (
            <select
              className="ly-pagination__select"
              value={internalPageSize}
              onChange={handlePageSizeChange}
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size} {t('pagination.pageSize')}
                </option>
              ))}
            </select>
          )}
          {showQuickJumper && (
            <div className="ly-pagination__jumper">
              {jumpText || t('pagination.jumpTo')} <input type="number" onChange={handleQuickJumperChange} /> {pageText || t('pagination.page')}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
