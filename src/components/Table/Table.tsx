import React, { forwardRef, useMemo } from 'react';
import './Table.css';

export interface TableColumn<T = any> {
  /** 列标题 */
  title: string;
  /** 数据字段 */
  dataIndex: string;
  /** 列宽 */
  width?: string | number;
  /** 最小宽度 */
  minWidth?: string | number;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可调整宽度 */
  resizable?: boolean;
  /** 自定义渲染 */
  render?: (value: any, record: T, index: number) => React.ReactNode;
  /** 是否隐藏列 */
  hidden?: boolean;
}

export interface TableProps<T = any> {
  /** 列配置 */
  columns: TableColumn<T>[];
  /** 数据源 */
  dataSource: T[];
  /** 是否带边框 */
  bordered?: boolean;
  /** 是否带斑马纹 */
  striped?: boolean;
  /** 是否带hover效果 */
  hoverable?: boolean;
  /** 是否紧凑模式 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 行类名 */
  rowClassName?: string | ((record: T, index: number) => string);
  /** 行点击事件 */
  onRowClick?: (record: T, index: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 空状态文本 */
  emptyText?: string | React.ReactNode;
  /** 是否加载中 */
  loading?: boolean;
  /** 滚动配置 */
  scroll?: { x?: string | number; y?: string | number };
  /** 行选择配置 */
  rowSelection?: {
    selectedRowKeys?: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      columns = [],
      dataSource = [],
      bordered = false,
      striped = false,
      hoverable = true,
      size = 'md',
      showHeader = true,
      rowClassName,
      onRowClick,
      className = '',
      style,
      emptyText,
      loading = false,
      scroll,
      rowSelection,
    },
    ref
  ) => {
    const visibleColumns = useMemo(() => {
      return columns.filter(col => !col.hidden);
    }, [columns]);

    const getRowClassName = (record: any, index: number) => {
      const classList = ['ly-table__row'];
      if (striped && index % 2 === 1) {
        classList.push('ly-table__row--striped');
      }
      if (hoverable) {
        classList.push('ly-table__row--hoverable');
      }
      if (rowClassName) {
        if (typeof rowClassName === 'function') {
          classList.push(rowClassName(record, index));
        } else {
          classList.push(rowClassName);
        }
      }
      return classList.join(' ');
    };

    const handleRowClick = (record: any, index: number, e: React.MouseEvent) => {
      if (rowSelection?.getCheckboxProps?.(record)?.disabled) return;
      onRowClick?.(record, index);
    };

    const classes = useMemo(() => {
      const classList = ['ly-table', `ly-table--${size}`];
      if (bordered) classList.push('ly-table--bordered');
      if (loading) classList.push('ly-table--loading');
      if (className) classList.push(className);
      return classList.join(' ');
    }, [size, bordered, loading, className]);

    const tableStyle = useMemo(() => {
      const customStyle: React.CSSProperties = { ...style };
      if (scroll?.x) {
        customStyle.width = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x;
        customStyle.minWidth = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x;
      }
      if (scroll?.y) {
        customStyle.maxHeight = typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y;
      }
      return customStyle;
    }, [scroll, style]);

    const isSelected = (record: any) => {
      if (!rowSelection?.selectedRowKeys) return false;
      const key = record.id ?? record.key ?? dataSource.indexOf(record);
      return rowSelection.selectedRowKeys.includes(key);
    };

    const handleSelectAll = (checked: boolean) => {
      if (!rowSelection) return;
      const selectableRows = dataSource.filter(
        row => !rowSelection.getCheckboxProps?.(row)?.disabled
      );
      const allKeys = selectableRows.map((row, index) => row.id ?? row.key ?? index);
      if (checked) {
        rowSelection.onChange?.(allKeys, selectableRows);
      } else {
        rowSelection.onChange?.([], []);
      }
    };

    const handleSelectRow = (record: any, checked: boolean) => {
      if (!rowSelection) return;
      const key = record.id ?? record.key ?? dataSource.indexOf(record);
      const selectedKeys = checked
        ? [...(rowSelection.selectedRowKeys || []), key]
        : (rowSelection.selectedRowKeys || []).filter(k => k !== key);
      const selectedRows = dataSource.filter(row => {
        const rowKey = row.id ?? row.key ?? dataSource.indexOf(row);
        return selectedKeys.includes(rowKey);
      });
      rowSelection.onChange?.(selectedKeys, selectedRows);
    };

    const allSelected = useMemo(() => {
      if (!rowSelection) return false;
      const selectableRows = dataSource.filter(
        row => !rowSelection.getCheckboxProps?.(row)?.disabled
      );
      if (selectableRows.length === 0) return false;
      const selectableKeys = selectableRows.map((row, index) => row.id ?? row.key ?? index);
      return selectableKeys.every(key => rowSelection.selectedRowKeys?.includes(key));
    }, [dataSource, rowSelection]);

    const someSelected = useMemo(() => {
      if (!rowSelection) return false;
      if (allSelected) return false;
      const selectableRows = dataSource.filter(
        row => !rowSelection.getCheckboxProps?.(row)?.disabled
      );
      const selectableKeys = selectableRows.map((row, index) => row.id ?? row.key ?? index);
      return selectableKeys.some(key => rowSelection.selectedRowKeys?.includes(key));
    }, [dataSource, rowSelection, allSelected]);

    return (
      <div className={classes} style={tableStyle}>
        <table ref={ref}>
          {showHeader && (
            <thead className="ly-table__header">
              <tr>
                {rowSelection && (
                  <th className="ly-table__cell ly-table__cell--selection">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {visibleColumns.map((column, index) => (
                  <th
                    key={index}
                    className="ly-table__cell ly-table__cell--header"
                    style={{
                      width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
                      minWidth: column.minWidth ? (typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth) : undefined,
                      textAlign: column.align,
                      position: column.fixed ? 'sticky' : undefined,
                      left: column.fixed === 'left' ? (rowSelection ? '3rem' : '0') : undefined,
                      zIndex: column.fixed ? 2 : undefined,
                    }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="ly-table__body">
            {dataSource.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}
                  className="ly-table__cell ly-table__cell--empty"
                >
                  {loading ? <div className="ly-spin ly-spin--sm" /> : (emptyText || t('table.emptyText'))}
                </td>
              </tr>
            ) : (
              dataSource.map((record, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={getRowClassName(record, rowIndex)}
                  onClick={(e) => handleRowClick(record, rowIndex, e)}
                >
                  {rowSelection && (
                    <td className="ly-table__cell ly-table__cell--selection">
                      <input
                        type="checkbox"
                        checked={isSelected(record)}
                        disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                        onChange={(e) => handleSelectRow(record, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {visibleColumns.map((column, colIndex) => {
                    const value = record[column.dataIndex];
                    const content = column.render ? column.render(value, record, rowIndex) : value;
                    return (
                      <td
                        key={colIndex}
                        className="ly-table__cell"
                        style={{
                          textAlign: column.align,
                          position: column.fixed ? 'sticky' : undefined,
                          left: column.fixed === 'left' ? (rowSelection ? '3rem' : '0') : undefined,
                          zIndex: column.fixed ? 1 : undefined,
                        }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;
