import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { v4 as uuidv4 } from 'uuid';

import {
  FormFieldValues,
  FormFieldsDocuments,
  getEnumOptions,
  initialValues,
} from 'types';
import {
  DisableGroups,
  DisabledMember,
  DiseasesMember,
  HugPosition,
  HugPositionMembers,
  IllegitimateMember,
  PatronageFamily,
  PositionMember,
  Professions,
  QuestionAddSingleParent,
  QuestionInjured,
  QuestionPregnant,
  QuestionSingleParent,
  ToBeEmployed,
  ViolenceMember,
} from 'types/additional';
import { SecondRelationShip } from 'types/relationship';

import { FileUploader } from 'components/FileUploader';
import { ErrorMessage } from 'components/ErrorMessage';
import { RadioInput } from 'components/RadioGroup';

import { schema } from './validation';
import css from './fourStep.module.scss';

interface Props {
  onSubmitStep: (data: FormFieldValues) => void;
  onBack: () => void;
  values: FormFieldValues;
}

interface SecondRelationshipMember {
  id: string;
  name: string;
  status: SecondRelationShip | undefined;
  document: boolean;
}

type TextFieldTypes =
  | 'data.estateDamage.value'
  | 'data.useHelps.value'
  | 'data.readyToSupply.value';

export const FourStep: React.FC<Props> = ({ onSubmitStep, onBack, values }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    register,
    watch,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    defaultValues: values,
  });
  const { append, remove, update, fields } = useFieldArray({
    control,
    name: 'data.injured.value',
  });

  const [
    watchInjured,
    watchPregnant,
    watchSingleParent,
    watchDisabledMember,
    watchIllegitimate,
    watchDiseases,
    watchViolence,
    watchPosition,
    watchFamilyPosition,
    watchHugPosition,
    watchHugFamilyPosition,
    watchToBeEmployed,
    watchToBeEmployedMembers,
  ] = watch([
    'data.injured',
    'data.pregnant',
    'data.singleParent',
    'data.disabledMember',
    'data.illegitimate',
    'data.diseases',
    'data.violence',
    'data.position',
    'data.familyPosition',
    'data.hugPosition',
    'data.hugFamilyPosition',
    'data.toBeEmployed',
    'data.toBeEmployedMembers',
  ]);

  const generateDefaultMember = () => ({
    name: '',
    status: undefined,
  });

  const handleChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string[]
  ) => {
    setValue(`documents.${name}`, files);
  };

  const onChangeFile = (
    name: keyof FormFieldsDocuments,
    files: string | string[],
    fileId?: string,
    idx?: number
  ) => {
    if (fileId && idx) {
      const members = getValues('data.injured.value');
      update(idx, { ...members[fileId], document: true });
    } else {
      const key = name.replace('documents.', '');
      //@ts-ignore
      handleChangeFile(key, files);
    }
  };

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.name as TextFieldTypes, event.target.value);
  };

  const handleAddInjuredMemeber = useCallback(() => {
    append(generateDefaultMember());
  }, [append]);

  const handleRemoveInjuredMember = (id: number) => {
    remove(id);
  };

  const getFamilyMemberNames = useMemo(() => {
    if (Boolean(values.data.family.data.length)) {
      return values.data.family.data.map((member) => member.pib);
    }
    return [];
  }, [values.data.family]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (watchInjured.key === QuestionInjured.Yes && !Boolean(fields.length)) {
      handleAddInjuredMemeber();
    }
  }, [watchInjured, fields, handleAddInjuredMemeber]);

  useEffect(() => {
    if (
      watchDisabledMember.key === DisabledMember.No &&
      Boolean(watchDisabledMember.value?.name)
    ) {
      setValue(
        'data.disabledMember.value',
        initialValues.data.disabledMember.value
      );
    }
  }, [watchDisabledMember, watchDisabledMember.key, setValue]);

  useEffect(() => {
    if (
      watchIllegitimate.key === IllegitimateMember.No &&
      Boolean(watchIllegitimate.value?.name)
    ) {
      setValue(
        'data.illegitimate.value',
        initialValues.data.illegitimate.value
      );
    }
  }, [watchIllegitimate, watchIllegitimate.key, setValue]);

  useEffect(() => {
    if (
      watchDiseases.key === DiseasesMember.No &&
      Boolean(watchDiseases.value?.name)
    ) {
      setValue('data.diseases.value', initialValues.data.diseases.value);
    }
  }, [watchDiseases, watchDiseases.key, setValue]);

  useEffect(() => {
    if (
      watchHugPosition.key === HugPosition.No &&
      Boolean(watchHugPosition.value)
    ) {
      setValue('data.hugPosition.value', initialValues.data.hugPosition.value);
    }
  }, [watchHugPosition, watchHugPosition.key, setValue]);

  useEffect(() => {
    if (
      watchFamilyPosition.key === PositionMember.No &&
      Boolean(watchFamilyPosition.value?.name)
    ) {
      setValue(
        'data.familyPosition.value',
        initialValues.data.familyPosition.value
      );
    }
  }, [watchFamilyPosition, watchFamilyPosition.key, setValue]);

  useEffect(() => {
    if (
      watchHugFamilyPosition.key === HugPositionMembers.No &&
      Boolean(watchHugFamilyPosition.value?.name)
    ) {
      setValue(
        'data.hugFamilyPosition.value',
        initialValues.data.hugFamilyPosition.value
      );
    }
  }, [watchHugFamilyPosition, watchHugFamilyPosition.key, setValue]);

  console.log(errors);

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmitStep)} className={css.form}>
        {/* injured */}
        <div className={css.row}>
          <Controller
            name="data.injured.key"
            control={control}
            defaultValue={values?.data.injured.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, які внаслідок війни на території України отримали поранення, померли чи вважаються зниклими безвісти?"
                options={getEnumOptions(QuestionInjured)}
                error={errors?.data?.injured}
              />
            )}
          />
        </div>
        {/* injured members */}
        <div className={css.row}>
          {watchInjured.key === QuestionInjured.Yes && (
            <div className={css.generatorContainer}>
              <div className={css.tip}></div>
              {fields.map((field, index) => {
                const isFirst = index === 0;
                return (
                  <div key={field.id} className={css.generator}>
                    <div className={css.col}>
                      <TextField
                        {...register(`data.injured.value.${index}.name`)}
                        label="ПІБ"
                        className={css.textField}
                      />
                      {Array.isArray(errors?.data?.injured?.value) &&
                        Boolean(errors?.data?.injured?.value[index]?.name) && (
                          <ErrorMessage
                            message={String(
                              errors?.data?.injured?.value[index]?.name.message
                            )}
                          />
                        )}
                    </div>
                    <div className={css.col}>
                      <FormControl className={css.selectWrapper}>
                        <InputLabel className={css.selectLabel}>
                          Тип відносин
                        </InputLabel>
                        <Select
                          {...register(`data.injured.value.${index}.status`)}
                          className={css.select}
                          label="Тип відносин"
                        >
                          {getEnumOptions(SecondRelationShip).map(
                            ({ label, value }) => (
                              <MenuItem value={value}>{label}</MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      {Array.isArray(errors?.data?.injured?.value) &&
                        Boolean(
                          errors?.data?.injured?.value[index]?.status
                        ) && (
                          <ErrorMessage
                            message={String(
                              errors?.data?.injured?.value[index]?.status
                                .message
                            )}
                          />
                        )}
                    </div>
                    <div className={css.col}>
                      {!isFirst && (
                        <span
                          className={css.removeMember}
                          onClick={() => handleRemoveInjuredMember(index)}
                        >
                          +
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              <Button
                variant="contained"
                className={css.btn}
                size="small"
                onClick={handleAddInjuredMemeber}
              >
                Додати
              </Button>
            </div>
          )}
        </div>
        <div className={css.row}>
          <Controller
            name="documents.injured"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                isMultiply
                disabled={
                  watchInjured?.key === QuestionInjured.No || !watchInjured?.key
                }
                inputName="injured"
              >
                <p className={css.text}>
                  До кожної доданої людини необхідно додати докази сімейного
                  домогосподарства, член якого загинув або зник безвісти під час
                  та внаслідок військового конфлікту на території України
                  протягом 2014-2023 років; ( рішення суду про визнання особи
                  загиблою або безвісти зниклою)
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
        {/* pregnant */}
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
        {/* pregnant file */}
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
        {/* single parent */}
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
        {/* single parent file */}
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
        {/* disabled member */}
        <div className={css.row}>
          <Controller
            name="data.disabledMember.key"
            control={control}
            defaultValue={values?.data.disabledMember.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вашого домогосподарства особи з інвалідністю"
                options={getEnumOptions(DisabledMember)}
                error={errors?.data?.disabledMember}
              />
            )}
          />
        </div>
        {/* disabled member list */}
        {watchDisabledMember.key === DisabledMember.Yes && (
          <div className={cx(css.row, css.cols)}>
            <div className={css.col}>
              <Controller
                name="data.disabledMember.value.name"
                control={control}
                defaultValue={values?.data?.disabledMember?.value?.name}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Особа з інвалідністю
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Особа з інвалідністю"
                    >
                      {getEnumOptions(getFamilyMemberNames).map(
                        ({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
              {Boolean(errors?.data?.disabledMember) &&
                errors?.data?.disabledMember?.value?.name && (
                  <ErrorMessage
                    message={String(
                      errors?.data?.disabledMember?.value?.name.message
                    )}
                  />
                )}
            </div>
            <div className={css.col}>
              <Controller
                name="data.disabledMember.value.value"
                control={control}
                defaultValue={values?.data?.disabledMember?.value?.value}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Група інвалідності
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Група інвалідності"
                    >
                      {getEnumOptions(DisableGroups).map(({ label, value }) => (
                        <MenuItem value={value}>{label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors?.data?.disabledMember?.value?.value && (
                <ErrorMessage
                  message={String(
                    errors?.data?.disabledMember?.value?.value.message
                  )}
                />
              )}
            </div>
          </div>
        )}
        {/* disabled member file */}
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
        {/* illegitimate */}
        <div className={css.row}>
          <Controller
            name="data.illegitimate.key"
            control={control}
            defaultValue={values?.data.illegitimate.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що повністю або частково вважаються непрацездатними?"
                options={getEnumOptions(IllegitimateMember)}
                error={errors?.data?.illegitimate}
              />
            )}
          />
        </div>
        {/* illegitimate list */}
        {(watchIllegitimate.key === IllegitimateMember.Fully ||
          watchIllegitimate.key === IllegitimateMember.Partly) && (
          <div className={cx(css.row, css.cols)}>
            <div className={css.col}>
              <Controller
                name="data.illegitimate.value.name"
                control={control}
                defaultValue={values?.data?.illegitimate?.value?.name}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Особа з непрацездатністю
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Особа з непрацездатністю"
                    >
                      {getEnumOptions(getFamilyMemberNames).map(
                        ({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
              {Boolean(errors?.data?.illegitimate) &&
                errors?.data?.illegitimate?.value?.name && (
                  <ErrorMessage
                    message={String(
                      errors?.data?.illegitimate?.value?.name.message
                    )}
                  />
                )}
            </div>
            <div className={css.col}>
              <Controller
                name="data.illegitimate.value.value"
                control={control}
                defaultValue={values?.data?.illegitimate?.value?.value}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Причину"
                    className={css.textField}
                  />
                )}
              />
              {errors?.data?.illegitimate?.value?.value && (
                <ErrorMessage
                  message={String(
                    errors?.data?.illegitimate?.value?.value.message
                  )}
                />
              )}
            </div>
          </div>
        )}
        {/* illegitimate file */}
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
        {/* diseases */}
        <div className={css.row}>
          <Controller
            name="data.diseases.key"
            control={control}
            defaultValue={values?.data.diseases.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи з тяжкими захворюваннями?"
                options={getEnumOptions(DiseasesMember)}
                error={errors?.data?.diseases}
              />
            )}
          />
        </div>
        {/* diseases list */}
        {watchDiseases.key === DiseasesMember.Yes && (
          <div className={cx(css.row, css.cols)}>
            <div className={css.col}>
              <Controller
                name="data.diseases.value.name"
                control={control}
                defaultValue={values?.data?.diseases?.value?.name}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Особа з тяжким захворюванням
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Особа з тяжким захворюванням"
                    >
                      {getEnumOptions(getFamilyMemberNames).map(
                        ({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
              {Boolean(errors?.data?.diseases) &&
                errors?.data?.diseases?.value?.name && (
                  <ErrorMessage
                    message={String(
                      errors?.data?.diseases?.value?.name.message
                    )}
                  />
                )}
            </div>
            <div className={css.col}>
              <Controller
                name="data.diseases.value.value"
                control={control}
                defaultValue={values?.data?.diseases?.value?.value}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Вид захворювання"
                    className={css.textField}
                  />
                )}
              />
              {errors?.data?.diseases?.value?.value && (
                <ErrorMessage
                  message={String(errors?.data?.diseases?.value?.value.message)}
                />
              )}
            </div>
          </div>
        )}
        {/* diseases file */}
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
        {/* violence */}
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
        {/* violence file */}
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
        {/* position */}
        <div className={css.row}>
          <div className={css.title}>
            Чи маєте ви необхідні знання, яки дозволяють обіймати зазначені
            посади
          </div>
          <Controller
            name="data.position.key"
            control={control}
            defaultValue={values?.data.position.key}
            render={({ field }) => (
              <FormControl className={css.selectWrapper}>
                <InputLabel className={css.selectLabel}>Посада</InputLabel>
                <Select {...field} className={css.select} label="Посада">
                  {getEnumOptions(Professions).map(({ label, value }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors?.data?.position?.key && (
            <ErrorMessage
              message={String(errors?.data?.position?.key.message)}
            />
          )}
        </div>
        {/* position file */}
        <div className={css.row}>
          <Controller
            name="documents.position"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchPosition?.key === Professions.No || !watchPosition?.key
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
        {/* hug position */}
        <div className={css.row}>
          <Controller
            name="data.hugPosition.key"
            control={control}
            defaultValue={values?.data.hugPosition.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи обіймали/обіймаєте ви посаду, зазначену в списку або ви готові створити власний бізнес що дозволяє забезпечувати домогосподарство заявника"
                options={getEnumOptions(HugPosition)}
                error={errors?.data?.hugPosition}
              />
            )}
          />
        </div>
        {/* hug position list */}
        {watchHugPosition.key === HugPosition.Yes && (
          <div className={css.row}>
            <Controller
              name="data.hugPosition.value"
              control={control}
              defaultValue={values?.data?.hugPosition.value}
              render={({ field }) => (
                <FormControl className={css.selectWrapper}>
                  <InputLabel className={css.selectLabel}>Посада</InputLabel>
                  <Select {...field} className={css.select} label="Посада">
                    {getEnumOptions(Professions)
                      .filter(({ label }) => label !== Professions.No)
                      .map(({ label, value }) => (
                        <MenuItem value={value}>{label}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors?.data?.hugPosition?.value && (
              <ErrorMessage
                message={String(errors?.data?.hugPosition?.value.message)}
              />
            )}
          </div>
        )}
        {/* hug position file */}
        <div className={css.row}>
          <Controller
            name="documents.hugPosition"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchHugPosition?.key === HugPosition.No ||
                  !watchHugPosition?.key
                }
                inputName="hugPosition"
              >
                <p className={css.text}>
                  Довідка за попереднім місцем роботи, характеристика, резюме
                  тощо.
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.hugPosition && (
            <ErrorMessage
              message={String(errors?.documents?.hugPosition.message)}
            />
          )}
        </div>
        <hr />
        {/* to be employed */}
        <div className={css.row}>
          <Controller
            name="data.toBeEmployed.key"
            control={control}
            defaultValue={values?.data.toBeEmployed.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи згодні ви займати посаду та чи готові до працевлаштування на території Новобасанської громади на зазначені вакансії чи готові створити власний бізнес, який дозволить забезпечувати своє господарство та створювати додаткові робочі місця для жителів громади"
                options={getEnumOptions(ToBeEmployed)}
                error={errors?.data?.toBeEmployed}
              />
            )}
          />
        </div>
        {/* to be employed file */}
        <div className={css.row}>
          <Controller
            name="documents.toBeEmployed"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchToBeEmployed?.key !== ToBeEmployed.Ready ||
                  !watchToBeEmployed?.key
                }
                inputName="toBeEmployed"
              >
                <p className={css.text}>Документ з пропозицією по бізнесу.</p>
              </FileUploader>
            )}
          />
          {errors?.documents?.toBeEmployed && (
            <ErrorMessage
              message={String(errors?.documents?.toBeEmployed.message)}
            />
          )}
        </div>
        <hr />
        {/* family position */}
        <div className={css.row}>
          <Controller
            name="data.familyPosition.key"
            control={control}
            defaultValue={values?.data.familyPosition.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед членів вашого домогосподарства особи, що можуть (мають необхідні знання і досвід) обіймати зазначені посади: Сімейний лікар, Лікар-педіатр (сімейний), Нотаріус, Програміст (спеціаліст у сфері ІТ-технологій), Вчитель англійської мови, Хореограф, Механізатор, Електрик, Тренер, Юрист, Бухгалтер, ПІДПРИЄМЕЦЬ готовий працювати чи створити робочі місця (бізнес)"
                options={getEnumOptions(PositionMember)}
                error={errors?.data?.familyPosition}
              />
            )}
          />
        </div>
        {/* family position list */}
        {watchFamilyPosition.key === PositionMember.Yes && (
          <div className={cx(css.row, css.cols)}>
            <div className={css.col}>
              <Controller
                name="data.familyPosition.value.name"
                control={control}
                defaultValue={values?.data?.familyPosition?.value?.name}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Член домогосодарства
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Член домогосодарства"
                    >
                      {getEnumOptions(getFamilyMemberNames).map(
                        ({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className={css.col}>
              <Controller
                name="data.familyPosition.value.value"
                control={control}
                defaultValue={values?.data?.familyPosition?.value?.value}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>Посада</InputLabel>
                    <Select {...field} className={css.select} label="Посада">
                      {getEnumOptions(Professions)
                        .filter(({ label }) => label !== Professions.No)
                        .map(({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </div>
        )}
        {/* family position members file */}
        <div className={css.row}>
          <Controller
            name="documents.familyPosition"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchFamilyPosition?.key === PositionMember.No ||
                  !watchFamilyPosition?.key
                }
                inputName="familyPosition"
              >
                <p className={css.text}>
                  Довідка за попереднім місцем роботи, характеристика, резюме
                  тощо.
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.hugFamilyPosition && (
            <ErrorMessage
              message={String(errors?.documents?.hugFamilyPosition.message)}
            />
          )}
        </div>
        <hr />
        {/* hug position members */}
        <div className={css.row}>
          <Controller
            name="data.hugFamilyPosition.key"
            control={control}
            defaultValue={values?.data.hugFamilyPosition.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи обіймали/обіймають вони посаду, зазначену в списку або вони готові створити власний бізнес дозволяє забезпечувати домогосподарство заявника"
                options={getEnumOptions(HugPositionMembers)}
                error={errors?.data?.position}
              />
            )}
          />
        </div>
        {/* hug position members list */}
        {watchHugFamilyPosition.key === HugPositionMembers.Yes && (
          <div className={cx(css.row, css.cols)}>
            <div className={css.col}>
              <Controller
                name="data.hugFamilyPosition.value.name"
                control={control}
                defaultValue={values?.data?.hugFamilyPosition?.value?.name}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>
                      Член домогосодарства
                    </InputLabel>
                    <Select
                      {...field}
                      className={css.select}
                      label="Член домогосодарства"
                    >
                      {getEnumOptions(getFamilyMemberNames).map(
                        ({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className={css.col}>
              <Controller
                name="data.hugFamilyPosition.value.value"
                control={control}
                defaultValue={values?.data?.hugFamilyPosition?.value?.value}
                render={({ field }) => (
                  <FormControl className={css.selectWrapper}>
                    <InputLabel className={css.selectLabel}>Посада</InputLabel>
                    <Select {...field} className={css.select} label="Посада">
                      {getEnumOptions(Professions)
                        .filter(({ label }) => label !== Professions.No)
                        .map(({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </div>
        )}
        {/* hug position members file */}
        <div className={css.row}>
          <Controller
            name="documents.hugFamilyPosition"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchHugFamilyPosition?.key === HugPositionMembers.No ||
                  !watchHugFamilyPosition?.key
                }
                inputName="hugFamilyPosition"
              >
                <p className={css.text}>
                  Довідка за попереднім місцем роботи, характеристика, резюме
                  тощо.
                </p>
              </FileUploader>
            )}
          />
          {errors?.documents?.hugFamilyPosition && (
            <ErrorMessage
              message={String(errors?.documents?.hugFamilyPosition.message)}
            />
          )}
        </div>
        <hr />
        {/* to be employed members */}
        <div className={css.row}>
          <Controller
            name="data.toBeEmployedMembers.key"
            control={control}
            defaultValue={values?.data.toBeEmployedMembers.key}
            render={({ field }) => (
              <RadioInput
                {...field}
                title="Чи є серед вказаних осіб бажаючі бути працевлаштованими за обраними спеціальностями у селі Старий Биків Ніжинського району Чернігівської області?"
                options={getEnumOptions(ToBeEmployed)}
                error={errors?.data?.toBeEmployed}
              />
            )}
          />
        </div>
        {/* to be employed members file */}
        <div className={css.row}>
          <Controller
            name="documents.toBeEmployedMembers"
            control={control}
            render={({ field }) => (
              <FileUploader
                {...field}
                onChange={onChangeFile}
                disabled={
                  watchToBeEmployedMembers?.key !== ToBeEmployed.Ready ||
                  !watchToBeEmployedMembers?.key
                }
                inputName="toBeEmployedMembers"
              >
                <p className={css.text}>Документ з пропозицією по бізнесу.</p>
              </FileUploader>
            )}
          />
          {errors?.documents?.toBeEmployedMembers && (
            <ErrorMessage
              message={String(errors?.documents?.toBeEmployedMembers.message)}
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
                title="Чи є бажання/можливість у вашого домогосодарства стати патронатною сім'єю? (Це тимчасова форма влаштування дитини у сім’ю, де термін перебування дитини не може перевищувати трьох місяців)."
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
