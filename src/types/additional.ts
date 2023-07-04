export enum QuestionInjured {
  No = 'Ні',
  Yes = 'Так* (вкажіть, будь ласка, ім’я та прізвище зниклої/постраждалої особи та зв’язок із заявником)',
}

export enum QuestionPregnant {
  No = 'Ні',
  Yes = 'Так',
}

export enum QuestionSingleParent {
  No = 'Ні',
  Yes = 'Так* (вкажіть, будь ласка, ім’я та прізвище зниклої/постраждалої особи та зв’язок із заявником)',
}

export enum QuestionAddSingleParent {
  Unknown = 'Невстановлене батьківство дитини/дітей',
  Splitted = 'Розлучення батьків',
  Death = 'Смерть другого з батьків',
}

export enum DisabledMember {
  No = 'Ні',
  Yes = 'Так (вкажіть, будь ласка, хто саме з членів домогосподарства і групу інвалідності)*',
}

export enum IllegitimateMember {
  No = 'Ні',
  Partly = 'Наявні особи з частковою працездатністю (вкажіть, будь ласка, хто і причину часткової працездатності)*',
  Fully = 'Наявні особи, що повністю втратили працездатність (вкажіть, будь ласка, хто і причину втрати працездатності)*',
}

export enum DiseasesMember {
  No = 'Ні',
  Yes = 'Так* (вкажіть, будь ласка, хто саме і вид захворювання)',
}

export enum ViolenceMember {
  No = 'Ні',
  Yes = 'Так',
}

export enum PositionMember {
  No = 'Ні',
  Yes = 'Так (вкажіть, будь ласка, хто саме і вид діяльності)',
}

export enum ToBeEmployedMember {
  No = 'Ні',
  Yes = 'Так (вкажіть, будь ласка, хто саме і вид діяльності)',
}

export enum ToBeEmployed {
  No = 'Ні, не готовий',
  Yes = 'Так, готовий',
  Ready = 'Готовий створити бізнес',
}

export enum PatronageFamily {
  Yes = 'Так',
  No = 'Ні',
}

export enum Professions {
  No = 'Немає',
  FamilyDoctor = 'Сімейний лікар',
  Pediatrician = 'ЛІкар-педіатр (сімейний)',
  Notary = 'Нотаріус',
  Programmer = 'Програміст (спеціаліст у сфері ІТ-технологій)',
  EnglishTeacher = 'Вчитель англійської мови',
  Choreographer = 'Хореограф',
  Mechanic = 'Механізатор',
  Coach = 'Тренер',
  Lawyer = 'Юрист',
  Accounter = 'Бухгалтер',
  Entrepreneur = 'ПІДПРИЄМЕЦЬ (готовий працювати чи створити робочі місця)',
}

export enum DisableGroups {
  First = 'I (перша)',
  Second = 'II (друга)',
  Third = 'III (третя)',
}

export enum HugPosition {
  No = 'Ні, не обіймав/обіймаю',
  Yes = 'Так, обіймав/обіймаю',
}

export enum HugPositionMembers {
  No = 'Ні, не обіймали/обіймають',
  Yes = 'Так, обіймали/обіймають',
}
