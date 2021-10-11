import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuItemProps {
  index?: string;
  /** 选项是否被禁用 */
  disabled?: boolean;
  /** 选项扩展的 className */
  className?: string;
  /** 选项的自定义 style */
  style?: React.CSSProperties;
}
export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export const MENUITEM_DISPLAYNAME = 'MenuItem';
MenuItem.displayName = MENUITEM_DISPLAYNAME;

export default MenuItem;
