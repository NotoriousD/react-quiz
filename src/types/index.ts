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
  pibDoc?: string[];
  relationship: Relationship;
  age: number;
  socialStatus: RadioValue<SocialStatuses, any>;
  avgIncomeBefore: number;
  avgIncomeBeforeDoc?: string[];
  avgIncomeAfter: number;
  avgIncomeAfterDoc?: string[];
}

export interface ChoosenMember {
  name: string;
  value: string;
}

export interface Data {
  key?: string;
  value: {
    name: string;
    value: string;
  } | string;
  score?: number;
}

export interface Document {
  inputName: string;
  originalName: string;
  path: string;
}

export interface DocumentsResponse {
  data: Document[];
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
  vpo?: string[];
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
  pib: string;
  birthday: string | null;
  age: number;
  idNumber: string;
  issue: string;
  issueDate: string | null;
  issueCity: string;
  phone: string;
  rnokpp: string;
  vpoNumber: string;
  vpoDate: string;
  addressRegion: string;
  addressSettlement: string;
  addressStreet: string;
  addressBuilding: string;
  addressFlat: string;
  socialStatus: RadioValue<SocialStatuses, string>;
  avgIncomeBefore: {
    value: number;
    score: number;
  };
  avgIncomeAfter: {
    value: number;
    score: number;
  };
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
    pib: '',
    birthday: null,
    age: 0,
    idNumber: '',
    issue: '',
    issueDate: null,
    issueCity: '',
    phone: '',
    rnokpp: '',
    vpoNumber: '',
    vpoDate: '',
    addressRegion: '',
    addressSettlement: '',
    addressStreet: '',
    addressBuilding: '',
    addressFlat: '',
    socialStatus: {
      key: '',
      value: '',
    },
    avgIncomeAfter: {
      value: 0,
      score: 0,
    },
    avgIncomeBefore: {
      value: 0,
      score: 0,
    },
    family: {
      data: [{
        pib: '',
        pibDoc: [],
        relationship: Relationship.Father,
        age: 0,
        socialStatus: {
          key: SocialStatuses.Employee,
          value: '',
        },
        avgIncomeBefore: 0,
        avgIncomeBeforeDoc: [],
        avgIncomeAfter: 0,
        avgIncomeAfterDoc: [],
      }],
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

export const questionnaireText: Record<keyof FormFields, string> = {
  pib: "Ваше прізвище, ім'я, по батькові (ПІБ)",
  birthday: "Дата народження",
  age: "Повних років",
  idNumber: "Серія та номер паспорту/ID",
  issue: "Виданий",
  issueDate: "Дата видачі",
  issueCity: "В місті",
  phone: "Контактний номер телефону в форматі (380ХХХХХХХХХ)",
  rnokpp: "РНОКПП (ІПН)",
  vpoNumber: "Номер довідки (ВПО)",
  vpoDate: "Дата видачі (ВПО)",
  addressRegion: "Область",
  addressSettlement: "Громада/населений пункт",
  addressStreet: "Поштова адреса",
  addressBuilding: "Будинок",
  addressFlat: "Квартира",
  socialStatus: "Соціальний стан",
  avgIncomeAfter: "Сума вашого середнього місячного доходу заявника (в гривнях) після 22 лютого 2022",
  avgIncomeBefore: "Сума вашого середнього місячного доходу (в гривнях) до 22 лютого 2022",
  family: "Члени домогосподарства, що будуть проживати разом з вами",
  hasEstate: "Наявність нерухомого майна у власності заявника або одного з членів домогосподарства",
  estateTerritory: "Нерухомість розташована на території",
  estateRegion: "Область",
  estateCity: "Громада/населений пункт",
  estateStreet: "Вулиця",
  estateDamage: "Поточний статус вашого нерухомого майна",
  useHelps: "Чи використовували ви до цього часу будь-яку допомогу для вирішення житлових потреб біженців або внутрішньо переміщених осіб на території України?",
  readyToSupply: "Чи готові ви за власні кошти оплачувати послуги з постачання електроенергії та утримання прибудинкової території?",
  injured: "Чи є серед членів вашого домогосподарства особи, які внаслідок війни на території України отримали поранення, померли чи вважаються зниклими безвісти?",
  pregnant: "Чи є серед членів вашогодомогосподаства вагітні жінки?",
  singleParent: "Чи є серед членів вашого домогосподарства одинокі батьки, які самостійно утримують неповнолітніх дітей?",
  disabledMember: "Чи є серед вашого домогосподарства особи з інвалідністю",
  illegitimate: "Чи є серед членів вашого домогосподарства особи, що повністю або частково вважаються непрацездатними?",
  diseases: "Чи є серед членів вашого домогосподарства особи з тяжкими захворюваннями?",
  violence: "Чи є серед членів вашого домогосподарства особи, що постраждали від гендерно-зумовленого насильства?",
  position: "Чи маєте ви необхідні знання, яки дозволяють обіймати зазначені посади",
  hugPosition: "Чи обіймали/обіймаєте ви посаду, зазначену в списку або ви готові створити власний бізнес що дозволяє забезпечувати домогосподарство заявника",
  toBeEmployed: "Чи згодні ви займати посаду та чи готові до працевлаштування на території Новобасанської громади на зазначені вакансії чи готові створити власний бізнес, який дозволить забезпечувати своє господарство та створювати додаткові робочі місця для жителів громади",
  familyPosition: "Чи є серед членів вашого домогосподарства особи, що можуть (мають необхідні знання і досвід) обіймати зазначені посади: Сімейний лікар, Лікар-педіатр (сімейний), Нотаріус, Програміст (спеціаліст у сфері ІТ-технологій), Вчитель англійської мови, Хореограф, Механізатор, Електрик, Тренер, Юрист, Бухгалтер, ПІДПРИЄМЕЦЬ готовий працювати чи створити робочі місця (бізнес)",
  hugFamilyPosition: "Чи обіймали/обіймають вони посаду, зазначену в списку або вони готові створити власний бізнес дозволяє забезпечувати домогосподарство заявника",
  toBeEmployedMembers: "Чи є серед вказаних осіб бажаючі бути працевлаштованими за обраними спеціальностями у селі Старий Биків Ніжинського району Чернігівської області?",
  patronage: "Чи є бажання/можливість у вашого домогосодарства стати патронатною сім'єю? (Це тимчасова форма влаштування дитини у сім’ю, де термін перебування дитини не може перевищувати трьох місяців).",
  additionalMessage: "Місце для додаткової інформації, яка на думку заявника, може надати йому перевагу у відборі на надання житла в Новобасанській територіальній громаді (до 250 слів)",
}

export const getEnumOptions = (items: Record<string, any>) =>
  Object.values(items).map((item) => ({ label: item, value: item }));
