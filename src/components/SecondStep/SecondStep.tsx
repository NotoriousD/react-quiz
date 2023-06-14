import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { Family, FormFieldValues, FormFieldsDocuments } from 'types';

import { ErrorMessage } from 'components/ErrorMessage';
import { FileUploader } from 'components/FileUploader';

import { FormGenerator } from './modules/FormGenerator';

import css from './secondStep.module.scss';

interface Props {
  onSubmitStep: (data: Partial<FormFieldValues>) => void;
  onBack: () => void;
  values: FormFieldValues;
}

const schema = yup.object().shape({
  data: yup.object().shape({
    family: yup
      .array()
      .min(
        1,
        'Необхідно додати інформацію про членів домогосподарства, що будуть проживати разом із заявником'
      ),
  }),
  documents: yup.object().shape({
    family: yup.array(),
  }),
});

export const SecondStep: React.FC<Props> = ({
  onSubmitStep,
  onBack,
  values,
}) => {
  const [members, setMembers] = useState<Family[]>(values?.data.family || []);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const handleChangeFile = (files: string[]) => {
    setValue('documents.family', files);
  };

  const onChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string | string[]
  ) => {
    //@ts-ignore
    handleChangeFile(files);
  };

  const handleAddMember = (data: Family) => {
    const members = getValues()?.data?.family;
    if (members) {
      setValue('data.family', [...members, data]);
      setMembers([...members, data]);
    }
  };

  const removeMember = (idx: number) => {
    const members = getValues()?.data?.family;

    if (members) {
      const newMemebers = members.filter((_, index) => index !== idx);
      setValue('data.family', newMemebers);
      setMembers(newMemebers);
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
      <div className={css.errors}>
        {errors?.data?.family && (
          <ErrorMessage message={String(errors?.data?.family.message)} />
        )}
      </div>
      <table className={css.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>ПІБ</th>
            <th>Тип відносин із заявником</th>
            <th>Вік</th>
            <th>Соціальний стан</th>
            <th>Сума середнього місячного доходу</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Boolean(members.length) ? (
            members.map(
              ({ pib, relationship, age, socialStatus, avgIncome }, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{pib}</td>
                  <td>{relationship}</td>
                  <td>{age}</td>
                  <td>
                    {socialStatus?.value
                      ? socialStatus.value
                      : socialStatus.key}
                  </td>
                  <td>{avgIncome}</td>
                  <td>
                    <span onClick={() => removeMember(idx)}>+</span>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={css.row}>
        <FormGenerator onSubmitStep={handleAddMember} />
      </div>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <hr />
        <div className={css.row}>
          <Controller
            name="documents.family"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={
                  'Інформація про членів домогосподарства, що будуть проживати разом із заявником (Додати за потреби)'
                }
                inputName="family"
                onChange={onChangeFile}
              >
                <ol>
                  Довідка про доходи:
                  <li>
                    ксерокопію/скан посвідчення або довідки внутрішньо
                    переміщеної особи членів сім’ї, які перебувають на обліку,
                    або підтвердження від державних органів чи установ про
                    взяття їх на облік як внутрішньо переміщених осіб;
                  </li>
                  <li>
                    ксерокопія/скан посвідчення особи для всіх членів сім’ї
                    віком від 16 років, тобто відскановане посвідчення особи,
                    якщо це біометричне посвідчення особи;
                  </li>
                  <li>
                    ксерокопія/скан свідоцтва про народження для осіб віком до
                    16 років;
                  </li>
                  <li>фотокопія паспорту громадянина України;</li>
                  <li>
                    для працюючих членів домогосподарства довідка, засвідчена
                    адміністративним органом або судом, що Заявник, тобто член
                    сімейного господарства, отримує певні випадкові доходи;
                  </li>
                  <li>
                    довідка з Пенсійного фонду України або іншої компетентної
                    державної установи України про надходження пенсійних
                    платежів Заявнику або членам його родини у випадку, якщо
                    вони є пенсіонерами або особами, що отримують пенсійне
                    забезпечення від держави;
                  </li>
                  <li>
                    документ про те, що Заявник та/або члени його сім’ї мають
                    статус безробітного та перебувають на обліку в національних
                    центрах зайнятості
                  </li>
                </ol>
              </FileUploader>
            )}
          />
          {errors?.documents?.family && (
            <ErrorMessage message={String(errors?.documents?.family.message)} />
          )}
        </div>
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
