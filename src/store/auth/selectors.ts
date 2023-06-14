import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../rootReducer';

const getAuthState = (store: RootState) => store.auth;

export const selectAuthData = createSelector(getAuthState, (s) => s);
