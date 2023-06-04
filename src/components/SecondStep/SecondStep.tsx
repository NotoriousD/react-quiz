import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { Family, FormFields } from 'types';

import { ErrorMessage } from 'components/ErrorMessage';
import { ChangeEventType, FileUploader } from 'components/FileUploader';

import { FormGenerator } from './modules/FormGenerator';

import css from './secondStep.module.scss';

interface Props {
  onSubmitStep: (data: Partial<FormFields>) => void;
  onBack: () => void;
  values: FormFields;
}

const schema = yup.object().shape({
  family: yup.object().shape({
    data: yup
      .array()
      .min(
        1,
        'Необхідно додати інформацію про членів домогосподарства, що будуть проживати разом із заявником'
      ),
  }),
});

export const SecondStep: React.FC<Props> = ({
  onSubmitStep,
  onBack,
  values,
}) => {
  const [members, setMembers] = useState<Family[]>(values?.family.data || []);
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

  const handleChangeFile = (files: Blob[]) => {
    setValue('family.documents', files);
  };

  const onChangeFile = (
    name: keyof FormFields,
    files: Blob | Blob[],
    event: ChangeEventType
  ) => {
    let data = getValues()?.family?.documents || [];
    if (event === ChangeEventType.Add) {
      //@ts-ignore
      data.push(files);
    }
    if (event === ChangeEventType.Remove) {
      data = [...(Array.isArray(files) ? [...files] : [files])];
    }
    //@ts-ignore
    handleChangeFile(data);
  };

  const handleAddMember = (data: Family) => {
    const members = getValues()?.family?.data;
    if (members) {
      setValue('family.data', [...members, data]);
      setMembers([...members, data]);
    }
  };

  const removeMember = (idx: number) => {
    const members = getValues()?.family?.data;

    if (members) {
      const newMemebers = members.filter((_, index) => index !== idx);
      setValue('family.data', newMemebers);
      setMembers(newMemebers);
    }
  };

  useEffect(() => {
    if (errors?.family) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [errors]);

  return (
    <div className={css.root}>
      <div className={css.errors}>
        {errors?.family?.data && (
          <ErrorMessage message={String(errors?.family?.data.message)} />
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
            name="family.documents"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                label={
                  'Інформація про членів домогосподарства, що будуть проживати разом із заявником (Додати за потреби)'
                }
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
          {errors?.avgIncome && (
            <ErrorMessage message={String(errors?.avgIncome.message)} />
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
