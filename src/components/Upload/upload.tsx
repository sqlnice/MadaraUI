import React, { ChangeEvent, FC, useRef } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Button from '../Button/button';

export interface IUploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

export const Upload: FC<IUploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // 执行上传方法
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = '';
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios
        .post(action, formData, {
          headers: {
            'Context-Type': 'multipart/form-data',
          },
          // 监视上传进度
          onUploadProgress: (e) => {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100 && onProgress) {
              // 给用户传递回调
              onProgress(percentage, file);
            }
          },
        })
        .then((res) => {
          if (onSuccess) onSuccess(res.data, file);
        })
        .catch((err) => {
          if (onError) onError(err, file);
        });
    });
  };
  return (
    <div className="ma-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        ref={fileInput}
        onChange={handleFileChange}
        className="ma-upload-input"
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Upload;
