import React, { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';
import Input, { IInputProps } from '../Input/input';

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  /** 筛选函数 */
  fetchSuggestions: (str: string) => string[];
  /** 选中的回调 */
  onSelect?: (item: string) => void;
}

/**
 * 页面中最常用的的输入框元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'ma-ui'
 * ~~~
 */
export const AutoComplete: FC<IAutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...resetProps } = props;

  const [inputValue, setInputValue] = useState(value);

  const [suggestions, setSeggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      setSeggestions(fetchSuggestions(value));
    } else {
      setSeggestions([]);
    }
  };
  const handleSelect = (item: string) => {
    setInputValue(item);
    if (onSelect) onSelect(item);
    setSeggestions([]);
  };
  const generaterDropdown = () => {
    return (
      <ul className="ma-suggestion-list">
        {suggestions.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="ma-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...resetProps} />
      {generaterDropdown()}
    </div>
  );
};

export default AutoComplete;
