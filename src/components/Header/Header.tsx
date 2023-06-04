import React from 'react';

import css from './header.module.scss';

interface HeaderProps {
  totalSteps: number;
  step: number;
}

export const Header: React.FC<HeaderProps> = ({ totalSteps, step }) => {
  const coef = 100 / totalSteps;
  const getStepTItle = () => {
    switch (step) {
      case 1:
        return 'Інформація про основного заявника';
      case 2:
        return 'Інформація про членів домогосподарства, що будуть проживати разом із заявником';
      case 3:
        return 'Додаткова інформація про майновий стан';
      case 4:
        return 'Додаткова інформація про заявника та членів домогосподарства';
      case 5:
        return 'Додаткова інформація';
    }
  };
  return (
    <div className={css.root}>
      <div className={css.steps}>
        {step} / {totalSteps}
      </div>
      <div className={css.title}>{getStepTItle()}</div>
      <div className={css.stepLine}>
        <div className={css.line} style={{ width: `${step * coef}%` }} />
      </div>
    </div>
  );
};
