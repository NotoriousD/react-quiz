import React, { useEffect, useCallback } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import { BsTrash } from 'react-icons/bs';

import { Family, FormFieldValues, FormFieldsDocuments, getEnumOptions } from 'types';
import { Relationship } from 'types/relationship';
import { SocialStatuses } from 'types/socialStatus';

import { ErrorMessage } from 'components/ErrorMessage';
import { FileUploader } from 'components/FileUploader';

import { schema } from './validation';
import css from './secondStep.module.scss';
import { useAppSelector } from 'store';
import { selectAuthData } from 'store/auth/selectors';
import { API } from 'api/API';

interface Props {
  onSubmitStep: (data: Partial<FormFieldValues>) => void;
  onBack: () => void;
  values: FormFieldValues;
}

const fileNames = ['pibDoc', 'avgIncomeBeforeDoc', 'avgIncomeAfterDoc'];

const generateDefaultMember = (): Family => ({
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
});

export const SecondStep: React.FC<Props> = ({
  onSubmitStep,
  onBack,
  values,
}) => {
  const { requestId } = useAppSelector(selectAuthData);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
    watch,
    getValues,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const items = watch('data.family');

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'data.family.data',
  });

  const onChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string | string[]
  ) => {
    //@ts-ignore
    setValue(name, files);
  };

  const handleAddMember = useCallback(() => {
    append(generateDefaultMember());
  }, [append]);

  const handleRemoveMember = (id: number) => {
    const family = getValues('data.family.data');
    remove(id);
    fileNames.forEach(element => {
      //@ts-ignore
      if (family[id][element].length) {
        //@ts-ignore
        onRemoveFile(`${element}-${id}`, family[id][element][0]);
      }

    });
  };

  const onRemoveFile = async (inputName: string, fileName: string) => {
    if (requestId) {
      try {
        await API.removeFile({ inputName, fileName, requestId });

      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (errors?.data?.family) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [errors]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.title}><strong>Сума вашого середнього місячного доходу (в гривнях) до 22 лютого 2022</strong></div>
        <div className={css.row}>
          <Controller
            name="data.avgIncomeBefore.value"
            control={control}
            defaultValue={values?.data.avgIncomeBefore.value}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cума"
                className={css.textField}
                type='number'
              />
            )}
          />
          {errors?.data?.avgIncomeBefore?.value && (
            <ErrorMessage
              message={String(errors?.data?.avgIncomeBefore.value.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="documents.avgIncomeBefore"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                inputName="avgIncomeBefore"
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
          {errors?.documents?.avgIncomeBefore && (
            <ErrorMessage
              message={String(errors?.documents?.avgIncomeBefore.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.title}><strong>Сума вашого середнього місячного доходу заявника (в гривнях) після 22 лютого 2022</strong></div>
        <div className={css.row}>
          <Controller
            name="data.avgIncomeAfter.value"
            control={control}
            defaultValue={values?.data.avgIncomeAfter.value}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cума"
                className={css.textField}
                type='number'
              />
            )}
          />
          {errors?.data?.avgIncomeAfter?.value && (
            <ErrorMessage
              message={String(errors?.data?.avgIncomeAfter.value.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="documents.avgIncomeAfter"
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
          {errors?.documents?.avgIncomeAfter && (
            <ErrorMessage
              message={String(errors?.documents?.avgIncomeAfter.message)}
            />
          )}
        </div>
        <hr />
        <h3 className={css.title}>
          Члени домогосподарства, що будуть проживати разом з вами
        </h3>
        {fields.length && (
          <div className={css.fieldWrapper}>
            {fields.map((field, index) => {
              const isFirst = index === 0;
              return (
                <div className={css.fieldBlock} key={field.id}>
                  {!isFirst && (
                    <div className={css.fieldHeader}>
                      <span
                        className={css.removeMember}
                        onClick={() => handleRemoveMember(index)}
                      >
                        <BsTrash />
                      </span>
                    </div>
                  )}
                  <div className={css.row}>
                    <TextField
                      {...register(`data.family.data.${index}.pib`)}
                      label="ПІБ"
                      size="small"
                      className={css.textField}
                    />
                    {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].pib && (
                      <ErrorMessage message={String(errors?.data?.family?.data[index].pib.message)} />
                    )}
                  </div>
                  <div className={css.row}>
                    <Controller
                      name={`data.family.data.${index}.pibDoc`}
                      control={control}
                      render={({ field }) => (
                        <FileUploader
                          {...field}
                          onChange={onChangeFile}
                          inputName={`pibDoc-${index}`}
                        >
                          <div className={css.text}>скан копію паспорту/id картку/фото паспорту</div>
                        </FileUploader>
                      )}
                    />
                    {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].pibDoc && (
                      <ErrorMessage message={String(errors?.data?.family?.data[index].pibDoc.message)} />
                    )}
                  </div>
                  <div className={css.fieldRow}>
                    <div className={css.col}>
                      <FormControl className={css.selectWrapper}>
                        <InputLabel className={css.selectLabel}>
                          Тип відносин
                        </InputLabel>
                        <Select
                          {...register(`data.family.data.${index}.relationship`)}
                          className={css.select}
                          size='small'
                          defaultValue={field.relationship}
                          label="Тип відносин"
                        >
                          {getEnumOptions(Relationship).map(({ label, value }) => (
                            <MenuItem value={value}>{label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].relationship && (
                        <ErrorMessage message={String(errors?.data?.family?.data[index].relationship.message)} />
                      )}
                    </div>
                    <div className={css.col}>
                      <TextField
                        {...register(`data.family.data.${index}.age`)}
                        label="Вік"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        className={css.textField}
                      />
                      {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].age && (
                        <ErrorMessage message={String(errors?.data?.family?.data[index].age.message)} />
                      )}
                    </div>
                  </div>
                  <div className={css.row}>
                    <TextField
                      {...register(`data.family.data.${index}.avgIncomeBefore`)}
                      defaultValue={field.avgIncomeBefore}
                      label="Середній місячний дохід (в гривнях) до 22 лютого 2022"
                      size="small"
                      type="number"
                      className={css.textField}
                    />
                    {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].avgIncomeBefore && (
                      <ErrorMessage message={String(errors?.data?.family?.data[index].avgIncomeBefore.message)} />
                    )}
                    <div className={css.rowFile}>
                      <Controller
                        name={`data.family.data.${index}.avgIncomeBeforeDoc`}
                        control={control}
                        render={({ field }) => (
                          <FileUploader
                            {...field}
                            onChange={onChangeFile}
                            inputName={`avgIncomeBeforeDoc-${index}`}
                          >
                            <div className={css.text}>Довідка про доходи:</div>
                          </FileUploader>
                        )}
                      />
                      {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].pibDoc && (
                        <ErrorMessage message={String(errors?.data?.family?.data[index].pibDoc.message)} />
                      )}
                    </div>
                  </div>
                  <div className={css.row}>
                    <TextField
                      {...register(`data.family.data.${index}.avgIncomeAfter`)}
                      defaultValue={field.avgIncomeAfter}
                      label="Середній місячний дохід (в гривнях) після 22 лютого 2022"
                      size="small"
                      type="number"
                      className={css.textField}
                    />
                    {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].avgIncomeAfter && (
                      <ErrorMessage message={String(errors?.data?.family?.data[index].avgIncomeAfter.message)} />
                    )}
                    <div className={css.rowFile}>
                      <Controller
                        name={`data.family.data.${index}.avgIncomeAfterDoc`}
                        control={control}
                        render={({ field }) => (
                          <FileUploader
                            {...field}
                            onChange={onChangeFile}
                            inputName={`avgIncomeAfterDoc-${index}`}
                          >
                            <div className={css.text}>Довідка про доходи:</div>
                          </FileUploader>
                        )}
                      />
                      {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index].pibDoc && (
                        <ErrorMessage message={String(errors?.data?.family?.data[index].pibDoc.message)} />
                      )}
                    </div>
                  </div>
                  <div className={css.fieldRow}>
                    <div className={css.col}>
                      <FormControl className={css.selectWrapper}>
                        <InputLabel className={css.selectLabel}>
                          Соціальний стан
                        </InputLabel>
                        <Select
                          {...register(`data.family.data.${index}.socialStatus.key`)}
                          className={css.select}
                          label="Соціальний стан"
                          defaultValue={field.socialStatus.key}
                        >
                          {getEnumOptions(SocialStatuses).map(({ label, value }) => (
                            <MenuItem value={value}>{label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index]?.socialStatus?.key && (
                        <ErrorMessage message={String(errors?.data?.family?.data[index].socialStatus.key.message)} />
                      )}
                    </div>
                    <div className={css.col}>
                      {Boolean(items.data[index].socialStatus.key) && items.data[index].socialStatus.key === SocialStatuses.Other && (
                        <>
                          <TextField
                            {...register(`data.family.data.${index}.socialStatus.value`)}
                            label="Інше"
                            size="small"
                            className={css.textField}
                          />
                          {Array.isArray(errors?.data?.family?.data) && errors?.data?.family?.data[index]?.socialStatus?.value && (
                            <ErrorMessage message={String(errors?.data?.family?.data[index].socialStatus.value.message)} />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <Button
              variant="contained"
              className={css.rowBtn}
              size="small"
              onClick={handleAddMember}
            >
              Додати ще людину
            </Button>
          </div>
        )}
        <div className={cx(css.row, css.actions)}>
          <Button
            variant="outlined"
            className={css.btn}
            size="large"
            type="button"
            onClick={onBack}
          >
            Повернутись
          </Button>
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
