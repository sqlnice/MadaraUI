import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import { MENUITEM_DISPLAYNAME, IMenuItemProps } from './menuItem';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
export interface ISubMenuProps {
  /**  */
  index?: string;
  /** 	下拉菜单选项的文字 */
  title: string;
  /** 下拉菜单选型的扩展类名 */
  className?: string;
}

export const SubMenu: React.FC<ISubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const calsses = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  // 垂直
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  // 水平
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames('ma-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === MENUITEM_DISPLAYNAME) {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={calsses} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

export const SUBMENU_DISPLAYNAME = 'SubMenu';
SubMenu.displayName = SUBMENU_DISPLAYNAME;
export default SubMenu;
