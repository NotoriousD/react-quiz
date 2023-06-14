import { combineReducers } from '@reduxjs/toolkit';

import { auth } from 'store/auth/slice';

export const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
