import React from 'react';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';

import { FormFieldValues, initialValues } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { useStepper } from 'hooks/useStepper';

import { SecondStep } from 'components/SecondStep';
import { FirstStep } from 'components/FirstStep';
import { ThirdStep } from 'components/ThirdStep';
import { FourStep } from 'components/FourStep';
import { FiveStep } from 'components/FiveStep';
import { Header } from 'components/Header';

import 'styles/main.scss';
import css from 'styles/styles.module.scss';
import fadeTransition from 'styles/fade.module.scss';
import { submitQuestionnarie } from 'store/auth/thunk';
import { selectAuthData } from 'store/auth/selectors';

export const QuizPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { requestId } = useAppSelector(selectAuthData);
  const { getValues, setValue } = useForm<FormFieldValues>({
    defaultValues: initialValues,
  });

  const { step: currentStep, goNextStep, goPrevStep } = useStepper();

  const handleChangeStep = (data: Partial<FormFieldValues>) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof FormFieldValues, value);
    });
    goNextStep();
  };

  const handleSubmitForm = async (data: FormFieldValues) => {
    const body = {
      ...getValues().data,
      ...data,
    };
    if (requestId) {
      
      dispatch(submitQuestionnarie(body));
    }
  };

  const renderFields = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <CSSTransition
            in={currentStep === 1}
            appear
            enter
            exit
            timeout={200}
            classNames={fadeTransition}
          >
            <FirstStep values={getValues()} onSubmitStep={handleChangeStep} />
          </CSSTransition>
        );
      case 2:
        return (
          <CSSTransition
            in={currentStep === 2}
            appear
            enter
            exit
            timeout={200}
            classNames={fadeTransition}
          >
            <SecondStep
              values={getValues()}
              onSubmitStep={handleChangeStep}
              onBack={goPrevStep}
            />
          </CSSTransition>
        );
      case 3:
        return (
          <CSSTransition
            in={currentStep === 3}
            appear
            enter
            exit
            timeout={200}
            classNames={fadeTransition}
          >
            <ThirdStep
              values={getValues()}
              onSubmitStep={handleChangeStep}
              onBack={goPrevStep}
            />
          </CSSTransition>
        );
      case 4:
        return (
          <CSSTransition
            in={currentStep === 4}
            appear
            enter
            exit
            timeout={200}
            classNames={fadeTransition}
          >
            <FourStep
              values={getValues()}
              onSubmitStep={handleChangeStep}
              onBack={goPrevStep}
            />
          </CSSTransition>
        );
      case 5:
        return (
          <CSSTransition
            in={currentStep === 5}
            appear
            enter
            exit
            timeout={200}
            classNames={fadeTransition}
          >
            <FiveStep
              values={getValues()}
              onSubmitStep={handleSubmitForm}
              onBack={goPrevStep}
            />
          </CSSTransition>
        );
    }

    return null;
  };

  return (
    <div className={css.root}>
      <Header step={currentStep} totalSteps={5} />
      <div className={css.container}>{renderFields(currentStep)}</div>
    </div>
  );
};
