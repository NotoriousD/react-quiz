import { API } from 'api/API';
import { AppDispatch, AppThunk } from 'store';
import { setAuthData, setIsAuth, setIsSubmitting, setStatus } from './slice';
import { AuthirizationStatuses, FormFieldValues, FormFields } from 'types';

export const authorization = (): AppThunk => async (dispatch: AppDispatch) => {
  const response = await API.fetchDeepLink();
  console.log(response);
  if (response) {
    dispatch(setAuthData(response));
  }
};

export const fetchAuthStatus =
  (): AppThunk => async (dispatch: AppDispatch, getState) => {
    const { otp, requestId } = getState().auth;
    if (otp && requestId) {
      const response = await API.getActialStatus({ otp, requestId });
      if (response) {
        dispatch(setStatus(response.status as AuthirizationStatuses));
        if (response.status === AuthirizationStatuses.Done) {
          dispatch(setIsAuth());
        }
      }
    }
  };

export const submitQuestionnarie =
  (data: FormFields): AppThunk =>
  async (dispatch: AppDispatch, getState) => {
    const { requestId } = getState().auth;
    dispatch(setIsSubmitting(true));
    if (requestId) {
      console.log('req');
      const response = await API.sendQuestionnarie(data, requestId);

      if (response.data) {
        dispatch(setIsSubmitting(false));
        return response.data;
      }
    }
  };
