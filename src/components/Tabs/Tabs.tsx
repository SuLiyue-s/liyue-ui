import React, { forwardRef, useMemo, useState } from 'react';
import './Tabs.css';

export interface TabItem {
  /** 唯一标识 */
  key: string;
  /** 标签页标题 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
}

export interface TabsProps {
  /** tabs数据 */
  items: TabItem[];
  /** 当前激活的tab */
  activeKey?: string;
  /** 默认激活的tab */
  defaultActiveKey?: string;
  /** tabs位置 */
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** 标签样式 */
  type?: 'line' | 'card' | 'segment';
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否可以增删tab */
  editable?: boolean;
  /** 是否使用动画 */
  animated?: boolean;
  /** 变化回调 */
  onChange?: (key: string) => void;
  /** 点击回调 */
  onTabClick?: (key: string, e: React.MouseEvent) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items = [],
      activeKey,
      defaultActiveKey,
      tabPosition = 'top',
      type = 'line',
      size = 'md',
      animated: _animated = true,
      onChange,
      onTabClick,
      className = '',
      style,
    },
    ref
  ) => {
    const [internalActiveKey, setInternalActiveKey] = useState<string | undefined>(
      activeKey || defaultActiveKey || items[0]?.key
    );

    const isActiveKeyControlled = activeKey !== undefined;
    const currentActiveKey = isActiveKeyControlled ? activeKey : internalActiveKey;

    const handleTabClick = (key: string, e: React.MouseEvent) => {
      const item = items.find(i => i.key === key);
      if (item?.disabled) return;
      
      if (!isActiveKeyControlled) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
      onTabClick?.(key, e);
    };

    const classes = useMemo(() => {
      const classList = ['ly-tabs', `ly-tabs--${tabPosition}`, `ly-tabs--${type}`, `ly-tabs--${size}`];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [tabPosition, type, size, className]);

    const activeItem = items.find(item => item.key === currentActiveKey);

    return (
      <div ref={ref} className={classes} style={style}>
        <div className="ly-tabs__nav">
          <div className="ly-tabs__nav-list">
            {items.map(item => (
              <div
                key={item.key}
                className={`ly-tabs__tab ${currentActiveKey === item.key ? 'ly-tabs__tab--active' : ''} ${
                  item.disabled ? 'ly-tabs__tab--disabled' : ''
                }`}
                onClick={(e) => handleTabClick(item.key, e)}
              >
                {item.icon && <span className="ly-tabs__tab-icon">{item.icon}</span>}
                <span className="ly-tabs__tab-label">{item.label}</span>
              </div>
            ))}
          </div>
          {type === 'line' && (
            <div
              className="ly-tabs__line"
              style={{
                transform: `translateX(${items.findIndex(i => i.key === currentActiveKey)}00%)`,
                width: `${100 / items.length}%`,
              }}
            />
          )}
        </div>
        <div className="ly-tabs__content">
          {activeItem?.children}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
