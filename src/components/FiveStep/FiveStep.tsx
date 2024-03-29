import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';
import { useNavigate } from 'react-router';

import { FormFieldValues } from 'types';
import { useAppSelector } from 'store';
import { selectAuthData } from 'store/auth/selectors';
import { computingScores } from 'helpers/scores';

import { ErrorMessage } from 'components/ErrorMessage';
import { Loader } from 'components/Loader';

import css from './fiveStep.module.scss';
import { Modal } from 'components/Modal';

interface Props {
  onSubmitStep: (data: FormFieldValues, scores: number) => void;
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
  const timer = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { isSumbitting, isSubmitted } = useAppSelector(selectAuthData);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const handleGoHomePage = () => {
    navigate('/')
  };

  useEffect(() => {
    if (isSubmitted && !timer.current) {
      timer.current = setTimeout(() => {
        navigate('/')
      }, 3000);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isSubmitted, timer]);

  const handleSubmitForm = (data: FormFieldValues) => {
    const { newData, totalScore } = computingScores(data);
    onSubmitStep(newData, totalScore);
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={css.form}>
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
        <div className={css.row}>
          <p>
            Надсилаючи ви даєте згоду на{' '}
            <NavLink to={'/privacy-policy'}>обробку персональних даних</NavLink>
          </p>
        </div>
        <div className={cx(css.row, css.actions)}>
          <Button
            variant="outlined"
            className={css.btn}
            onClick={onBack}
            size="large"
            type="button"
            disabled={isSumbitting}
          >
            Повернутись
          </Button>
          <Button
            variant="contained"
            className={css.btn}
            size="large"
            type="submit"
            disabled={isSumbitting || isSubmitted}
          >
            Продовжити
          </Button>
        </div>
      </form>
      {isSumbitting && (
        <div className={css.loader}>
          Відправка...
          <Loader />
        </div>
      )}
      {isSubmitted && (
        <Modal>
          <div className={css.modalTitle}>
            Дякуємо за заповнення, з вами звʼяжуться як най швидше
          </div>
          <Button
            variant="contained"
            className={css.btn}
            type="button"
            onClick={handleGoHomePage}
          >
            На головну
          </Button>
        </Modal>
      )}
    </div>
  );
};
