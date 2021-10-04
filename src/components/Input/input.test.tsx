import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input, { IInputProps } from './input';

const defaultProps: IInputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps}></Input>);
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('ma-input-inner');
    fireEvent.change(testNode, { target: { value: '123' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('123');
  });
  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input disabled placeholder="disabled" />);
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it('should render different input sizes on size property', () => {
    const wrapper = render(<Input placeholder="sizes" size="lg" />);
    const testContainer = wrapper.container.querySelector('.ma-input-wrapper');
    expect(testContainer).toHaveClass('input-size-lg');
  });
  it('should render prepend and append element on prepend/append property', () => {
    const { queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com" />);
    const testContainer = container.querySelector('.ma-input-wrapper');
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    expect(queryByText('https://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
});
