import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { addDecorator, addParameters, configure } from '@storybook/react';
// 全局样式文件
import '../src/styles/index.scss';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
};

// 增加一层 wrapper 说明
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);

// 添加 全局修饰器，也可在单个 stories 里面增加
addDecorator(storyWrapper);

// 添加 显示组件信息
addDecorator(withInfo);

// 添加组件信息的配置
addParameters({
  info: {
    inline: true, // 直接展示信息，不需要用户点击 show info 图标
    header: false,
  },
});

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach((file) => allExports.push(req(file)));
  return allExports;
};

configure(loaderFn, module);
