import React, { ChangeEvent, FC, useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface IUploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface IUploadProps {
  /** 发送请求地址 */
  action: string;
  /** 文件列表 */
  defaultFileList?: IUploadFile[];
  /**
   * 上传文件之前验证或进行转换
   * @param file
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传过程的事件 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功的事件 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败的事件 */
  onError?: (err: any, file: File) => void;
  /** 上传行为改变 */
  onChange?: (file: File) => void;
  /** 移除上传的文件 */
  onRemove?: (file: IUploadFile) => void;
  /** 添加自定义 header */
  headers?: { [key: string]: any };
  // 添加name 属性 - 代表发到后台的文件参数名称
  /** 文件名 */
  name?: string;
  // 添加data属性 - 上传所需的额外参数
  /** 添加data属性 - 上传所需的额外参数 */
  data?: { [key: string]: any };
  /** 是否携带请求参数 */
  withCredentials?: boolean;
  // 添加input本身的file约束属性 multiple accept等
  // accept 限定约束文件的类型
  /** 可接受上传文件的类型 */
  accept?: string;
  /** 允许上传多个文件 */
  multiple?: boolean;
  /** 是否拖动上传 */
  drag?: boolean;
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload} from 'vikingship-ui'
 * ~~~
 */
export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<IUploadFile[]>(defaultFileList || []);
  const updateFileList = (updateFile: IUploadFile, updateObj: Partial<IUploadFile>) => {
    setFileList((preList) => {
      return preList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    fileInput.current && fileInput.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // 执行上传方法
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = '';
  };
  const post = (file: File) => {
    const _file: IUploadFile = {
      uid: Date.now() + '',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Context-Type': 'multipart/form-data',
        },
        withCredentials,
        // 监视上传进度
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { status: 'uploading', percent: percentage });
            // 给用户传递回调
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: 'success', response: res.data });
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  const handleRemove = (file: IUploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  return (
    <div className="ma-upload-component">
      <div className="ma-upload-input" style={{ display: 'inline-block' }} onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="ma-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
