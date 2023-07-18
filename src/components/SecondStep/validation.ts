import * as yup from 'yup';

import { SocialStatuses } from 'types/socialStatus';

export const schema = yup.object().shape({
  data: yup.object().shape({
    avgIncomeAfter: yup.object().shape({
      value: yup.number().min(0, "Не може бути менше 0"),
    }),
    avgIncomeBefore: yup.object().shape({
      value: yup.number().min(0, "Не може бути менше 0"),
    }),
    family: yup.object().shape({
      data: yup
        .array().of(yup.object().shape({
          pib: yup.string().required("Поле є обов'язковим"),
          pibDoc: yup.array().min(1, "Поле є обов'язковим"),
          relationship: yup.string().required("Поле є обов'язковим"),
          age: yup.number().moreThan(0, "Повинно бути більше ніж 0").lessThan(110, "Повинно бути меньше ніж 110"),
          socialStatus: yup.object().shape({
            key: yup.string().required("Поле є обов'язковим"),
            value: yup.string().when('key', ([key]) => {
              return key === SocialStatuses.Other ? yup.string().required("Поле є обов'язковим") : yup.string();
            }),
          }),
          avgIncomeBefore: yup.number().moreThan(-1, "Повинно бути 0 або більше"),
          avgIncomeBeforeDoc: yup.array().min(1, "Поле є обов'язковим"),
          avgIncomeAfter: yup.number().moreThan(-1, "Повинно бути 0 або більше"),
          avgIncomeAfterDoc: yup.array().min(1, "Поле є обов'язковим")
        }))
        .min(
          1,
          'Необхідно додати інформацію про членів домогосподарства, що будуть проживати разом із заявником'
        ),
    }),
  }),
  documents: yup.object().shape({
    family: yup.array(),
    avgIncomeBefore: yup.array().min(1, 'Необхідно додати файл'),
    avgIncomeAfter: yup.array().min(1, 'Необхідно додати файл'),
  }),
});
