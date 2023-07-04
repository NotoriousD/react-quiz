import { Relationship } from './relationship';
import { SocialStatuses } from './socialStatus';
import {
  Question,
  EstateTerritory,
  Damage,
  QuestionHelps,
  QuestionSupply,
} from './capital';
import { RadioValue } from './radio';
import {
  DisabledMember,
  DiseasesMember,
  HugPosition,
  HugPositionMembers,
  IllegitimateMember,
  PositionMember,
  Professions,
  QuestionInjured,
  QuestionSingleParent,
  ToBeEmployed,
} from './additional';

export interface Family {
  pib: string;
  relationship: Relationship;
  age: number;
  socialStatus: RadioValue<SocialStatuses, any>;
  avgIncomeBefore: number;
  avgIncomeAfter: number;
}

export interface ChoosenMember {
  name: string;
  value: string;
}

export enum AuthirizationStatuses {
  Initialized = 'initialized',
  Processing = 'processing',
  Done = 'done',
  NotUsed = 'notUsed',
  Refuse = 'refuse',
}

export const statuses = {
  [AuthirizationStatuses.Initialized]: 'ініціалізовано',
  [AuthirizationStatuses.Processing]: 'Обробка',
  [AuthirizationStatuses.Done]: 'Готово',
  [AuthirizationStatuses.NotUsed]: 'Не використовується',
  [AuthirizationStatuses.Refuse]: 'Відмова',
};

export interface FormFieldsDocuments {
  pib: string[];
  rnokpp: string[];
  avgIncomeBefore: string[];
  avgIncomeAfter: string[];
  family: string[];
  pregnant: string[];
  violence: string[];
  hasEstate: string[];
  estateDamage: string[];
  injured: string[];
  singleParent: string[];
  disabledMember: string[];
  toBeEmployed: string[];
  illegitimate: string[];
  diseases: string[];
  position: string[];
  familyPosition: string[];
  hugPosition: string[];
  hugFamilyPosition: string[];
  toBeEmployedMembers: string[];
}

export interface FormFields {
  addressRegion: string;
  addressSettlement: string;
  addressStreet: string;
  addressBuilding: string;
  addressFlat: string;
  socialStatus: RadioValue<SocialStatuses, string>;
  avgIncomeBefore: number;
  avgIncomeAfter: number;
  family: {
    data: Family[];
    score: number;
  };
  hasEstate: RadioValue<Question, any>;
  estateRegion: string;
  estateCity: string;
  estateStreet: string;
  estateTerritory: RadioValue<EstateTerritory, any>;
  estateDamage: RadioValue<Damage, any>;
  useHelps: RadioValue<QuestionHelps, string>;
  readyToSupply: RadioValue<QuestionSupply, string>;
  injured: RadioValue<QuestionInjured, any>;
  pregnant: {
    key: string | undefined;
  };
  singleParent: RadioValue<QuestionSingleParent, any>;
  disabledMember: RadioValue<DisabledMember, ChoosenMember>;
  illegitimate: RadioValue<IllegitimateMember, ChoosenMember>;
  diseases: RadioValue<DiseasesMember, ChoosenMember>;
  violence: {
    key: string | undefined;
    score?: number;
  };
  position: RadioValue<Professions, any>;
  hugPosition: RadioValue<HugPosition, Professions>;
  familyPosition: RadioValue<PositionMember, ChoosenMember>;
  hugFamilyPosition: RadioValue<HugPositionMembers, ChoosenMember>;
  toBeEmployed: RadioValue<ToBeEmployed, any>;
  toBeEmployedMembers: RadioValue<ToBeEmployed, any>;
  patronage: string | undefined;
  additionalMessage: string;
}

export interface FormFieldValues {
  data: FormFields;
  documents: FormFieldsDocuments;
}

export const initialValues: FormFieldValues = {
  data: {
    addressRegion: '',
    addressSettlement: '',
    addressStreet: '',
    addressBuilding: '',
    addressFlat: '',
    socialStatus: {
      key: '',
      value: '',
    },
    avgIncomeAfter: 0,
    avgIncomeBefore: 0,
    family: {
      data: [],
      score: 0,
    },
    estateCity: '',
    estateRegion: '',
    estateStreet: '',
    estateTerritory: {
      key: '',
    },
    hasEstate: {
      key: '',
    },
    estateDamage: {
      key: '',
    },
    useHelps: {
      key: '',
      value: '',
    },
    readyToSupply: {
      key: '',
      value: '',
    },
    injured: {
      key: '',
      value: [],
    },
    pregnant: {
      key: undefined,
    },
    singleParent: {
      key: '',
      value: '',
    },
    disabledMember: {
      key: '',
      value: {
        name: '',
        value: '',
      },
    },
    illegitimate: {
      key: '',
      value: {
        name: '',
        value: '',
      },
    },
    diseases: {
      key: '',
      value: {
        name: '',
        value: '',
      },
    },
    violence: {
      key: '',
    },
    position: {
      key: '',
    },
    hugPosition: {
      key: '',
      value: undefined,
    },
    familyPosition: {
      key: '',
      value: {
        name: '',
        value: '',
      },
    },
    hugFamilyPosition: {
      key: '',
      value: {
        name: '',
        value: '',
      },
    },
    toBeEmployed: {
      key: '',
    },
    toBeEmployedMembers: {
      key: '',
    },
    patronage: undefined,
    additionalMessage: '',
  },
  documents: {
    pib: [],
    rnokpp: [],
    avgIncomeAfter: [],
    avgIncomeBefore: [],
    family: [],
    pregnant: [],
    violence: [],
    hasEstate: [],
    estateDamage: [],
    injured: [],
    singleParent: [],
    disabledMember: [],
    illegitimate: [],
    diseases: [],
    toBeEmployed: [],
    position: [],
    familyPosition: [],
    hugPosition: [],
    hugFamilyPosition: [],
    toBeEmployedMembers: [],
  },
};

export const getEnumOptions = (items: Record<string, any>) =>
  Object.values(items).map((item) => ({ label: item, value: item }));
