import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

// Omit 忽略接口中的一个值
interface IInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: InputSize;
  /** 支持 fortawesome 图标 */
  icon?: IconProp;
  /** 前缀 */
  prepend?: string | ReactElement;
  /** 后缀 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 输入框
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'ma-ui'
 * 支持 HTMLInput 的所有基本属性
 * ~~~
 */
export const Input: FC<IInputProps> = (props) => {
  // 取出各种属性
  const { disabled, size, icon, prepend, append, style, ...resetProps } = props;

  // 计算 className
  const classes = classNames('ma-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  // react 受控组件
  if ('value' in props) {
    const fixControlledValue = (value: any) => (typeof value === 'undefined' || value === null ? '' : value);
    delete resetProps.defaultValue;
    resetProps.value = fixControlledValue(resetProps.value);
  }
  return (
    //  判断是否添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="ma-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input className="ma-input-inner" disabled={disabled} {...resetProps} />
      {append && <div className="ma-input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};
export default Input;
