import * as yup from 'yup';

export const schema = yup.object().shape({
  data: yup.object().shape({
    family: yup.object().shape({
      data: yup
        .array()
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
