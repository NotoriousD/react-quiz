import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';

import {
  FormFieldValues,
  FormFieldsDocuments,
  getEnumOptions,
  initialValues,
} from 'types';
import {
  Damage,
  EstateTerritory,
  Question,
  QuestionHelps,
  QuestionSupply,
} from 'types/capital';

import { FileUploader } from 'components/FileUploader';
import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import { schema } from './validation';
import css from './thirdStep.module.scss';

interface Props {
  onSubmitStep: (data: Partial<FormFieldValues>) => void;
  onBack: () => void;
  values: FormFieldValues;
}

type TextFieldTypes =
  | 'data.estateDamage.value'
  | 'data.useHelps.value'
  | 'data.readyToSupply.value';

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
    watch,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const [watchHasEstate, watchEstateDamage, watchUseHelps, watchReadyToSupply] =
    watch([
      'data.hasEstate',
      'data.estateDamage',
      'data.useHelps',
      'data.readyToSupply',
    ]);

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
    setValue(event.target.name as TextFieldTypes, event.target.value);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (
      watchUseHelps.key === QuestionHelps.No &&
      Boolean(watchUseHelps.value)
    ) {
      setValue('data.useHelps.value', initialValues.data.useHelps.value);
    }
  }, [watchUseHelps, watchUseHelps.key, setValue]);

  useEffect(() => {
    if (
      watchReadyToSupply.key === QuestionSupply.Yes &&
      Boolean(watchReadyToSupply.value)
    ) {
      setValue(
        'data.readyToSupply.value',
        initialValues.data.readyToSupply.value
      );
    }
  }, [watchReadyToSupply, watchReadyToSupply.key, setValue]);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="data.hasEstate.key"
            control={control}
            defaultValue={values?.data.hasEstate.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Наявність нерухомого майна у власності заявника або одного з членів домогосподарства"
                options={getEnumOptions(Question)}
                error={errors?.data?.hasEstate}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.hasEstate"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchHasEstate?.key === Question.No || !watchHasEstate?.key
                }
                inputName="hasEstate"
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
          {errors?.documents?.hasEstate && (
            <ErrorMessage
              message={String(errors?.documents?.hasEstate.message)}
            />
          )}
        </div>
        {watchHasEstate?.key === Question.Yes && (
          <>
            <hr />
            <div className={css.row}>
              <Controller
                name="data.estateTerritory.key"
                control={control}
                defaultValue={values?.data.estateTerritory.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Нерухомість розташована на території"
                    options={getEnumOptions(EstateTerritory)}
                    error={errors?.data?.estateTerritory}
                  />
                )}
              />
            </div>
            <hr />
            <div className={css.title}>Місцезнаходження нерухомого майна</div>
            <div className={css.row}>
              <Controller
                name="data.estateRegion"
                control={control}
                defaultValue={values.data.estateRegion}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Область"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.data?.estateRegion && (
                <ErrorMessage
                  message={String(errors?.data?.estateRegion.message)}
                />
              )}
            </div>
            <div className={css.row}>
              <Controller
                name="data.estateCity"
                control={control}
                defaultValue={values.data.estateCity}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Громада/населений пункт"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.data?.estateCity && (
                <ErrorMessage
                  message={String(errors?.data?.estateCity.message)}
                />
              )}
            </div>
            <div className={css.row}>
              <Controller
                name="data.estateStreet"
                control={control}
                defaultValue={values.data.estateStreet}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Вулиця"
                    size="small"
                    className={css.textField}
                  />
                )}
              />
              {errors?.data?.estateStreet && (
                <ErrorMessage
                  message={String(errors?.data?.estateStreet.message)}
                />
              )}
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="data.estateDamage.key"
                control={control}
                defaultValue={values?.data.estateDamage.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Поточний статус вашого нерухомого майна"
                    options={getEnumOptions(Damage)}
                    error={errors?.data?.estateDamage}
                  />
                )}
              />
            </div>
            <div className={css.row}>
              <Controller
                name="documents.estateDamage"
                control={control}
                render={({ field }) => (
                  <FileUploader
                    {...field}
                    onChange={onChangeFile}
                    isMultiply
                    inputName="estateDamage"
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
              {errors?.documents?.estateDamage && (
                <ErrorMessage
                  message={String(errors?.documents?.estateDamage.message)}
                />
              )}
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="data.useHelps.key"
                control={control}
                defaultValue={values?.data.useHelps.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Чи використовували ви до цього часу будь-яку допомогу для вирішення житлових потреб біженців або внутрішньо переміщених осіб на території України?"
                    options={getEnumOptions(QuestionHelps)}
                    withOther={[QuestionHelps.Yes]}
                    error={errors?.data?.useHelps}
                    inputName="data.useHelps.value"
                    fieldValue={watchUseHelps.value}
                    onChangeTextField={handleChangeTextField}
                  />
                )}
              />
            </div>
            <hr />
            <div className={css.row}>
              <Controller
                name="data.readyToSupply.key"
                control={control}
                defaultValue={values?.data.readyToSupply.key}
                render={({ field }) => (
                  <RadioInput
                    {...field}
                    title="Чи готові ви за власні кошти оплачувати послуги з постачання електроенергії та утримання прибудинкової території?"
                    options={getEnumOptions(QuestionSupply)}
                    withOther={[QuestionSupply.No]}
                    error={errors?.data?.readyToSupply}
                    inputName="data.readyToSupply.value"
                    fieldValue={watchReadyToSupply.value}
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
