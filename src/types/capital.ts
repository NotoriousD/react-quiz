export enum Capital {
  House = 'Будинок',
  Flat = 'Квартира',
  AgricultureLands = 'Землі сільськогосподарського призначення',
  CommercialEstate = 'Комерційна нерухомість',
  Other = 'Інше',
}

export interface EstateType {
  key: Capital;
  value?: string;
}

export enum Question {
  Yes = 'Так',
  No = 'Ні',
}

export enum QuestionHelps {
  Yes = 'Так (вкажіть коли, через яку організацію, в якій сумі)',
  No = 'Ні',
}

export enum QuestionSupply {
  Yes = 'Так',
  No = 'Ні (вкажіть чому)',
}

export enum EstateTerritory {
  Controlled = 'Знаходиться на території України, підконтрольній ЗСУ',
  Occupied24 = 'Знаходиться на окупованій з 24 лютого 2022 року території',
  Occupied14 = 'Знаходиться на окупованій з 2014 року території',
}

export enum Damage {
  NoDamage = 'Неушкоджене',
  Damaged12 = 'Пошкоджене (1–2  ступінь)',
  Destroyed = 'Повністю знищенно під час війни або має третю ступінь пошкодження',
}
