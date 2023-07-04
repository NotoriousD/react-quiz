import { Family, FormFieldValues } from 'types';
import {
  DisabledMember,
  DiseasesMember,
  HugPosition,
  HugPositionMembers,
  IllegitimateMember,
  PositionMember,
  Professions,
  QuestionInjured,
  QuestionPregnant,
  QuestionSingleParent,
  ToBeEmployed,
  ViolenceMember,
} from 'types/additional';
import { Damage, EstateTerritory, Question } from 'types/capital';

const estateTerritoryScores = {
  [EstateTerritory.Controlled]: 0,
  [EstateTerritory.Occupied14]: 5,
  [EstateTerritory.Occupied24]: 4,
};

const damageScores = {
  [Damage.NoDamage]: 0,
  [Damage.Damaged12]: 0,
  [Damage.Destroyed]: 5,
};

const illegitimateScores = {
  [IllegitimateMember.Fully]: 2,
  [IllegitimateMember.Partly]: 1,
  [IllegitimateMember.No]: 0,
};

export const computingSecondStepScores = (
  data: Family[],
  pregnant: boolean = false
) => {
  const familyLength = pregnant ? data.length + 1 : data.length;
  let scores = 0;
  let familyScore = 0;
  let avgIncomeAfter = 0;
  let avgIncomeBefore = 0;
  const { family, incomeAfter, incomeBefore, children } = data.reduce(
    (acc, member) => {
      acc.incomeAfter += member.avgIncomeAfter;
      acc.incomeBefore += member.avgIncomeBefore;
      if (member.age > 18 && member.age < 35) {
        acc.family = acc.family + 1;
      }
      if (member.age < 18) {
        acc.children = acc.children + 1;
      }
      return acc;
    },
    {
      family: 0,
      incomeAfter: 0,
      incomeBefore: 0,
      children: 0,
    }
  );

  if (family === 2 && familyLength === 2) {
    familyScore = 3;
  } else {
    switch (familyLength) {
      case 1:
        familyScore = 1;
        break;
      case 2:
        familyScore = 2;
        break;
      case 3:
        familyScore = 4;
        break;
      default:
        familyScore = 5;
        break;
    }
  }
  let childrenScore = children;
  if (pregnant) {
    let newValue = children + 1;
    childrenScore = newValue > 2 ? 2 : newValue;
  }
  familyScore += childrenScore;
  avgIncomeAfter = incomeAfter / familyLength > 9000 ? 1 : 2;
  avgIncomeBefore = incomeBefore / familyLength > 18000 ? 2 : 1;
  scores = familyScore + avgIncomeAfter + avgIncomeBefore;

  return {
    scores,
    familyScore,
    avgIncomeAfter,
    avgIncomeBefore,
    childrenCount: pregnant ? children + 1 : children,
  };
};

