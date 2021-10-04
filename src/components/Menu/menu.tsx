import React, { createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MENUITEM_DISPLAYNAME, IMenuItemProps } from './menuItem';
import { SUBMENU_DISPLAYNAME } from './subMenu';
type MenuMode = 'horizontal' | 'vertical';
type selectCallBack = (selectedIndex: string) => void;

export interface IMenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: selectCallBack;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: selectCallBack;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
  defaultOpenSubMenus: [],
});

/**
 * 导航功能菜单。支持横向纵向两种模式，支持下拉菜单
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from 'ma-ui'
 * // 然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
export const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex || '0');

  const classes = classNames('ma-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>;
      if (
        childElement.type.displayName &&
        [MENUITEM_DISPLAYNAME, SUBMENU_DISPLAYNAME].includes(childElement.type.displayName)
      ) {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
  };

  return (
    <MenuContext.Provider value={passedContext}>
      <ul className={classes} style={style} data-testid="test-menu">
        {renderChildren()}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
