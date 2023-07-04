import {
  DisabledMember,
  DiseasesMember,
  HugPosition,
  IllegitimateMember,
  PositionMember,
  QuestionInjured,
  QuestionPregnant,
  QuestionSingleParent,
  ToBeEmployedMember,
  ViolenceMember,
} from 'types/additional';
import * as yup from 'yup';

export const schema = yup.object({
  data: yup.object().shape({
    injured: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === QuestionInjured.Yes
          ? yup.array().of(
              yup.object().shape({
                name: yup.string().required("Поле є обов'язковим"),
                status: yup.string().required("Поле є обов'язковим"),
              })
            )
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
    }),
    disabledMember: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.object().when('key', ([key]) => {
        return key === DisabledMember.Yes
          ? yup.object().shape({
              name: yup.string().required("Поле є обов'язковим"),
              value: yup.string().required("Поле є обов'язковим"),
            })
          : yup.object();
      }),
    }),
    illegitimate: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.object().when('key', ([key]) => {
        return key === IllegitimateMember.Fully ||
          key === IllegitimateMember.Partly
          ? yup.object().shape({
              name: yup.string().required("Поле є обов'язковим"),
              value: yup.string().required("Поле є обов'язковим"),
            })
          : yup.object();
      }),
    }),
    diseases: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.object().when('key', ([key]) => {
        return key === DiseasesMember.Yes
          ? yup.object().shape({
              name: yup.string().required("Поле є обов'язковим"),
              value: yup.string().required("Поле є обов'язковим"),
            })
          : yup.object();
      }),
    }),
    position: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
    }),
    hugPosition: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.array().when('key', ([key]) => {
        return key === HugPosition.Yes
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
    familyPosition: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.object().when('key', ([key]) => {
        return key === PositionMember.Yes
          ? yup.object().shape({
              name: yup.string().required("Поле є обов'язковим"),
              value: yup.string().required("Поле є обов'язковим"),
            })
          : yup.object();
      }),
    }),
    toBeEmployed: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.object().when('key', ([key]) => {
        return key === ToBeEmployedMember.Yes
          ? yup.object().shape({
              name: yup.string().required("Поле є обов'язковим"),
              value: yup.string().required("Поле є обов'язковим"),
            })
          : yup.object();
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
          ? yup
              .array()
              .min(
                data.injured.value.length,
                'Необхідно додати файл до кожного вказаного вище члена домогосподарства'
              )
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
      familyPosition: yup.array().when(() => {
        return data.familyPosition.key === PositionMember.Yes
          ? yup.array().min(1, 'Необхідно додати файл')
          : yup.array();
      }),
      hugPosition: yup.array().when(() => {
        return data.hugPosition.key === HugPosition.Yes
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
