import React, {
  useRef,
  useState,
  PropsWithChildren,
  useEffect,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import cx from 'classnames';
import Button from '@mui/material/Button';

import { FormFieldsDocuments } from 'types';

import { convertBase64ToBlob } from 'helpers/blobConverter';

import { API } from 'api/API';
import { useAppSelector } from 'store';
import { selectAuthData } from 'store/auth/selectors';

import css from './fileUploader.module.scss';

interface FileUploaderProps {
  label?: string;
  name: string;
  error?: string;
  disabled?: boolean;
  isMultiply?: boolean;
  inputName: string;
  idFileName?: string;
  idx?: number;
  onChange: (
    name: keyof FormFieldsDocuments | any,
    files: string | string[],
    fieldId?: string,
    idx?: number
  ) => void;
}

export const FileUploader: React.FC<PropsWithChildren<FileUploaderProps>> =
  forwardRef(
    (
      {
        label,
        name,
        children,
        disabled = false,
        isMultiply = false,
        inputName,
        idFileName,
        idx,
        onChange,
      },
      ref
    ) => {
      const [fileList, setFileList] = useState<string[]>([]);
      const inputFile = useRef<HTMLInputElement | null>(null);
      const { requestId } = useAppSelector(selectAuthData);

      const isButtonDisable =
        !isMultiply && Boolean(Object.keys(fileList).length);

      const getFiles = useCallback(async () => {
        if (requestId) {
          const response = await API.getFiles({ name: inputName, requestId });
          if (response?.data) {
            setFileList(response.data);
            onChange(
              name as keyof FormFieldsDocuments,
              response.data,
              idFileName,
              idx
            );
          }
        }
      }, [requestId, inputName, name, onChange, idFileName, idx]);

      const onUploadFile = async (data: FormData) => {
        if (requestId) {
          try {
            const response = await API.uploadFile({
              data,
              requestId,
            });

            if (response.message === 'File uploaded') {
              getFiles();
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          const imageFile = e.target.files;
          Object.keys(imageFile).forEach((i: any) => {
            const file = imageFile[i];
            const fileName = idFileName
              ? idFileName
              : fileList.includes(file.name)
                ? `(1)${file.name}`
                : file.name;
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
              const srcData = fileReader.result;
              if (srcData) {
                const formData = new FormData();
                const blob = convertBase64ToBlob(srcData.toString());
                formData.append('inputName', inputName);
                formData.append('file', blob, fileName);
                onUploadFile(formData);
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

      const onRemove = async (name: string) => {
        if (requestId) {
          try {
            const response = await API.removeFile({ inputName, fileName: name, requestId });

            if (response?.message === 'File deleted') {
              getFiles();
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

      const getFileNameById = useMemo(() => {
        if (Boolean(fileList.length) && idFileName) {
          return fileList.find((name: string) => name.includes(idFileName));
        }
        return undefined;
      }, [fileList, idFileName]);

      useEffect(() => {
        getFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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
          <ol className={css.files} data-testid="list">
            {idFileName && getFileNameById && (
              <li data-testid="listitem">
                {getFileNameById}
                <span
                  className={css.remove}
                  onClick={() => onRemove(getFileNameById)}
                >
                  +
                </span>
              </li>
            )}
            {Boolean(fileList.length) &&
              !idFileName &&
              fileList.map((file) => (
                <li key={file} data-testid="listitem">
                  {file}
                  <span className={css.remove} onClick={() => onRemove(file)}>
                    +
                  </span>
                </li>
              ))}
          </ol>
        </div>
      );
    }
  );
