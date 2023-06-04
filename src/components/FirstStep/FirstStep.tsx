import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormFields } from 'types';

import { ErrorMessage } from 'components/ErrorMessage';
import { ChangeEventType, FileUploader } from 'components/FileUploader';

import css from './firstStep.module.scss';

interface Props {
  onSubmitStep: (data: Partial<FormFields>) => void;
  values: FormFields;
}

const schema = yup.object().shape({
  pib: yup.array().min(1, "Поле є обов'язковим"),
  rnokpp: yup.array().min(1, "Поле є обов'язковим"),
  addressRegion: yup.string().required("Поле є обов'язковим"),
  addressSettlement: yup.string().required("Поле є обов'язковим"),
  addressStreet: yup.string().required("Поле є обов'язковим"),
  addressBuilding: yup.string().required("Поле є обов'язковим"),
  addressFlat: yup.string().required("Поле є обов'язковим"),
  avgIncome: yup.array().min(1, "Поле є обов'язковим"),
});

export const FirstStep: React.FC<Props> = ({ onSubmitStep, values }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Partial<FormFields>>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const handleChangeFile = (name: keyof FormFields, files: Blob[]) => {
    setValue(name, files);
  };

  const onChangeFile = (
    name: keyof FormFields,
    files: Blob | Blob[],
    event: ChangeEventType
  ) => {
    let data = getValues()[name] || [];
    if (event === ChangeEventType.Add) {
      //@ts-ignore
      data.push(files);
    }
    if (event === ChangeEventType.Remove) {
      data = [...(Array.isArray(files) ? [...files] : [files])];
    }
    //@ts-ignore
    handleChangeFile(name, data);
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="pib"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={
                  "Інформація про основного заявника Прізвище, ім'я, по батькові, Дата народження, Повних років, Паспорт/ID картка*:"
                }
                onChange={onChangeFile}
              >
                <ol>
                  <li>скан копію паспорту/id картку/фото паспорту</li>
                </ol>
              </FileUploader>
            )}
          />
          {errors?.pib && (
            <ErrorMessage message={String(errors?.pib.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="rnokpp"
            control={control}
            render={({ field }) => (
              <FileUploader {...field} label={'РНОКПП'} onChange={onChangeFile}>
                <p className={css.text}>скан/фото ІНН коду</p>
              </FileUploader>
            )}
          />
          {errors?.rnokpp && (
            <ErrorMessage message={String(errors?.rnokpp.message)} />
          )}
        </div>
        <hr />
        <div className={css.title}>Актуальна адреса проживання</div>
        <div className={css.row}>
          <Controller
            name="addressRegion"
            control={control}
            defaultValue={values?.addressRegion}
            render={({ field }) => (
              <TextField
                {...field}
                label="Область"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.addressRegion && (
            <ErrorMessage message={String(errors?.addressRegion.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="addressSettlement"
            control={control}
            defaultValue={values?.addressSettlement}
            render={({ field }) => (
              <TextField
                {...field}
                label="Громада/населений пункт"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.addressSettlement && (
            <ErrorMessage message={String(errors?.addressSettlement.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="addressStreet"
            control={control}
            defaultValue={values?.addressStreet}
            render={({ field }) => (
              <TextField
                {...field}
                label="Вулиця"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.addressStreet && (
            <ErrorMessage message={String(errors?.addressStreet.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="addressBuilding"
            control={control}
            defaultValue={values?.addressBuilding}
            render={({ field }) => (
              <TextField
                {...field}
                label="Будинок"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.addressBuilding && (
            <ErrorMessage message={String(errors?.addressBuilding.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="addressFlat"
            control={control}
            defaultValue={values?.addressFlat}
            render={({ field }) => (
              <TextField
                {...field}
                label="Квартира"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.addressFlat && (
            <ErrorMessage message={String(errors?.addressFlat.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="avgIncome"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={'Сума середнього місячного доходу заявника (в гривнях)'}
                onChange={onChangeFile}
              >
                <ul>
                  Довідка про доходи:
                  <li>
                    підтвердження розміру чистого доходу за місяць, що передує
                    місяцю подання заяви на публічне запрошення;
                  </li>
                  <li>
                    довідка з Пенсійного фонду України або іншої компетентної
                    державної установи України про надходження пенсійних
                    платежів Заявнику або членам його родини у випадку, якщо
                    вони є пенсіонерами або особами, що отримують пенсійне
                    забезпечення від держави;
                  </li>
                  <li>
                    документ про те, що Заявник має статус безробітного та
                    перебуває на обліку в національних центрах зайнятості.
                  </li>
                </ul>
              </FileUploader>
            )}
          />
          {errors?.avgIncome && (
            <ErrorMessage message={String(errors?.avgIncome.message)} />
          )}
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
