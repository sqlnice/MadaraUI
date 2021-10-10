import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload, { IUploadFile } from './upload';
import Icon from '../Icon/icon';
import Button from '../Button/button';

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    >
      <Button btnType="primary">Upload File</Button>
    </Upload>
  );
};

const CheckFileUpload = () => {
  // 上传前检测文件大小  直接返回布尔值
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big');
      return false;
    }
    return true;
  };

  // 上传前 改变文件名 返回 promise
  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type });
    return Promise.resolve(newFile);
  };
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={checkFileSize}
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
      >
        <Button btnType="primary">Check File Size</Button>
      </Upload>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={filePromise}
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
      >
        <Button btnType="primary">Check return Promise</Button>
      </Upload>
    </>
  );
};

const DefaultFileListUpload = () => {
  const defaultFileList: IUploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
  ];
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onRemove={action('remove')}
      defaultFileList={defaultFileList}
    >
      <Button btnType="primary">默认的文件列表</Button>
    </Upload>
  );
};

const SetUploadHeaders = () => {
  return (
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" headers={{ 'X-Powered-By': 'madara' }}>
      <Button btnType="primary">自定义headers</Button>
    </Upload>
  );
};

const LimitUploadOption = () => {
  return (
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" accept=".jpg" multiple>
      <Button btnType="primary">限制上传选项(只可选择.jpg文件)</Button>
    </Upload>
  );
};
const DraggerUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      onRemove={action('removed')}
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
  .add('上传前检测文件', CheckFileUpload)
  .add('默认的文件列表', DefaultFileListUpload)
  .add('自定义headers', SetUploadHeaders)
  .add('限制上传选项', LimitUploadOption)
  .add('拖动上传', DraggerUpload);