export const computingScores = (data: FormFieldValues) => {
  const {
    injured,
    pregnant,
    family,
    singleParent,
    disabledMember,
    illegitimate,
    diseases,
    violence,
    position,
    hugPosition,
    familyPosition,
    hugFamilyPosition,
    toBeEmployed,
    toBeEmployedMembers,
    hasEstate,
    estateTerritory,
    estateDamage,
  } = data.data;
  let totalScore = 0;
  let estateTerritoryScore = 0;
  let damageScore = 0;
  let injuredScore = 0;
  let singleParentScore = 0;
  let disabledMemberScore = 0;
  let illegitimateScore = 0;
  let diseasesScore = 0;
  let violenceScore = 0;
  let positionScore = 0;
  let hugPositionScore = 0;
  let toBeEmployedScore = 0;
  let familyPositionScore = 0;
  let hugFamilyPositionScore = 0;
  let toBeEmployedMembersScore = 0;
  const isPregnant = pregnant.key === QuestionPregnant.Yes;
  const {
    avgIncomeAfter,
    avgIncomeBefore,
    scores,
    familyScore,
    childrenCount,
  } = computingSecondStepScores(family.data, isPregnant);

  if (hasEstate.key === Question.Yes) {
    estateTerritoryScore =
      estateTerritoryScores[estateTerritory.key as EstateTerritory];
    damageScore = damageScores[estateDamage.key as Damage];
  }

  if (injured.key === QuestionInjured.Yes) {
    injuredScore = injured.value.length * 2;
  }

  if (singleParent.key === QuestionSingleParent.Yes) {
    singleParentScore = childrenCount > 3 ? 3 : childrenCount;
  }

  if (disabledMember.key === DisabledMember.Yes) {
    let member = family.data.find(
      (member) => member.pib === disabledMember.value?.name && member.age < 18
    );
    if (member) {
      disabledMemberScore = 2;
    }
  }

  if (illegitimate.key !== IllegitimateMember.No) {
    illegitimateScore =
      illegitimateScores[illegitimate.key as IllegitimateMember];
  }

  if (diseases.key === DiseasesMember.Yes) {
    diseasesScore = 2;
  }

  if (violence.key === ViolenceMember.Yes) {
    violenceScore = 1;
  }

  if (position.key !== Professions.No) {
    positionScore = 4;
  }

  if (hugPosition.key === HugPosition.Yes) {
    hugPositionScore = 4;
  }

  if (toBeEmployed.key === ToBeEmployed.Yes) {
    toBeEmployedScore = 4;
  }

  if (familyPosition.key === PositionMember.Yes) {
    familyPositionScore = 4;
  }

  if (hugFamilyPosition.key === HugPositionMembers.Yes) {
    hugFamilyPositionScore = 4;
  }

  if (toBeEmployedMembers.key === ToBeEmployed.Yes) {
    toBeEmployedMembersScore = 4;
  }

  const newData: FormFieldValues = {
    data: {
      ...data.data,
      avgIncomeAfter,
      avgIncomeBefore,
      family: {
        data: data.data.family.data,
        score: familyScore,
      },
      estateTerritory: {
        ...data.data.estateTerritory,
        score: estateTerritoryScore,
      },
      estateDamage: {
        ...data.data.estateDamage,
        score: damageScore,
      },
      injured: {
        ...data.data.injured,
        score: injuredScore,
      },
      singleParent: {
        ...data.data.singleParent,
        score: singleParentScore,
      },
      disabledMember: {
        ...data.data.disabledMember,
        score: disabledMemberScore,
      },
      illegitimate: {
        ...data.data.illegitimate,
        score: illegitimateScore,
      },
      diseases: {
        ...data.data.diseases,
        score: diseasesScore,
      },
      violence: {
        ...data.data.violence,
        score: violenceScore,
      },
      position: {
        ...data.data.position,
        score: positionScore,
      },
      hugPosition: {
        ...data.data.hugPosition,
        score: hugPositionScore,
      },
      toBeEmployed: {
        ...data.data.toBeEmployed,
        score: toBeEmployedScore,
      },
      familyPosition: {
        ...data.data.familyPosition,
        score: familyPositionScore,
      },
      hugFamilyPosition: {
        ...data.data.hugFamilyPosition,
        score: hugFamilyPositionScore,
      },
      toBeEmployedMembers: {
        ...data.data.toBeEmployedMembers,
        score: toBeEmployedMembersScore,
      },
    },
    documents: data.documents,
  };

  totalScore +=
    estateTerritoryScore +
    damageScore +
    injuredScore +
    singleParentScore +
    disabledMemberScore +
    illegitimateScore +
    diseasesScore +
    violenceScore +
    positionScore +
    hugPositionScore +
    toBeEmployedScore +
    familyPositionScore +
    hugFamilyPositionScore +
    toBeEmployedMembersScore +
    familyScore +
    avgIncomeAfter +
    avgIncomeBefore;

  return {
    newData,
    totalScore,
  };
};
