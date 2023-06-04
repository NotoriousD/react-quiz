import React, {
  useRef,
  useState,
  PropsWithChildren,
  useMemo,
  useEffect,
} from 'react';
import cx from 'classnames';
import Button from '@mui/material/Button';

import { FormFields } from 'types';

import { convertBase64ToBlob } from 'helpers/blobConverter';

import css from './fileUploader.module.scss';
import { getDataFromStorage, setDataToStorage } from 'helpers/sessionStorage';

interface FileUploaderProps {
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
  isMultiply?: boolean;
  onChange: (
    name: keyof FormFields,
    files: Blob | Blob[],
    event: ChangeEventType
  ) => void;
}

export enum ChangeEventType {
  Add = 'add',
  Remove = 'remove',
}

export const FileUploader: React.FC<PropsWithChildren<FileUploaderProps>> = ({
  label,
  name,
  children,
  disabled = false,
  isMultiply = false,
  onChange,
}) => {
  const [fileList, setFileList] = useState<Record<string, Blob>>({});
  const inputFile = useRef<HTMLInputElement | null>(null);

  const isButtonDisable = !isMultiply && Boolean(Object.keys(fileList).length);

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const imageFile = e.target.files;
      Object.keys(imageFile).forEach((i: any) => {
        const file = imageFile[i];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const srcData = fileReader.result;
          if (srcData) {
            const blob = convertBase64ToBlob(srcData.toString());
            setFileList((prev) => ({ ...prev, [file.name]: blob }));
            setDataToStorage(name, { ...fileList, [file.name]: blob });
            onChange(name as keyof FormFields, blob, ChangeEventType.Add);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleSelectImage = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const onRemove = (fileName: keyof typeof fileList) => {
    const newFiles = { ...fileList };
    delete newFiles[fileName];
    setFileList(newFiles);
    setDataToStorage(name, newFiles);
    onChange(
      name as keyof FormFields,
      Object.values(newFiles),
      ChangeEventType.Remove
    );
  };

  const getFiles = useMemo(() => {
    if (Object.keys(fileList).length) {
      return Object.keys(fileList);
    }
    return [];
  }, [fileList]);

  useEffect(() => {
    const storageData = getDataFromStorage(name);

    if (storageData) {
      setFileList(storageData);
    }
  }, [name]);

  return (
    <div className={css.root}>
      {Boolean(label) && <div className={css.label}>{label}</div>}
      <div className={css.description}>{children}</div>
      <Button
        className={cx(css.fileButton)}
        type="button"
        size="small"
        variant="contained"
        onClick={handleSelectImage}
        disabled={isButtonDisable || disabled}
      >
        Завантажити файл
      </Button>
      <input
        type="file"
        accept="image/*"
        className={css.file}
        ref={inputFile}
        onChange={handleSetImage}
      />
      <ol className={css.files}>
        {Boolean(getFiles.length) &&
          getFiles.map((file) => (
            <li key={file}>
              {file}
              <span className={css.remove} onClick={() => onRemove(file)}>
                +
              </span>
            </li>
          ))}
      </ol>
    </div>
  );
};
