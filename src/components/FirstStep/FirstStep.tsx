import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  FormFieldValues,
  FormFieldsDocuments,
  getEnumOptions,
  initialValues,
} from 'types';
import { SocialStatuses } from 'types/socialStatus';

import { ErrorMessage } from 'components/ErrorMessage';
import { FileUploader } from 'components/FileUploader';
import { RadioInput } from 'components/RadioGroup';

import { schema } from './validation';
import css from './firstStep.module.scss';

interface Props {
  onSubmitStep: (data: FormFieldValues) => void;
  values: FormFieldValues;
}

export const FirstStep: React.FC<Props> = ({ onSubmitStep, values }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const watchSocialStatus = watch('data.socialStatus');

  const handleChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string[]
  ) => {
    setValue(`documents.${name}`, files);
  };

  const onChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string | string[]
  ) => {
    const key = name.replace('documents.', '');
    //@ts-ignore
    handleChangeFile(key, files);
  };

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue('data.socialStatus.value', event.target.value);
  };

  useEffect(() => {
    if (
      watchSocialStatus.key !== SocialStatuses.Other &&
      Boolean(watchSocialStatus.value)
    ) {
      setValue(
        'data.socialStatus.value',
        initialValues.data.socialStatus.value
      );
    }
  }, [watchSocialStatus, watchSocialStatus.key, setValue]);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="documents.pib"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={
                  "Інформація про основного заявника Прізвище, ім'я, по батькові, Дата народження, Повних років, Паспорт/ID картка*:"
                }
                onChange={onChangeFile}
                inputName="pib"
              >
                <ol>
                  <li>скан копію паспорту/id картку/фото паспорту</li>
                </ol>
              </FileUploader>
            )}
          />
          {errors?.documents?.pib && (
            <ErrorMessage message={String(errors?.documents?.pib.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="documents.rnokpp"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={'РНОКПП'}
                onChange={onChangeFile}
                inputName="rnokpp"
              >
                <p className={css.text}>скан/фото ІНН коду</p>
              </FileUploader>
            )}
          />
          {errors?.documents?.rnokpp && (
            <ErrorMessage message={String(errors?.documents?.rnokpp.message)} />
          )}
        </div>
        <hr />
        <div className={css.title}>Актуальна адреса проживання</div>
        <div className={css.row}>
          <Controller
            name="data.addressRegion"
            control={control}
            defaultValue={values?.data.addressRegion}
            render={({ field }) => (
              <TextField
                {...field}
                label="Область"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.addressRegion && (
            <ErrorMessage
              message={String(errors?.data?.addressRegion.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.addressSettlement"
            control={control}
            defaultValue={values?.data.addressSettlement}
            render={({ field }) => (
              <TextField
                {...field}
                label="Громада/населений пункт"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.addressSettlement && (
            <ErrorMessage
              message={String(errors?.data?.addressSettlement.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.addressStreet"
            control={control}
            defaultValue={values?.data.addressStreet}
            render={({ field }) => (
              <TextField
                {...field}
                label="Вулиця"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.addressStreet && (
            <ErrorMessage
              message={String(errors?.data?.addressStreet.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.addressBuilding"
            control={control}
            defaultValue={values?.data.addressBuilding}
            render={({ field }) => (
              <TextField
                {...field}
                label="Будинок"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.addressBuilding && (
            <ErrorMessage
              message={String(errors?.data?.addressBuilding.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.addressFlat"
            control={control}
            defaultValue={values?.data.addressFlat}
            render={({ field }) => (
              <TextField
                {...field}
                label="Квартира"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.addressFlat && (
            <ErrorMessage message={String(errors?.data?.addressFlat.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.socialStatus.key"
            control={control}
            defaultValue={values?.data?.socialStatus?.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                fieldValue={values?.data?.socialStatus.value}
                withOther={[SocialStatuses.Other]}
                title="Соціальний стан"
                options={getEnumOptions(SocialStatuses)}
                inputName="socialStatus.value"
                onChangeTextField={handleChangeTextField}
                error={errors?.data?.socialStatus}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Button
            variant="contained"
            className={css.btn}
            size="large"
            type="submit"
          >
            Продовжити
          </Button>
        </div>
      </form>
    </div>
  );
};
