import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cx from 'classnames';

import { FormFields, getEnumOptions } from 'types';

import { ChangeEventType, FileUploader } from 'components/FileUploader';
import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import css from './fourStep.module.scss';
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

interface Props {
  onSubmitStep: (data: Partial<FormFields>) => void;
  onBack: () => void;
  values: FormFields;
}

interface Person {
  id: number;
  name: string;
  position: string;
}

type TextFieldTypes =
  | 'typeEstate.key.value'
  | 'estateDamage.value'
  | 'useHelps.value'
  | 'readyToSupply.value';

type MembersFieldTypes = 'position' | 'toBeEmployed';

const schema = yup.object({
  injured: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.string().when('key', ([key]) => {
      return key === QuestionInjured.Yes
        ? yup.string().required("Поле є обов'язковим")
        : yup.string();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key === QuestionInjured.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  singleParent: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.string().when('key', ([key]) => {
      return key === QuestionSingleParent.Yes
        ? yup.string().required("Поле є обов'язковим")
        : yup.string();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key === QuestionSingleParent.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  disabledMember: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.string().when('key', ([key]) => {
      return key === DisabledMember.Yes
        ? yup.string().required("Поле є обов'язковим")
        : yup.string();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key === DisabledMember.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  illegitimate: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.string().when('key', ([key]) => {
      return key !== IllegitimateMember.No
        ? yup.string().required("Поле є обов'язковим")
        : yup.string();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key !== IllegitimateMember.No
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  diseases: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.string().when('key', ([key]) => {
      return key === DiseasesMember.Yes
        ? yup.string().required("Поле є обов'язковим")
        : yup.string();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key === DiseasesMember.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  position: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.array().when('key', ([key]) => {
      return key === PositionMember.Yes
        ? yup.array().min(1, 'Необхідно заповнити хочаб одну людину')
        : yup.array();
    }),
    document: yup.array().when(['key'], ([key]) => {
      return key === PositionMember.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
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
    value: yup.array().when('key', ([key]) => {
      return key === QuestionPregnant.Yes
        ? yup.array().min(1, "Поле є обов'язковим")
        : yup.array();
    }),
  }),
  violence: yup.object().shape({
    key: yup.string().required("Поле є обов'язковим"),
    value: yup.array().when(['key'], ([key]) => {
      return key === ViolenceMember.Yes
        ? yup.array().min(1, 'Необхідно додати файл')
        : yup.array();
    }),
  }),
  patronage: yup.string().required("Поле є обов'язковим"),
});

export const FourStep: React.FC<Props> = ({ onSubmitStep, onBack, values }) => {
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

  const watchInjured = watch('injured');
  const watchPregnant = watch('pregnant');
  const watchSingleParent = watch('singleParent');
  const watchDisabledMember = watch('disabledMember');
  const watchIllegitimate = watch('illegitimate');
  const watchDiseases = watch('diseases');
  const watchViolence = watch('violence');
  const watchPosition = watch('position');
  const watchToBeEmployed = watch('toBeEmployed');

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
    console.log(event.target.value);
    setValue(event.target.name as TextFieldTypes, event.target.value);
  };

  const handleChangeMembers = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number,
    name: string
  ) => {
    const members =
      getValues()[event.target.name as MembersFieldTypes]?.value || [];
    const member = Boolean(members.length)
      ? members.find((person: Person) => person.id === idx)
      : undefined;
    let newMembers;

    if (member && !Boolean(event.target.value)) {
      newMembers = members.filter((person: Person) => person.id !== idx);
      setValue(`${event.target.name as MembersFieldTypes}.value`, newMembers);
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

    setValue(`${event.target.name as MembersFieldTypes}.value`, newMembers);
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        <div className={css.row}>
          <Controller
            name="injured.key"
            control={control}
            defaultValue={values?.injured.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, які внаслідок війни на території України отримали поранення, померли чи вважаються зниклими безвісти?"
                inputName="injured.value"
                fieldValue={values?.injured.value}
                withOther={[QuestionInjured.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(QuestionInjured)}
                error={errors?.injured}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="injured.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchInjured?.key === QuestionInjured.No || !watchInjured?.key
                }
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
          {errors?.injured?.document && (
            <ErrorMessage message={String(errors?.injured?.document.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="pregnant.key"
            control={control}
            defaultValue={values?.injured.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашогодомогосподаства вагітні жінки?"
                options={getEnumOptions(QuestionPregnant)}
                error={errors?.pregnant}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="pregnant.value"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchPregnant?.key === QuestionPregnant.No ||
                  !watchPregnant?.key
                }
              >
                <p className={css.text}>
                  Довідка від лікаря/лікарське заключення
                </p>
              </FileUploader>
            )}
          />
          {errors?.pregnant?.value && (
            <ErrorMessage message={String(errors?.pregnant?.value.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="singleParent.key"
            control={control}
            defaultValue={values?.singleParent.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства одинокі батьки, які самостійно утримують неповнолітніх дітей?"
                inputName="singleParent.value"
                fieldValue={watchSingleParent?.value}
                withOther={[QuestionSingleParent.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(QuestionSingleParent)}
                fieldOptions={getEnumOptions(QuestionAddSingleParent)}
                inputType="radio"
                error={errors?.singleParent}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="singleParent.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchSingleParent?.key === QuestionSingleParent.No ||
                  !watchSingleParent?.key
                }
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
          {errors?.singleParent?.document && (
            <ErrorMessage
              message={String(errors?.singleParent?.document.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="disabledMember.key"
            control={control}
            defaultValue={values?.disabledMember.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вашого домогосподарства особи з інвалідністю"
                inputName="disabledMember.value"
                fieldValue={values?.disabledMember.value}
                withOther={[DisabledMember.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(DisabledMember)}
                error={errors?.disabledMember}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="disabledMember.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchDisabledMember?.key === DisabledMember.No ||
                  !watchDisabledMember?.key
                }
              >
                <p className={css.text}>
                  Докази наявності в сім'ї дитини/особи з інвалідністю або з
                  вадами розвитку; довідка МСЕК (медико-соціальна експертна
                  комісія)
                </p>
              </FileUploader>
            )}
          />
          {errors?.disabledMember?.document && (
            <ErrorMessage
              message={String(errors?.disabledMember?.document.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="illegitimate.key"
            control={control}
            defaultValue={values?.illegitimate.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що повністю або частково вважаються непрацездатними?"
                inputName="illegitimate.value"
                fieldValue={values?.illegitimate.value}
                withOther={[
                  IllegitimateMember.Partly,
                  IllegitimateMember.Fully,
                ]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(IllegitimateMember)}
                error={errors?.illegitimate}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="illegitimate.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchIllegitimate?.key === IllegitimateMember.No ||
                  !watchIllegitimate?.key
                }
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
          {errors?.illegitimate?.document && (
            <ErrorMessage
              message={String(errors?.illegitimate?.document.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="diseases.key"
            control={control}
            defaultValue={values?.diseases.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи з тяжкими захворюваннями?"
                inputName="diseases.value"
                fieldValue={values?.diseases.value}
                withOther={[DiseasesMember.Yes]}
                onChangeTextField={handleChangeTextField}
                options={getEnumOptions(DiseasesMember)}
                error={errors?.diseases}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="diseases.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchDiseases?.key === DiseasesMember.No ||
                  !watchDiseases?.key
                }
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
          {errors?.diseases?.document && (
            <ErrorMessage
              message={String(errors?.diseases?.document.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="violence.key"
            control={control}
            defaultValue={values?.violence.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що постраждали від гендерно-зумовленого насильства?"
                options={getEnumOptions(ViolenceMember)}
                error={errors?.violence}
              />
            )}
          />
        </div>
        <div className={css.row}>
          <Controller
            name="violence.value"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchViolence?.key === ViolenceMember.No ||
                  !watchViolence?.key
                }
              >
                <p className={css.text}>
                  Вирок суду або інший правовстановлюючий документ щодо члена
                  сім'ї, який постраждав від сексуального та домашнього
                  насильства;
                </p>
              </FileUploader>
            )}
          />
          {errors?.violence?.value && (
            <ErrorMessage message={String(errors?.violence?.value.message)} />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="position.key"
            control={control}
            defaultValue={values?.position.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що можуть (мають необхідні знання і досвід) обіймати зазначені посади: Сімейний лікар, Лікар-педіатр (сімейний), Нотаріус, Програміст (спеціаліст у сфері ІТ-технологій), Вчитель англійської мови, Хореограф, Механізатор, Електрик, Тренер, Юрист, Бухгалтер, ПІДПРИЄМЕЦЬ готовий працювати чи створити робочі місця (бізнес)"
                options={getEnumOptions(PositionMember)}
                error={errors?.position}
              />
            )}
          />
        </div>
        <div className={css.row}>
          {Boolean(values?.family?.data.length) &&
            values.family.data.map(({ pib }, idx) => {
              const defaultValue = Boolean(values?.toBeEmployed?.value?.length)
                ? values?.toBeEmployed.value.find(
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
          {errors?.position?.value && (
            <ErrorMessage message={String(errors?.position?.value.message)} />
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="position.document"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchPosition?.key === PositionMember.No ||
                  !watchPosition?.key
                }
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
          {errors?.position?.document && (
            <ErrorMessage
              message={String(errors?.position?.document.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="toBeEmployed.key"
            control={control}
            defaultValue={values?.toBeEmployed.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вказаних осіб бажаючі бути працевлаштованими за обраними спеціальностями у селі Старий Биків Ніжинського району Чернігівської області?"
                options={getEnumOptions(ToBeEmployedMember)}
                error={errors?.toBeEmployed}
              />
            )}
          />
        </div>
        <div className={css.row}>
          {Boolean(values?.family?.data.length) &&
            values.family.data.map(({ pib }, idx) => {
              const defaultValue = Boolean(values?.toBeEmployed?.value?.length)
                ? values?.toBeEmployed.value.find(
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
          {errors?.toBeEmployed?.value && (
            <ErrorMessage
              message={String(errors?.toBeEmployed?.value.message)}
            />
          )}
        </div>
        <hr />
        <div className={css.row}>
          <Controller
            name="patronage"
            control={control}
            defaultValue={values?.patronage}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є бажання/можливість у вашого домогосодарства стати патронатною сім'єю?

                (Це тимчасова форма влаштування дитини у сім’ю, де термін перебування дитини не може перевищувати трьох місяців).
                "
                options={getEnumOptions(PatronageFamily)}
                error={
                  errors?.patronage
                    ? { key: { message: errors?.patronage.message } }
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
