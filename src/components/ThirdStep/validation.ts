import * as yup from 'yup';

import { Damage, Question, QuestionHelps, QuestionSupply } from 'types/capital';

export const schema = yup.object().shape({
  data: yup.object().shape({
    hasEstate: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
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
    estateTerritory: yup.object().when('hasEstate', ([hasEstate]) => {
      return hasEstate.key === Question.Yes
        ? yup.object().shape({
            key: yup.string().required("Поле є обов'язковим"),
          })
        : yup.object().shape({
            key: yup.string(),
          });
    }),
    estateDamage: yup.object().when('hasEstate', ([hasEstate]) => {
      return hasEstate.key === Question.Yes
        ? yup.object().shape({
            key: yup.string().required("Поле є обов'язковим"),
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
  }),
  documents: yup.object().when('data', ([data]) => {
    return yup.object().shape({
      hasEstate: yup.array().when(() => {
        return data.hasEstate.key === Question.Yes
          ? yup.array().min(1, "Поле є обов'язковим")
          : yup.array();
      }),
      estateDamage: yup.array().when(() => {
        return data.hasEstate.key === Question.Yes &&
          data.estateDamage.key !== Damage.NoDamage
          ? yup.array().min(1, "Поле є обов'язковим")
          : yup.array();
      }),
    });
  }),
});
