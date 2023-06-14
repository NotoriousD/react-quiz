import { Relationship } from './relationship';
import { SocialStatuses } from './socialStatus';
import { EstateType, Question, EstateTerritory, Damage } from './capital';
import { RadioValue } from './radio';
import {
  DisabledMember,
  DiseasesMember,
  IllegitimateMember,
  PositionMember,
  QuestionInjured,
  QuestionSingleParent,
  ToBeEmployedMember,
} from './additional';

export interface Family {
  pib: string;
  relationship: Relationship;
  age: number | undefined;
  socialStatus: RadioValue<SocialStatuses>;
  avgIncome: number | undefined;
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
  avgIncome: string[];
  family: string[];
  pregnant: string[];
  violence: string[];
  hasEstate: string[];
  estateDamage: string[];
  injured: string[];
  singleParent: string[];
  disabledMember: string[];
  illegitimate: string[];
  diseases: string[];
  position: string[];
}

export interface FormFields {
  addressRegion: string;
  addressSettlement: string;
  addressStreet: string;
  addressBuilding: string;
  addressFlat: string;
  family: Family[];
  hasEstate: RadioValue<Question>;
  typeEstate: RadioValue<EstateType>;
  estateRegion: string;
  estateCity: string;
  estateStreet: string;
  estateTerritory: RadioValue<EstateTerritory>;
  estateDamage: RadioValue<Damage>;
  useHelps: RadioValue<Question>;
  readyToSupply: RadioValue<Question>;
  injured: RadioValue<QuestionInjured>;
  pregnant: {
    key: string | undefined;
  };
  singleParent: RadioValue<QuestionSingleParent>;
  disabledMember: RadioValue<DisabledMember>;
  illegitimate: RadioValue<IllegitimateMember>;
  diseases: RadioValue<DiseasesMember>;
  violence: {
    key: string | undefined;
  };
  position: RadioValue<PositionMember>;
  toBeEmployed: RadioValue<ToBeEmployedMember>;
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
    family: [],
    estateCity: '',
    estateRegion: '',
    estateStreet: '',
    estateTerritory: {
      key: '',
    },
    hasEstate: {
      key: '',
    },
    typeEstate: {
      key: '',
      value: '',
    },
    estateDamage: {
      key: '',
      value: '',
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
      value: '',
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
      value: '',
    },
    illegitimate: {
      key: '',
      value: '',
    },
    diseases: {
      key: '',
      value: '',
    },
    violence: {
      key: '',
    },
    position: {
      key: '',
      value: [],
    },
    toBeEmployed: {
      key: '',
      value: [],
    },
    patronage: undefined,
    additionalMessage: '',
  },
  documents: {
    pib: [],
    rnokpp: [],
    avgIncome: [],
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
    position: [],
  },
};

export const getEnumOptions = (items: Record<string, any>) =>
  Object.values(items).map((item) => ({ label: item, value: item }));
