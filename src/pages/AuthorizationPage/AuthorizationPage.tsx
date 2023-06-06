import React, { useEffect, useContext, useCallback } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { AuthContext } from 'context/AuthContext';
import { WebSocketContext, WebSocketStatus } from 'context/WebSocketContext';
import { useWindow } from 'hooks/useWindow';

import { Loader } from 'components/Loader';

import css from './authorization.module.scss';

export const AuthorizationPage: React.FC = () => {
  const { deepLink, error } = useContext(AuthContext);
  const { status, isAuth } = useContext(WebSocketContext);
  const { isMobile } = useWindow();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === WebSocketStatus.Done) {
      navigate('/form/1');
    }
  }, [status, navigate]);

  const handleOpenLink = useCallback(() => {
    if (isMobile && deepLink) {
      window.open(`diia.app://${deepLink.replace('https://', '')}`, '_system');
    }
  }, [isMobile, deepLink]);

  if (error) {
    return <div className={css.root}>{error}</div>;
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
          {status === WebSocketStatus.Initialized ||
            (status === WebSocketStatus.Processing && <Loader />)}
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
            >
              Перейти до додатку Дія
            </Button>
          </div>
          {status}
          {isAuth ? 'auth' : 'notAuth'}
          {status === WebSocketStatus.Initialized ||
            (status === WebSocketStatus.Processing && <Loader />)}
        </div>
      )}
    </div>
  );
};
