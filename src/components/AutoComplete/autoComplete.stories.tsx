import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import AutoComplete, { IAutoCompleteProps } from './autoComplete';

const handleFetch = (query: string) => {
  console.log(query);

  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ];
  return lakers.filter((item) => item.includes(query));
};

const defaultAutoComplete = () => {
  return <AutoComplete fetchSuggestions={handleFetch}></AutoComplete>;
};
storiesOf('AutoComplete Component', module).add('AutoComplete', defaultAutoComplete);
