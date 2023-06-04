import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { FormFields, getEnumOptions } from 'types';
import {
  Capital,
  Damage,
  EstateTerritory,
  Question,
  QuestionHelps,
  QuestionSupply,
} from 'types/capital';

import { ChangeEventType, FileUploader } from 'components/FileUploader';
import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import css from './thirdStep.module.scss';

interface Props {
  onSubmitStep: (data: Partial<FormFields>) => void;
  onBack: () => void;
  values: FormFields;
}

type TextFieldTypes =
  | 'typeEstate.key.value'
  | 'estateDamage.value'
  | 'useHelps.value'
  | 'readyToSupply.value';

const schema = yup.object().shape({
  hasEstate: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    document: yup.array().when('key', ([key]) => {
      return key === Question.Yes
        ? yup.array().min(1, "Поле є обов'язковим")
        : yup.array();
    }),
  }),
  estateCity: yup.string().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.string().required("Поле є обов'язковим")
      : yup.string();
  }),
  estateRegion: yup.string().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.string().required("Поле є обов'язковим")
      : yup.string();
  }),
  estateStreet: yup.string().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.string().required("Поле є обов'язковим")
      : yup.string();
  }),
  estateTerritory: yup.string().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.string().required("Поле є обов'язковим")
      : yup.string();
  }),
  typeEstate: yup.object().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.object().shape({
          key: yup.string().required("Поле є обов'язковим"),
          value: yup.string().when('key', ([key]) => {
            return key === Capital.Other
              ? yup.string().required("Поле є обов'язковим")
              : yup.string();
          }),
        })
      : yup.object();
  }),
  estateDamage: yup.object().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.object().shape({
          key: yup.string().required("Поле є обов'язковим"),
          value: yup.string().when('key', ([key]) => {
            return key === Damage.Sold || key === Damage.Restored
              ? yup.string().required("Поле є обов'язковим")
              : yup.string();
          }),
          document: yup.array().when('key', ([key]) => {
            return key !== Damage.NoDamage
              ? yup.array().min(1, "Поле є обов'язковим")
              : yup.array();
          }),
        })
      : yup.object();
  }),
  useHelps: yup.object().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.object().shape({
          key: yup.string().required("Поле є обов'язковим"),
          value: yup.string().when('key', ([key]) => {
            return key === QuestionHelps.Yes
              ? yup.string().required("Поле є обов'язковим")
              : yup.string();
          }),
        })
      : yup.object();
  }),
  readyToSupply: yup.object().when('hasEstate', ([hasEstate]) => {
    return hasEstate.key === Question.Yes
      ? yup.object().shape({
          key: yup.string().required("Поле є обов'язковим"),
          value: yup.string().when('key', ([key]) => {
            return key === QuestionSupply.No
              ? yup.string().required("Поле є обов'язковим")
              : yup.string();
          }),
        })
      : yup.object();
  }),
});

