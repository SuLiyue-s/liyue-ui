import React, { forwardRef, useMemo, useState } from 'react';
import './Menu.css';

export interface MenuItem {
  /** 唯一标识 */
  key: string;
  /** 菜单标题 */
  label: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子菜单 */
  children?: MenuItem[];
}

export interface MenuProps {
  /** 菜单数据 */
  items: MenuItem[];
  /** 当前选中的菜单 */
  selectedKey?: string;
  /** 默认选中的菜单 */
  defaultSelectedKey?: string;
  /** 展开的子菜单 */
  openKeys?: string[];
  /** 默认展开的子菜单 */
  defaultOpenKeys?: string[];
  /** 菜单模式 */
  mode?: 'horizontal' | 'vertical' | 'inline';
  /** 是否支持多选 */
  multiple?: boolean;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 缩进宽度 */
  inlineIndent?: number;
  /** 子菜单展开方式 */
  subMenuOpenType?: 'click' | 'hover';
  /** 选择回调 */
  onSelect?: (key: string, item: MenuItem) => void;
  /** 展开回调 */
  onOpenChange?: (keys: string[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items = [],
      selectedKey,
      defaultSelectedKey,
      openKeys,
      defaultOpenKeys = [],
      mode = 'vertical',
      multiple = false,
      theme = 'light',
      inlineIndent = 1.5,
      subMenuOpenType = 'click',
      onSelect,
      onOpenChange,
      className = '',
      style,
    },
    ref
  ) => {
    const [internalSelectedKey, setInternalSelectedKey] = useState<string | undefined>(
      selectedKey || defaultSelectedKey
    );
    const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(
      openKeys || defaultOpenKeys
    );

    const isSelectedKeyControlled = selectedKey !== undefined;
    const isOpenKeysControlled = openKeys !== undefined;

    const currentSelectedKey = isSelectedKeyControlled ? selectedKey : internalSelectedKey;
    const currentOpenKeys = isOpenKeysControlled ? openKeys : internalOpenKeys;

    const handleSelect = (item: MenuItem) => {
      if (item.disabled) return;
      if (!isSelectedKeyControlled) {
        setInternalSelectedKey(item.key);
      }
      onSelect?.(item.key, item);
    };

    const handleOpenChange = (key: string) => {
      let newOpenKeys: string[];
      if (currentOpenKeys.includes(key)) {
        newOpenKeys = currentOpenKeys.filter(k => k !== key);
      } else {
        newOpenKeys = [...currentOpenKeys, key];
      }
      if (!isOpenKeysControlled) {
        setInternalOpenKeys(newOpenKeys);
      }
      onOpenChange?.(newOpenKeys);
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = currentOpenKeys.includes(item.key);
      const isSelected = currentSelectedKey === item.key;

      return (
        <div key={item.key} className="ly-menu__item-wrapper">
          <div
            className={`ly-menu__item ${isSelected ? 'ly-menu__item--selected' : ''} ${
              item.disabled ? 'ly-menu__item--disabled' : ''
            }`}
            style={{ paddingLeft: mode === 'inline' ? `${level * inlineIndent}rem` : undefined }}
            onClick={() => {
              if (hasChildren) {
                handleOpenChange(item.key);
              } else {
                handleSelect(item);
              }
            }}
            onMouseEnter={subMenuOpenType === 'hover' && hasChildren ? () => handleOpenChange(item.key) : undefined}
          >
            {item.icon && <span className="ly-menu__item-icon">{item.icon}</span>}
            <span className="ly-menu__item-label">{item.label}</span>
            {hasChildren && (
              <span className="ly-menu__item-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            )}
          </div>
          {hasChildren && isOpen && mode === 'inline' && (
            <div className="ly-menu__submenu">
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    const classes = useMemo(() => {
      const classList = ['ly-menu', `ly-menu--${mode}`, `ly-menu--${theme}`];
      if (className) classList.push(className);
      return classList.join(' ');
    }, [mode, theme, className]);

    return (
      <div ref={ref} className={classes} style={style}>
        {items.map(item => renderMenuItem(item))}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
