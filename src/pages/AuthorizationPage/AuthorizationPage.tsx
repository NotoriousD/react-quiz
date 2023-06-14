import React, { useEffect, useCallback, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from 'store';
import { selectAuthData } from 'store/auth/selectors';
import { authorization } from 'store/auth/thunk';
import { AuthirizationStatuses, statuses } from 'types';

import { useWindow } from 'hooks/useWindow';

import { Loader } from 'components/Loader';

import css from './authorization.module.scss';

export const AuthorizationPage: React.FC = () => {
  const { status, deepLink, error } = useAppSelector(selectAuthData);
  const [isUrlUsed, setIsUrlUsed] = useState<boolean>(false);
  const { isMobile } = useWindow();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenLink = useCallback(() => {
    setIsUrlUsed(true);
    if (isMobile && deepLink) {
      window.open(`diia.app://${deepLink.replace('https://', '')}`, '_system');
    }
  }, [isMobile, deepLink]);

  const handleGenerateNewLink = async () => {
    dispatch(authorization());
    if (isMobile && deepLink) {
      setIsUrlUsed(false);
    }
  };

  useEffect(() => {
    if (status === AuthirizationStatuses.Done) {
      navigate('/form/1');
    }
  }, [status, navigate]);

  useEffect(() => {
    dispatch(authorization());
  }, []);

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  return (
    <div className={css.root}>
      {!isMobile && deepLink && (
        <div className={css.container}>
          <div className={css.title}>
            Відскануйте QR через додаток Дія та пройдіть верифікацію
          </div>
          <div className={css.qr}>
            <QRCode value={deepLink} />
          </div>
          {status === AuthirizationStatuses.Initialized ||
            (status === AuthirizationStatuses.Processing && <Loader />)}
          {!!status && statuses[status]}
          <Button
            variant="contained"
            className={css.btn}
            size="small"
            type="button"
            onClick={handleGenerateNewLink}
          >
            Сгенерувати новий QR code
          </Button>
        </div>
      )}
      {isMobile && deepLink && (
        <div className={css.container}>
          <div className={css.title}>
            Пройдіть верефікацію через додаток Дія
          </div>
          <div className={css.btnWrapper}>
            <Button
              variant="contained"
              className={css.btn}
              size="small"
              type="button"
              onClick={handleOpenLink}
              disabled={isUrlUsed}
            >
              Перейти до додатку Дія
            </Button>
            <Button
              variant="outlined"
              className={css.btn}
              size="small"
              type="button"
              onClick={handleGenerateNewLink}
            >
              Сгенерувати нове посилання
            </Button>
          </div>
          {!!status && statuses[status]}
          {status === AuthirizationStatuses.Initialized ||
            (status === AuthirizationStatuses.Processing && <Loader />)}
        </div>
      )}
    </div>
  );
};
