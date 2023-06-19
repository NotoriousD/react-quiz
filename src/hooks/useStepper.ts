import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const useStepper = () => {
  const { step } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!step || Number(step) > 5) {
      navigate('/form/1');
    }
  }, [step, navigate]);

  const goNextStep = useCallback(() => {
    navigate(`/form/${Number(step) + 1}`);
  }, [step, navigate]);

  const goPrevStep = useCallback(() => {
    navigate(`/form/${Number(step) - 1}`);
  }, [step, navigate]);

  return {
    step: Number(step) || 1,
    goNextStep,
    goPrevStep,
  };
};
