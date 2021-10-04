import React, { FC } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export type ThemeProps = 'primary' | 'scondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IIconProps extends FontAwesomeIconProps {
  /** 主题 */
  theme?: ThemeProps;
  className?: string;
}

/**
 * 基于 react-fontawesome 提供的一套图标合集。
 * 支持 react-fontawesome的所有属性 可以在这里查询 https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
 *
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'ma-ui'
 * ~~~
 */
export const Icon: FC<IIconProps> = ({ theme, className, ...resetProps }) => {
  const classes = classNames('ma-icon', className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...resetProps}></FontAwesomeIcon>;
};

export default Icon;
