import { SocialStatuses } from 'types/socialStatus';
import * as yup from 'yup';

export const schema = yup.object().shape({
  data: yup.object().shape({
    addressRegion: yup.string().required("Поле є обов'язковим"),
    addressSettlement: yup.string().required("Поле є обов'язковим"),
    addressStreet: yup.string().required("Поле є обов'язковим"),
    addressBuilding: yup.string().required("Поле є обов'язковим"),
    addressFlat: yup.string().required("Поле є обов'язковим"),
    socialStatus: yup.object().shape({
      key: yup.string().required("Поле є обов'язковим"),
      value: yup.string().when('key', ([key]) => {
        return key === SocialStatuses.Other
          ? yup.string().required("Поле є обов'язковим")
          : yup.string();
      }),
    }),
  }),
  documents: yup.object().shape({
    pib: yup.array().min(1, "Поле є обов'язковим"),
    rnokpp: yup.array().min(1, "Поле є обов'язковим"),
  }),
});
