import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload from './upload';

const SimpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    ></Upload>
  );
};

const checkFileUpload = () => {
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
        action="https://jsonplaceholder.typicode.com/posts/"
        beforeUpload={checkFileSize}
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
      >
        Check File Size
      </Upload>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
        beforeUpload={filePromise}
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
      >
        Check return Promise
      </Upload>
    </>
  );
};
storiesOf('Upload component', module).add('Upload', SimpleUpload).add('上传前检测文件', checkFileUpload);
