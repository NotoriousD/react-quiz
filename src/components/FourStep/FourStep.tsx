import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { FormFieldValues, FormFieldsDocuments, getEnumOptions } from 'types';
import {
  DisabledMember,
  DiseasesMember,
  IllegitimateMember,
  PatronageFamily,
  PositionMember,
  QuestionAddSingleParent,
  QuestionInjured,
  QuestionPregnant,
  QuestionSingleParent,
  ToBeEmployedMember,
  ViolenceMember,
} from 'types/additional';

import { FileUploader } from 'components/FileUploader';
import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import css from './fourStep.module.scss';

interface Props {
  onSubmitStep: (data: FormFieldValues) => void;
  onBack: () => void;
  values: FormFieldValues;
}

interface Person {
  id: number;
  name: string;
  position: string;
}

type TextFieldTypes =
  | 'data.typeEstate.key.value'
  | 'data.estateDamage.value'
  | 'data.useHelps.value'
  | 'data.readyToSupply.value';

type MembersFieldTypes = 'position' | 'toBeEmployed';

const schema = yup.object({
  data: yup.object().shape({
    injured: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === QuestionInjured.Yes
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    singleParent: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === QuestionSingleParent.Yes
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    disabledMember: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === DisabledMember.Yes
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    illegitimate: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key !== IllegitimateMember.No
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    diseases: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === DiseasesMember.Yes
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    position: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.array().when('key', ([key]) => {
        return key === PositionMember.Yes
          ? yup.array().min(1, 'Необхідно заповнити хочаб одну людину')
          : yup.array();
      }),
    }),
    toBeEmployed: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.array().when('key', ([key]) => {
        return key === ToBeEmployedMember.Yes
          ? yup.array().min(1, 'Необхідно заповнити хочаб одну людину')
          : yup.array();
      }),
    }),
    pregnant: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
    }),
    violence: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
    }),
    patronage: yup.string().required("Поле є обов'язковим"),
  }),
  documents: yup.object().when('data', ([data]) => {
    return yup.object().shape({
      injured: yup.array().when(() => {
        return data.injured.key === QuestionInjured.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      singleParent: yup.array().when(() => {
        return data.singleParent.key === QuestionSingleParent.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      disabledMember: yup.array().when(() => {
        return data.disabledMember.key === DisabledMember.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      illegitimate: yup.array().when(() => {
        return data.illegitimate.key !== IllegitimateMember.No
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      diseases: yup.array().when(() => {
        return data.diseases.key === DiseasesMember.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      position: yup.array().when(() => {
        return data.position.key === PositionMember.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      violence: yup.array().when(() => {
        return data.violence.key === ViolenceMember.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      pregnant: yup.array().when(() => {
        return data.pregnant.key === QuestionPregnant.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
    });
  }),
});

export const FourStep: React.FC<Props> = ({ onSubmitStep, onBack, values }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const watchInjured = watch('data.injured');
  const watchPregnant = watch('data.pregnant');
  const watchSingleParent = watch('data.singleParent');
  const watchDisabledMember = watch('data.disabledMember');
  const watchIllegitimate = watch('data.illegitimate');
  const watchDiseases = watch('data.diseases');
  const watchViolence = watch('data.violence');
  const watchPosition = watch('data.position');
  const watchToBeEmployed = watch('data.toBeEmployed');

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

  const handleChangeMembers = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
    name: string
  ) => {
    const members =
      getValues().data[event.target.name as MembersFieldTypes]?.value || [];
    const member = Boolean(members.length)
      ? members.find((person: Person) => person.id === idx)
      : undefined;
    let newMembers;

    if (member && !Boolean(event.target.value)) {
      newMembers = members.filter((person: Person) => person.id !== idx);
      setValue(
        `data.${event.target.name as MembersFieldTypes}.value`,
        newMembers
      );
      return;
    }

    if (member) {
      newMembers = members.map((person: Person) => {
        if (person.id === idx) {
          return { ...person, position: event.target.value };
        }
        return person;
      });
    } else {
      newMembers = [
        ...members,
        { id: idx, name, position: event.target.value },
      ];
    }

    setValue(
      `data.${event.target.name as MembersFieldTypes}.value`,
      newMembers
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="data.injured.key"
            control={control}
            defaultValue={values?.data.injured.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, які внаслідок війни на території України отримали поранення, померли чи вважаються зниклими безвісти?"
                inputName="data.injured.value"
                fieldValue={values?.data.injured.value}
                withOther={[QuestionInjured.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(QuestionInjured)}
                error={errors?.data?.injured}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.injured"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchInjured?.key === QuestionInjured.No || !watchInjured?.key
                }
                inputName="injured"
              >
                <p className={css.text}>
                  Докази сімейного домогосподарства, член якого загинув або зник
                  безвісти під час та внаслідок військового конфлікту на
                  території України протягом 2014-2023 років; (рішення суду про
                  визнання особи загиблою або безвісти зниклою)
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.injured && (
            <ErrorMessage
              message={String(errors?.documents?.injured.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.pregnant.key"
            control={control}
            defaultValue={values?.data.injured.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашогодомогосподаства вагітні жінки?"
                options={getEnumOptions(QuestionPregnant)}
                error={errors?.data?.pregnant}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.pregnant"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchPregnant?.key === QuestionPregnant.No ||
                  !watchPregnant?.key
                }
                inputName="pregnant"
              >
                <p className={css.text}>
                  Довідка від лікаря/лікарське заключення
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.pregnant && (
            <ErrorMessage
              message={String(errors?.documents?.pregnant.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.singleParent.key"
            control={control}
            defaultValue={values?.data.singleParent.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства одинокі батьки, які самостійно утримують неповнолітніх дітей?"
                inputName="data.singleParent.value"
                fieldValue={watchSingleParent?.value}
                withOther={[QuestionSingleParent.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(QuestionSingleParent)}
                fieldOptions={getEnumOptions(QuestionAddSingleParent)}
                inputType="radio"
                error={errors?.data?.singleParent}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.singleParent"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchSingleParent?.key === QuestionSingleParent.No ||
                  !watchSingleParent?.key
                }
                inputName="singleParent"
              >
                <ol>
                  Для неповної сім'ї додається(на вибір):
                  <li>свідоцтво про смерть одного з подружжя; </li>
                  <li>
                    рішення компетентного суду про оголошення безвісно
                    відсутнього померлим;
                  </li>
                  <li>
                    свідоцтво про народження дітей без встановленого
                    батьківства;
                  </li>
                  <li>
                    рішення про розірвання шлюбу та заява заявника, засвідчена
                    міським адміністративним органом або судом, про те, що він
                    безпосередньо піклується про дитину та самостійно забезпечує
                    кошти на утримання, що другий з батьків не бере участі або
                    бере недостатню участь у цих витратах, і що, тим часом,
                    заявник не створив шлюбний або позаштатний союз;{' '}
                  </li>
                </ol>
              </FileUploader>
            )}
          />
          {errors?.documents?.singleParent && (
            <ErrorMessage
              message={String(errors?.documents?.singleParent.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.disabledMember.key"
            control={control}
            defaultValue={values?.data.disabledMember.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вашого домогосподарства особи з інвалідністю"
                inputName="data.disabledMember.value"
                fieldValue={values?.data.disabledMember.value}
                withOther={[DisabledMember.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(DisabledMember)}
                error={errors?.data?.disabledMember}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.disabledMember"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchDisabledMember?.key === DisabledMember.No ||
                  !watchDisabledMember?.key
                }
                inputName="disabledMember"
              >
                <p className={css.text}>
                  Докази наявності в сім'ї дитини/особи з інвалідністю або з
                  вадами розвитку; довідка МСЕК (медико-соціальна експертна
                  комісія)
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.disabledMember && (
            <ErrorMessage
              message={String(errors?.documents?.disabledMember.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.illegitimate.key"
            control={control}
            defaultValue={values?.data.illegitimate.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що повністю або частково вважаються непрацездатними?"
                inputName="data.illegitimate.value"
                fieldValue={values?.data.illegitimate.value}
                withOther={[
                  IllegitimateMember.Partly,
                  IllegitimateMember.Fully,
                ]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(IllegitimateMember)}
                error={errors?.data?.illegitimate}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.illegitimate"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchIllegitimate?.key === IllegitimateMember.No ||
                  !watchIllegitimate?.key
                }
                inputName="illegitimate"
              >
                <p className={css.text}>
                  Докази зниження або втрати працездатності чи фізичного
                  ушкодження - рішення компетентного органу ( Тимчасову
                  непрацездатність осіб засвідчують листком непрацездатності,
                  який видає лікар (сімейний, фельдшер) чи лікар, який лікує,
                  при пред'явленні паспорта або іншого документа, що засвідчує
                  особу пацієнта після особистого огляду і підтверджує це
                  записом у медичній документації.
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.illegitimate && (
            <ErrorMessage
              message={String(errors?.documents?.illegitimate.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.diseases.key"
            control={control}
            defaultValue={values?.data.diseases.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи з тяжкими захворюваннями?"
                inputName="data.diseases.value"
                fieldValue={values?.data.diseases.value}
                withOther={[DiseasesMember.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(DiseasesMember)}
                error={errors?.data?.diseases}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.diseases"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchDiseases?.key === DiseasesMember.No ||
                  !watchDiseases?.key
                }
                inputName="diseases"
              >
                <p className={css.text}>
                  Докази наявності захворювання, яке має більшу
                  соціально-медичну значимість (злоякісні захворювання,
                  бронхіальна та серцева астма, важкі обструктивні захворювання
                  легень, активний туберкульоз, інфаркт, декомпенсовані вади
                  серця, трансплантація серця, цереброваскулярний інсульт,
                  епілепсія, тяжкі психічні захворювання), прогресуючі
                  нервово-м’язові захворювання, парези та паралічі, геміфілія,
                  інсулінозалежний діабет, хронічна ниркова недостатність на
                  діалізі, системні аутоімунні захворювання, остеомієліт,
                  ВІЛ-інфекція тощо) – медичний висновок не старше одного року
                  для хворого;
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.diseases && (
            <ErrorMessage
              message={String(errors?.documents?.diseases.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.violence.key"
            control={control}
            defaultValue={values?.data.violence.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що постраждали від гендерно-зумовленого насильства?"
                options={getEnumOptions(ViolenceMember)}
                error={errors?.data?.violence}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="documents.violence"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchViolence?.key === ViolenceMember.No ||
                  !watchViolence?.key
                }
                inputName="violence"
              >
                <p className={css.text}>
                  Вирок суду або інший правовстановлюючий документ щодо члена
                  сім'ї, який постраждав від сексуального та домашнього
                  насильства;
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.violence && (
            <ErrorMessage
              message={String(errors?.documents?.violence.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.position.key"
            control={control}
            defaultValue={values?.data.position.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що можуть (мають необхідні знання і досвід) обіймати зазначені посади: Сімейний лікар, Лікар-педіатр (сімейний), Нотаріус, Програміст (спеціаліст у сфері ІТ-технологій), Вчитель англійської мови, Хореограф, Механізатор, Електрик, Тренер, Юрист, Бухгалтер, ПІДПРИЄМЕЦЬ готовий працювати чи створити робочі місця (бізнес)"
                options={getEnumOptions(PositionMember)}
                error={errors?.data?.position}
              />
            )}
          />
        </div>
        <div className={css.row}>
          {Boolean(values?.data.family.length) &&
            values.data.family.map(({ pib }, idx) => {
              const defaultValue = Boolean(
                values?.data.toBeEmployed?.value?.length
              )
                ? values?.data.toBeEmployed.value.find(
                    (item: Person) => item.id === idx
                  )?.position
                : undefined;
              return (
                <div className={css.rowLine} key={idx}>
                  <div
                    className={cx(css.memberName, {
                      [css.disabled]:
                        watchPosition?.key === PositionMember.No ||
                        !watchPosition?.key,
                    })}
                  >
                    {pib}
                  </div>
                  <TextField
                    name="position"
                    label="Посада"
                    size="small"
                    defaultValue={defaultValue}
                    className={css.textField}
                    disabled={
                      watchPosition?.key === PositionMember.No ||
                      !watchPosition?.key
                    }
                    onChange={(e) => handleChangeMembers(e, idx, pib)}
                  />
                </div>
              );
            })}
          {errors?.data?.position?.value && (
            <ErrorMessage
              message={String(errors?.data?.position?.value.message)}
            />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="documents.position"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchPosition?.key === PositionMember.No ||
                  !watchPosition?.key
                }
                inputName="position"
              >
                <ul>
                  <li>
                    Документи, які підтврерджують наявність необхідної
                    кваліфікації по необхідній професії;
                  </li>
                  <li>
                    Документ про здобуття освіти ;Документи, які підтврерджують
                    наявність необхідної кваліфікації по необхідній професії
                    та/або довідка за попереднім місцем роботи, характеристика,
                    резюме тощо."
                  </li>
                  <li>
                    Ідея бізнеса, бізнес-план та будь-яки документи, які
                    дозволяють оцінити пропозицію.
                  </li>
                </ul>
              </FileUploader>
            )}
          />
          {errors?.documents?.position && (
            <ErrorMessage
              message={String(errors?.documents?.position.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.toBeEmployed.key"
            control={control}
            defaultValue={values?.data.toBeEmployed.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вказаних осіб бажаючі бути працевлаштованими за обраними спеціальностями у селі Старий Биків Ніжинського району Чернігівської області?"
                options={getEnumOptions(ToBeEmployedMember)}
                error={errors?.data?.toBeEmployed}
              />
            )}
          />
        </div>
        <div className={css.row}>
          {Boolean(values?.data.family.length) &&
            values.data.family.map(({ pib }, idx) => {
              const defaultValue = Boolean(
                values?.data.toBeEmployed?.value?.length
              )
                ? values?.data.toBeEmployed.value.find(
                    (item: Person) => item.id === idx
                  )?.position
                : undefined;
              return (
                <div className={css.rowLine} key={idx}>
                  <div
                    className={cx(css.memberName, {
                      [css.disabled]:
                        watchToBeEmployed?.key === ToBeEmployedMember.No ||
                        !watchToBeEmployed?.key,
                    })}
                  >
                    {pib}
                  </div>
                  <TextField
                    name="toBeEmployed"
                    label="Посада"
                    size="small"
                    defaultValue={defaultValue}
                    className={css.textField}
                    disabled={
                      watchToBeEmployed?.key === ToBeEmployedMember.No ||
                      !watchToBeEmployed?.key
                    }
                    onChange={(e) => handleChangeMembers(e, idx, pib)}
                  />
                </div>
              );
            })}
          {errors?.data?.toBeEmployed?.value && (
            <ErrorMessage
              message={String(errors?.data?.toBeEmployed?.value.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="data.patronage"
            control={control}
            defaultValue={values?.data.patronage}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є бажання/можливість у вашого домогосодарства стати патронатною сім'єю?

                (Це тимчасова форма влаштування дитини у сім’ю, де термін перебування дитини не може перевищувати трьох місяців).
                "
                options={getEnumOptions(PatronageFamily)}
                error={
                  errors?.data?.patronage
                    ? { key: { message: errors?.data?.patronage.message } }
                    : undefined
                }
              />
            )}
          />
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
