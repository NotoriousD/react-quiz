import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import css from './errorPage.module.scss';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };
  return (
    <div className={css.root}>
      <div className={css.content}>
        <div className={css.title}>404</div>
        <Button
          variant="contained"
          className={css.btn}
          type="button"
          onClick={handleRedirect}
        >
          На головну
        </Button>
      </div>
    </div>
  );
};
