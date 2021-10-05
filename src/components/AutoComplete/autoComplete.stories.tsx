import React, { CSSProperties } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AutoComplete, DataSourceType } from './autoComplete';

const SimpleComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} />;
};
const RenderComplete = () => {
  interface LakerPlayerProps {
    value: string;
    number: number;
  }
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    const player = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <h2>Name: {player.value}</h2>
        <p>Number: {player.number}</p>
      </>
    );
  };
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};
const AsyncComplete = () => {
  interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
  }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    const imgStyle: CSSProperties = {
      width: '50px',
      margin: '0 10px',
    };
    return (
      <>
        <p>
          名称:
          <img style={imgStyle} src={itemWithGithub.avatar_url} alt={itemWithGithub.value}></img> {itemWithGithub.value}
        </p>
        {<p>主页: {itemWithGithub.url}</p>}
      </>
    );
  };
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
  .add('RenderComplete', RenderComplete)
  .add('支持异步的 AutoComplete', AsyncComplete);