export const ThirdStep: React.FC<Props> = ({
  onSubmitStep,
  onBack,
  values,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<Partial<FormFields>>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const watchHasEstate = watch('hasEstate');
  const watchEstateDamage = watch('estateDamage');

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

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.name as TextFieldTypes, event.target.value);
  };

  console.log(errors);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="hasEstate.key"
            control={control}
            defaultValue={values?.hasEstate.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Наявність нерухомого майна у власності заявника або одного з членів домогосподарства"
                options={getEnumOptions(Question)}
                error={errors?.hasEstate}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="hasEstate.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchHasEstate?.key === Question.No || !watchHasEstate?.key
                }
              >
                <p className={css.text}>
                  Витяг з державного реєстру речових прав/свідоцтво про право
                  власності на нерухоме майно або інший документ, що підтверджує
                  право власності на нерухоме майно (договір купівлі-продажу,
                  договір дарування тощо)
                </p>
              </FileUploader>
            )}
          />
          {errors?.hasEstate?.document && (
            <ErrorMessage
              message={String(errors?.hasEstate.document.message)}
            />
          )}
        </div>
        {watchHasEstate?.key === Question.Yes && (
          <>
            <hr />
            <div className={css.row}>
              <Controller
                name="typeEstate.key"
                control={control}
                defaultValue={values?.typeEstate.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Тип нерухомого майна"
                    options={getEnumOptions(Capital)}
                    withOther={[Capital.Other]}
                    inputName="typeEstate.value"
                    fieldValue={values?.typeEstate?.value}
                    onChangeTextField={handleChangeTextField}
                    error={errors?.typeEstate}
                  />
                )}
              />
            </div>
            <hr />
            <div className={css.title}>Місцезнаходження нерухомого майна</div>
            <div className={css.row}>
              <Controller
                name="estateRegion"
                control={control}
                defaultValue={values?.estateRegion}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Область"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.estateRegion && (
                <ErrorMessage message={String(errors?.estateRegion.message)} />
              )}
            </div>
            <div className={css.row}>
              <Controller
                name="estateCity"
                control={control}
                defaultValue={values?.estateCity}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Громада/населений пункт"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.estateCity && (
                <ErrorMessage message={String(errors?.estateCity.message)} />
              )}
            </div>
            <div className={css.row}>
              <Controller
                name="estateStreet"
                control={control}
                defaultValue={values?.estateStreet}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Вулиця"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.estateStreet && (
                <ErrorMessage message={String(errors?.estateStreet.message)} />
              )}
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="estateTerritory"
                control={control}
                defaultValue={values?.estateTerritory}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Нерухомість розташована на території"
                    options={getEnumOptions(EstateTerritory)}
                    error={errors?.estateTerritory}
                  />
                )}
              />
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="estateDamage.key"
                control={control}
                defaultValue={values?.estateDamage.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Нерухомість розташована на території"
                    options={getEnumOptions(Damage)}
                    withOther={[Damage.Sold, Damage.Restored]}
                    error={errors?.estateDamage}
                    inputName="estateDamage.value"
                    fieldValue={values?.estateDamage?.value}
                    onChangeTextField={handleChangeTextField}
                  />
                )}
              />
            </div>
            <div className={css.row}>
              <Controller
                name="estateDamage.document"
                control={control}
                render={({ field }) => (
                  <FileUploader
                    {...field}
                    onChange={onChangeFile}
                    isMultiply
                    disabled={
                      watchEstateDamage?.key === Damage.NoDamage ||
                      !watchEstateDamage?.key
                    }
                  >
                    <ul>
                      <li>
                        Акт обстеження пошкодженого або зруйнованого майна під
                        час бойових дій, фото до і після руйнувань, документи,
                        що підтверджують право власності на нерухоме майно;
                      </li>
                      <li>
                        У разі знаходження майна на окупованій території
                        подається заява особи про пошкодження/знищення
                        нерухомого майна з особистим зобов'язанням особи надати
                        підтверджуючі документи пошкодження/знищення нерухомого
                        майна після деокупації території
                      </li>
                    </ul>
                  </FileUploader>
                )}
              />
              {errors?.estateDamage?.document && (
                <ErrorMessage
                  message={String(errors?.estateDamage.document.message)}
                />
              )}
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="useHelps.key"
                control={control}
                defaultValue={values?.useHelps.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Чи використовували ви до цього часу будь-яку допомогу для вирішення житлових потреб біженців або внутрішньо переміщених осіб на території України?"
                    options={getEnumOptions(QuestionHelps)}
                    withOther={[QuestionHelps.Yes]}
                    error={errors?.useHelps}
                    inputName="useHelps.value"
                    fieldValue={values?.useHelps?.value}
                    onChangeTextField={handleChangeTextField}
                  />
                )}
              />
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="readyToSupply.key"
                control={control}
                defaultValue={values?.readyToSupply.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Чи готові ви за власні кошти оплачувати послуги з постачання електроенергії та утримання прибудинкової території?"
                    options={getEnumOptions(QuestionSupply)}
                    withOther={[QuestionSupply.No]}
                    error={errors?.readyToSupply}
                    inputName="readyToSupply.value"
                    fieldValue={values?.readyToSupply?.value}
                    onChangeTextField={handleChangeTextField}
                  />
                )}
              />
            </div>
          </>
        )}
        <div className={cx(css.row, css.actions)}>
          <Button
            variant="outlined"
            className={css.btn}
            onClick={onBack}
            size="large"
            type="button"
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
