import { FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon'

export type AvatarSize = 'lg' | 'sm' | number
export type AvatarShape = 'circle' | 'square'

export interface IAvatarProps {
  /** 大小 */
  size?: AvatarSize
  /** 形状 */
  shape?: AvatarShape
  /** 图标 */
  icon?: IconProp
}

export const Avatar: FC<IAvatarProps> = props => {
  const { size, shape, icon, children, ...restProps } = props
  const classes = classNames('avatar', {
    [`avatar-${size}`]: typeof size !== 'number',
    [`avatar-${shape}`]: shape,
    [`avatar-icon`]: icon,
  })
  const sizeStyle =
    typeof size === 'number'
      ? {
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
        }
      : {}
  return (
    <div className={classes} style={sizeStyle} {...restProps}>
      {children}
      {icon && <Icon icon={icon}></Icon>}
    </div>
  )
}

Avatar.defaultProps = {
  size: 'lg',
  shape: 'circle',
  icon: 'cat',
}
export default Avatar
