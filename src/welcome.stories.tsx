import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 madara 组件库</h1>
        <p>madara 是一个实验性的小型组件库，使用 React Hooks 和 typescript</p>
        <h3>安装试试~</h3>
        <code>npm install madara-ui -S</code>
        <p></p>
      </>
    )
  },
  { info: { disable: true } }
)
