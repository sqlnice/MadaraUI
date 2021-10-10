import React from 'react';
import { storiesOf } from '@storybook/react';
import Progress from './progress';

const defaultProgress = () => <Progress percent={20} />;

const withTextProgress = () => <Progress percent={50} showText={false} />;

const strokeHeightProgress = () => <Progress percent={50} strokeHeight={50} />;

storiesOf('Progress Component', module)
  .add('Progress', defaultProgress)
  .add('不显示百分比', withTextProgress)
  .add('不同的高度', strokeHeightProgress);
