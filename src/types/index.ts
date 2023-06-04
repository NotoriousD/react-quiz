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

export interface FormFields {
  pib: Blob[];
  rnokpp: Blob[];
  addressRegion: string;
  addressSettlement: string;
  addressStreet: string;
  addressBuilding: string;
  addressFlat: string;
  avgIncome: Blob[];
  family: {
    data: Family[];
    documents: Blob[];
  };
  hasEstate: RadioValue<Question>;
  typeEstate: RadioValue<EstateType>;
  estateRegion: string;
  estateCity: string;
  estateStreet: string;
  estateTerritory: EstateTerritory | undefined;
  estateDamage: RadioValue<Damage>;
  useHelps: RadioValue<Question>;
  readyToSupply: RadioValue<Question>;
  injured: RadioValue<QuestionInjured>;
  pregnant: {
    key: string | undefined;
    value: Blob[];
  };
  singleParent: RadioValue<QuestionSingleParent>;
  disabledMember: RadioValue<DisabledMember>;
  illegitimate: RadioValue<IllegitimateMember>;
  diseases: RadioValue<DiseasesMember>;
  violence: {
    key: string | undefined;
    value: Blob[];
  };
  position: RadioValue<PositionMember>;
  toBeEmployed: RadioValue<ToBeEmployedMember>;
  patronage: string | undefined;
  additionalMessage: string;
}

export const initialValues: FormFields = {
  pib: [],
  rnokpp: [],
  addressRegion: '',
  addressSettlement: '',
  addressStreet: '',
  addressBuilding: '',
  addressFlat: '',
  avgIncome: [],
  family: {
    data: [],
    documents: [],
  },
  estateCity: '',
  estateRegion: '',
  estateStreet: '',
  estateTerritory: undefined,
  hasEstate: {
    key: '',
    document: [],
  },
  typeEstate: {
    key: '',
    value: '',
  },
  estateDamage: {
    key: '',
    value: '',
    document: [],
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
    document: [],
  },
  pregnant: {
    key: undefined,
    value: [],
  },
  singleParent: {
    key: '',
    value: '',
    document: [],
  },
  disabledMember: {
    key: '',
    value: '',
  },
  illegitimate: {
    key: '',
    value: '',
    document: [],
  },
  diseases: {
    key: '',
    value: '',
    document: [],
  },
  violence: {
    key: '',
    value: [],
  },
  position: {
    key: '',
    value: [],
    document: [],
  },
  toBeEmployed: {
    key: '',
    value: [],
  },
  patronage: undefined,
  additionalMessage: '',
};

export const getEnumOptions = (items: Record<string, any>) =>
  Object.values(items).map((item) => ({ label: item, value: item }));
