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
  Occupied24 = 'Окупована територія з 24 лютого 2022 року',
  Occupied14 = 'Окупована територія з 2014 року',
  Deoccupied = 'Деокупована територія',
  Active = 'Зони ведення активних бойових дій',
  NearActive = 'Підконтрольна територія України, яка наближена до зони ведення бойових дій',
  Controlled = 'Підконтрольна територія України',
}

export enum Damage {
  NoDamage = 'Неушкоджене',
  Damaged12 = 'Пошкоджене (1–2  ступінь)',
  Damaged3 = 'Пошкоджене (3 ступінь)',
  Destroyed = 'Знищене повністю',
  Sold = 'Продано (вказати суму)',
  Unknown = 'Статус невідомий',
  Restored = 'Відновлено (вказати коли/через яку установу/організацію)',
}
