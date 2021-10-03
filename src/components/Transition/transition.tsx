import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type Animation = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps<Ref extends HTMLElement | undefined = undefined> = CSSTransitionProps<Ref> & {
  animation?: Animation;
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {
  /**
   * solve https://github.com/reactjs/react-transition-group/issues/668
   */
  const nodeRef = React.useRef(null);

  const { children, classNames, animation, wrapper, ...resetProps } = props;
  return (
    <CSSTransition nodeRef={nodeRef} classNames={classNames ? classNames : animation} {...resetProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true, // 初次加载也有动画
  unmountOnExit: true, // 进入时挂载 离开时卸载
};

export default Transition;
