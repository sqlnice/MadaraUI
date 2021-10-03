import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'scondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IIconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
  className?: string;
}

const Icon: React.FC<IIconProps> = ({ theme, className, ...resetProps }) => {
  const classes = classNames('ma-icon', className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...resetProps}></FontAwesomeIcon>;
};

export default Icon;
