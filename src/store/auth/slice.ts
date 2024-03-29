import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from 'api/API';
import { AuthirizationStatuses } from 'types';

const AUTH_FEATURE_KEY = 'auth';

interface AuthState {
  error: string | null;
  deepLink: string | null;
  otp: string | null;
  requestId: string | null;
  isAuth: boolean;
  status: AuthirizationStatuses | null;
  isSumbitting: boolean;
  isSubmitted: boolean;
}

const initialState: AuthState = {
  error: null,
  deepLink: null,
  otp: null,
  requestId: null,
  isAuth: false,
  status: null,
  isSumbitting: false,
  isSubmitted: false,
};

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      const { deepLink, otp, requestId } = action.payload;
      state.deepLink = deepLink;
      state.otp = otp;
      state.requestId = requestId;
    },
    setIsAuth: (state) => {
      state.isAuth = true;
    },
    setRequestId: (state, action: PayloadAction<string>) => {
      state.requestId = action.payload;
    },
    setStatus: (state, action: PayloadAction<AuthirizationStatuses>) => {
      state.status = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSumbitting = action.payload;
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
  },
});

export const {
  setAuthData,
  setIsAuth,
  setRequestId,
  setStatus,
  setIsSubmitting,
  setIsSubmitted,
} = authSlice.actions;

export const auth = authSlice.reducer;
