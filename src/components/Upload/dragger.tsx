import React, { FC, useState, DragEvent } from 'react';
import classNames from 'classnames';

interface IDraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<IDraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames('ma-uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
