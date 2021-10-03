import React, { createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MENUITEM_DISPLAYNAME, IMenuItemProps } from './menuItem';
import { SUBMENU_DISPLAYNAME } from './subMenu';
type MenuMode = 'horizontal' | 'vertical';
type selectCallBack = (selectedIndex: string) => void;

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallBack;
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

const Menu: React.FC<IMenuProps> = (props) => {
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
