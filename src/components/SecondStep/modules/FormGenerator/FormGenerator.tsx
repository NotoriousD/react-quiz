import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Family, getEnumOptions } from 'types';
import { Relationship } from 'types/relationship';
import { SocialStatuses } from 'types/socialStatus';

import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import css from './formGenerator.module.scss';
import { FileUploader } from 'components/FileUploader';

interface Props {
  onSubmitStep: (data: Family) => void;
}

const schema = yup.object().shape({
  pib: yup.string().required("Поле є обов'язковим"),
  pibDoc: yup.array().min(1, "Необхідно додати файл"),
  relationship: yup.string().required("Поле є обов'язковим"),
  age: yup
    .number()
    .required("Поле є обов'язковим")
    .positive()
    .integer()
    .lessThan(100, 'Введіть коректне значення')
    .moreThan(0, 'Введіть коректне значення'),
  socialStatus: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
  }),
  avgIncomeBefore: yup
    .number()
    .required("Поле є обов'язковим")
    .moreThan(-1, 'Поле не може бути меньше 0'),
  avgIncomeBeforeDoc: yup.array().min(1, "Необхідно додати файл"),
  avgIncomeAfter: yup
    .number()
    .required("Поле є обов'язковим")
    .moreThan(-1, 'Поле не може бути меньше 0'),
  avgIncomeAfterDoc: yup.array().min(1, "Необхідно додати файл"),
});

const initialValues: Family = {
  pib: '',
  pibDoc: [],
  relationship: Relationship.Father,
  age: 0,
  socialStatus: {
    key: '',
    value: '',
  },
  avgIncomeBefore: 0,
  avgIncomeBeforeDoc: [],
  avgIncomeAfter: 0,
  avgIncomeAfterDoc: [],
};

export const FormGenerator: React.FC<Props> = ({ onSubmitStep }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<Family>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const values = getValues();

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.name as keyof Family, event.target.value);
  };

  const handleSubmitForm = (data: Family) => {
    onSubmitStep(data);
    reset();
  };

  const onChangeFile = (
    name: any,
    files: string | string[]
  ) => {
    //@ts-ignore
    setValue(name, files);
  };

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue('socialStatus.value', event.target.value);
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="pib"
            control={control}
            defaultValue={values?.pib}
            render={({ field }) => (
              <TextField
                {...field}
                label="ПІБ"
                size="small"
                className={css.textField}
              />
            )}
          />
          {errors?.pib && (
            <ErrorMessage message={String(errors?.pib.message)} />
          )}
        </div>
        <div className={css.row}>
        <Controller
          name="pibDoc"
          control={control}
          render={({ field }) => (
            <FileUploader
              {...field}
              onChange={onChangeFile}
              inputName="avgIncomeAfter"
            >
              <ul>
                Довідка про доходи:
                <li>
                  підтвердження розміру чистого доходу за місяць, що передує
                  місяцю подання заяви на публічне запрошення;
                </li>
                <li>
                  довідка з Пенсійного фонду України або іншої компетентної
                  державної установи України про надходження пенсійних платежів
                  Заявнику або членам його родини у випадку, якщо вони є
                  пенсіонерами або особами, що отримують пенсійне забезпечення
                  від держави;
                </li>
                <li>
                  документ про те, що Заявник має статус безробітного та
                  перебуває на обліку в національних центрах зайнятості.
                </li>
              </ul>
            </FileUploader>
          )}
        />
        {errors?.avgIncomeAfterDoc && (
          <ErrorMessage
            message={String(errors?.avgIncomeAfterDoc.message)}
          />
        )}
      </div>
        <div className={css.row}>
          <Controller
            name="relationship"
            control={control}
            defaultValue={values?.relationship}
            render={({ field }) => (
              <FormControl className={css.selectWrapper}>
                <InputLabel className={css.selectLabel}>
                  Тип відносин
                </InputLabel>
                <Select
                  {...field}
                  defaultValue={field.value}
                  className={css.select}
                  size="small"
                  label="Тип відносин"
                  onChange={handleChange}
                >
                  {getEnumOptions(Relationship).map(({ label, value }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors?.relationship && (
            <ErrorMessage message={String(errors?.relationship.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="age"
            control={control}
            defaultValue={values?.age}
            render={({ field }) => (
              <TextField
                {...field}
                label="Вік"
                size="small"
                type="number"
                className={css.textField}
              />
            )}
          />
          {errors?.age && (
            <ErrorMessage message={String(errors?.age.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="avgIncomeBefore"
            control={control}
            defaultValue={values?.avgIncomeBefore}
            render={({ field }) => (
              <TextField
                {...field}
                label="Середній місячний дохід (в гривнях) до 22 лютого 2022"
                size="small"
                type="number"
                className={css.textField}
              />
            )}
          />
          {errors?.avgIncomeBefore && (
            <ErrorMessage message={String(errors?.avgIncomeBefore.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="avgIncomeAfter"
            control={control}
            defaultValue={values?.avgIncomeAfter}
            render={({ field }) => (
              <TextField
                {...field}
                label="Середній місячний дохід (в гривнях) після 22 лютого 2022"
                size="small"
                type="number"
                className={css.textField}
              />
            )}
          />
          {errors?.avgIncomeAfter && (
            <ErrorMessage message={String(errors?.avgIncomeAfter.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="socialStatus.key"
            control={control}
            defaultValue={values?.socialStatus?.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                fieldValue={values?.socialStatus.value}
                withOther={[SocialStatuses.Other]}
                title="Соціальний стан"
                options={getEnumOptions(SocialStatuses)}
                inputName="socialStatus.value"
                onChangeTextField={handleChangeTextField}
                error={errors?.socialStatus}
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
            Додати
          </Button>
        </div>
      </form>
    </div>
  );
};
