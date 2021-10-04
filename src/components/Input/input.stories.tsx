import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './input';

const defaultStyle = {
  width: '300px',
};

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></Input>
  );
};

const defaultInput = () => (
  <>
    <Input style={defaultStyle} placeholder="default input" onChange={action('changed')}></Input>
    <ControlledInput></ControlledInput>
  </>
);

const inputWithDisabled = () => <Input style={defaultStyle} placeholder="disabled input" disabled></Input>;
const inputWithIcon = () => <Input style={defaultStyle} placeholder="icon input" icon="search"></Input>;
const inputWithSize = () => (
  <>
    <Input style={defaultStyle} placeholder="lg input" size="lg"></Input>
    <Input style={defaultStyle} placeholder="sm input" size="sm"></Input>
  </>
);
const inputWithPad = () => (
  <>
    <Input style={defaultStyle} placeholder="prepend input" prepend="https://"></Input>
    <Input style={defaultStyle} placeholder="icon input" append=".com"></Input>
  </>
);
storiesOf('Input coponent', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', inputWithDisabled)
  .add('带图标的 Input', inputWithIcon)
  .add('不同尺寸的 Input', inputWithSize)
  .add('带前后缀的 Input', inputWithPad);
