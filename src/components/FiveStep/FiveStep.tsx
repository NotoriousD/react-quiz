import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { FormFieldValues } from 'types';

import { ErrorMessage } from 'components/ErrorMessage';

import css from './fiveStep.module.scss';

interface Props {
  onSubmitStep: (data: FormFieldValues) => void;
  onBack: () => void;
  values: FormFieldValues;
}

const schema = yup.object().shape({
  data: yup.object().shape({
    additionalMessage: yup
      .string()
      .test('len', 'Максимум 250 слів', (val) =>
        val ? val?.split(' ').length <= 250 : true
      ),
  }),
});

export const FiveStep: React.FC<Props> = ({ onSubmitStep, onBack, values }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.title}>
          Місце для додаткової інформації, яка на думку заявника, може надати
          йому перевагу у відборі на надання житла в Новобасанській
          територіальній громаді (до 250 слів)
        </div>
        <div className={css.row}>
          <Controller
            name="data.additionalMessage"
            control={control}
            defaultValue={values?.data.additionalMessage}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                className={css.textarea}
                minRows={3}
                placeholder="Додаткова інформація"
              />
            )}
          />
          {errors?.data?.additionalMessage && (
            <ErrorMessage
              message={String(errors?.data?.additionalMessage.message)}
            />
          )}
        </div>
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
