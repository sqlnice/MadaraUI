import React, { FC, useState } from 'react';
import Icon from '../Icon';
import Transition from '../Transition';
import classNames from 'classnames';

export type AlertType = 'success' | 'primary' | 'warning' | 'danger' | 'default';

export interface IAlertProps {
  /** 标题 */
  title?: string;
  /** 是否显示关闭图标 */
  closable?: boolean;
  /** the close icon */
  customClose?: string;
  /** 关闭alert时触发的事件 */
  onClose?: () => void;
  /** 描述 */
  children?: React.ReactNode;
  /** 	类型 四种可选 针对四种不同的场景 */
  type: AlertType;
}

export const Alert: FC<IAlertProps> = (props) => {
  const { title, closable, customClose, onClose, children, type } = props;

  const customCloseP = customClose || <Icon icon="times" className="window-close" size="lg" />;
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  });
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(false);
    onClose && onClose();
  };
  return (
    <Transition in={visible} timeout={300} animation="zoom-in-left" wrapper>
      <div className={classes}>
        {title ? <h4 className="alert-title">{title}</h4> : null}
        <p className="alert-message">{children}</p>
        {closable ? <i onClick={handleClick}>{customCloseP}</i> : null}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: true,
  type: 'primary',
};

export default Alert;
