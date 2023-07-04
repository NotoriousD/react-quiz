import { useEffect } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { FormFieldValues, FormFields, initialValues } from 'types';
import {
  DisabledMember,
  DiseasesMember,
  HugPosition,
  HugPositionMembers,
  IllegitimateMember,
  PositionMember,
} from 'types/additional';
import { QuestionHelps, QuestionSupply } from 'types/capital';
import { SocialStatuses } from 'types/socialStatus';

interface ClearFields {
  fields: string[];
  setValue: UseFormSetValue<FormFieldValues>;
  watch: UseFormWatch<FormFieldValues>;
}

const rules = {
  socialStatus: (value: string) => value !== SocialStatuses.Other,
  useHelps: (value: string) => value === QuestionHelps.No,
  readyToSupply: (value: string) => value === QuestionSupply.Yes,
  disabledMember: (value: string) => value === DisabledMember.No,
  illegitimate: (value: string) => value === IllegitimateMember.No,
  diseases: (value: string) => value === DiseasesMember.No,
  hugPosition: (value: string) => value === HugPosition.No,
  familyPosition: (value: string) => value === PositionMember.No,
  hugFamilyPosition: (value: string) => value === HugPositionMembers.No,
};

export const useClearFields = ({ fields, setValue, watch }: ClearFields) => {
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const fieldName = name?.split('.')[1];
      if (fieldName && fields.includes(fieldName)) {
        //@ts-ignore
        const keyValue = value?.data[fieldName as keyof FormFields]?.key;
        if (
          fieldName in rules &&
          rules[fieldName as keyof typeof rules](keyValue)
        ) {
          setValue(
            //@ts-ignore
            `data.${fieldName as keyof FormFields}.value`,
            //@ts-ignore
            initialValues.data[fieldName].value
          );
        }
      }
      console.log(value, name, type);
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, fields]);
};
