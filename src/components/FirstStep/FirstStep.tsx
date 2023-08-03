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
import { DateSelector } from 'components/DateSelector';

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
        <div className={css.title}><strong>Інформація про основного заявника Прізвище, ім'я, по батькові, Дата народження, Повних років, Паспорт/ID картка*:</strong></div>
        <div className={css.row}>
          <Controller
            name="data.pib"
            control={control}
            defaultValue={values?.data.pib}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ваше прізвище, ім'я, по батькові (ПІБ)"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.pib && (
            <ErrorMessage
              message={String(errors?.data?.pib.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.birthday"
            control={control}
            defaultValue={values?.data.birthday}
            render={({ field }) => (
              <DateSelector {...field} label="Дата народження" />
            )}
          />
          {errors?.data?.birthday && (
            <ErrorMessage
              message={String(errors?.data?.birthday.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.age"
            control={control}
            defaultValue={values?.data.age}
            render={({ field }) => (
              <TextField
                {...field}
                label="Повних років"
                className={css.textField}
                type='number'
              />
            )}
          />
          {errors?.data?.age && (
            <ErrorMessage
              message={String(errors?.data?.age.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.idNumber"
            control={control}
            defaultValue={values?.data.idNumber}
            render={({ field }) => (
              <TextField
                {...field}
                label="Серія та номер паспорту/ID"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.idNumber && (
            <ErrorMessage
              message={String(errors?.data?.idNumber.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.issue"
            control={control}
            defaultValue={values?.data.issue}
            render={({ field }) => (
              <TextField
                {...field}
                label="Виданий"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.issue && (
            <ErrorMessage
              message={String(errors?.data?.issue.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.issueDate"
            control={control}
            defaultValue={values?.data.issueDate}
            render={({ field }) => (
              <DateSelector {...field} label="Дата видачі" />
            )}
          />
          {errors?.data?.issueDate && (
            <ErrorMessage
              message={String(errors?.data?.issueDate.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.issueCity"
            control={control}
            defaultValue={values?.data.issueCity}
            render={({ field }) => (
              <TextField
                {...field}
                label="В місті"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.issueCity && (
            <ErrorMessage
              message={String(errors?.data?.issueCity.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.phone"
            control={control}
            defaultValue={values?.data.phone}
            render={({ field }) => (
              <TextField
                {...field}
                label="Контактний номер телефону"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.phone && (
            <ErrorMessage
              message={String(errors?.data?.phone.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="documents.pib"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
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
            name="data.rnokpp"
            control={control}
            defaultValue={values?.data.rnokpp}
            render={({ field }) => (
              <TextField
                {...field}
                label="РНОКПП (ІПН)"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.rnokpp && (
            <ErrorMessage
              message={String(errors?.data?.rnokpp.message)}
            />
          )}
        </div>
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
        <div className={css.title}><strong>Дата видачі та номер довідки про взяття на облік ВПО:</strong></div>
        <div className={css.row}>
          <Controller
            name="data.vpoDate"
            control={control}
            defaultValue={values?.data.vpoDate}
            render={({ field }) => (
              <DateSelector {...field} label="Дата видачі" />
            )}
          />
          {errors?.data?.vpoDate && (
            <ErrorMessage
              message={String(errors?.data?.vpoDate.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="data.vpoNumber"
            control={control}
            defaultValue={values?.data.vpoNumber}
            render={({ field }) => (
              <TextField
                {...field}
                label="Номер довідки"
                className={css.textField}
              />
            )}
          />
          {errors?.data?.vpoNumber && (
            <ErrorMessage
              message={String(errors?.data?.vpoNumber.message)}
            />
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
                label="Поштова адреса"
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
