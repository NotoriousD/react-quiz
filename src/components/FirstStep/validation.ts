import { SocialStatuses } from 'types/socialStatus';
import * as yup from 'yup';

export const schema = yup.object().shape({
  data: yup.object().shape({
    pib: yup.string().required("Поле є обов'язковим"),
    birthday: yup.string().required("Поле є обов'язковим"),
    age: yup.number().min(1, "Введіть коректне значення").max(100, "Введіть коректне значення"),
    idNumber: yup.string().required("Поле є обов'язковим"),
    issue: yup.string().required("Поле є обов'язковим"),
    issueDate: yup.string().required("Поле є обов'язковим"),
    issueCity: yup.string().required("Поле є обов'язковим"),
    phone: yup.string().required("Поле є обов'язковим").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Ви ввели невалідний номер телефону'),
    rnokpp: yup.string().required("Поле є обов'язковим"),
    vpoNumber: yup.string().required("Поле є обов'язковим"),
    vpoDate: yup.string().required("Поле є обов'язковим"),
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
