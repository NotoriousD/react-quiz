import React, { useEffect, useCallback, useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from 'store';
import { selectAuthData } from 'store/auth/selectors';
import { authorization } from 'store/auth/thunk';
import { AuthirizationStatuses } from 'types';
import { getMobileOperatingSystemAndRedirect } from 'helpers/detection';

import { useWindow } from 'hooks/useWindow';

import { Loader } from 'components/Loader';
import { Timer } from 'components/Timer';

import css from './authorization.module.scss';
import { Modal } from 'components/Modal';

export const AuthorizationPage: React.FC = () => {
  const { status, deepLink } = useAppSelector(selectAuthData);
  const [isUrlUsed, setIsUrlUsed] = useState<boolean>(false);
  const { isMobile } = useWindow();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const time = useRef<Date>(new Date());

  const handleOpenLink = useCallback(() => {
    setIsUrlUsed(true);
    if (isMobile && deepLink) {
      getMobileOperatingSystemAndRedirect(deepLink)
    }
  }, [isMobile, deepLink]);

  const handleGenerateNewLink = async () => {
    dispatch(authorization());
    if (isMobile && deepLink) {
      setIsUrlUsed(false);
    }
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + 179)
    time.current = newTime;
  };

  const handleGoToQuiz = () => {
    navigate('/form/1');
  }

  useEffect(() => {
    dispatch(authorization());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    time.current.setSeconds(time.current.getSeconds() + 179)
  }, []);

  return (
    <div className={css.root}>
      {status === AuthirizationStatuses.Done && (
        <Modal>
          <div className={css.modalTitle}>
            Дякуємо! Ми отримали копію довідки ВПО. Тепер потрібно заповнити анкету на участь
          </div>
          <Button
            variant="contained"
            className={css.btn}
            type="button"
            onClick={handleGoToQuiz}
          >
            Почати заповнення анкети
          </Button>
        </Modal>
      )}
      {deepLink && (
        <>
          {isMobile ? (
            <div className={css.container}>
              <div className={css.title}>
                Пройдіть верефікацію через застосунок Дія та поверніться до анкети
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
                  Перейти до застосунку Дія
                </Button>
                <Button
                  variant="outlined"
                  className={css.btn}
                  size="small"
                  type="button"
                  onClick={handleGenerateNewLink}
                >
                  Згенерувати нове посилання
                </Button>
              </div>
              {status === AuthirizationStatuses.Initialized ||
                (status === AuthirizationStatuses.Processing && <Loader />)}
            </div>
          ) : (
            <div className={css.container}>
              <div className={css.title}>
                Зчитайте QR-код сканером у застосунку Дія й пройдіть верифікацію
              </div>
              <div className={css.qr}>
                <QRCode value={deepLink} />
              </div>
              <Timer time={time.current} />
              {status === AuthirizationStatuses.Initialized ||
                (status === AuthirizationStatuses.Processing && (
                  <div>
                    <Loader />
                  </div>
                ))}
              <Button
                variant="contained"
                className={css.btn}
                size="small"
                type="button"
                onClick={handleGenerateNewLink}
              >
                Згенерувати новий QR code
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
