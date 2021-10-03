import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonType, ButtonSize } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'testClass',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  it('should render the correct default button', async () => {
    const wrapper = render(<Button {...defaultProps}>Default</Button>);
    const element = wrapper.queryByText('Default') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    // 检查方法是否被调用
    // fireEvent.click(element);
    // expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Ok</Button>);
    const element = wrapper.queryByText('Ok') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-primary btn-lg testClass');
  });
  it('should render a link when btnType equals link and href is provied', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="www.baidu.com">
        Link
      </Button>
    );
    const element = wrapper.queryByText('Link');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.queryByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
