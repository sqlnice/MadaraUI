import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react';

import { Upload, IUploadProps } from './upload';

jest.mock('../Icon/icon', () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: IUploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector('.ma-file-input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
    // 模拟发送数据
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
  });
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(queryByText('check-circle')).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    expect(queryByText('times')).toBeInTheDocument();
    fireEvent.click(queryByText('times') as HTMLInputElement);
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    );
  });
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
  });
});
