import { storiesOf } from '@storybook/react'
import Avatar from './avatar'
const avatarWithSize = () => (
  <>
    <Avatar size='sm' />
    <Avatar />
    <Avatar size={80} />
  </>
)
storiesOf('Avatar', module).add('不同大小', avatarWithSize)
