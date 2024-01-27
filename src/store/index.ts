import {configureStore} from '@reduxjs/toolkit';
import employeeSlice from './slice/employeeSlice';
import {employeeApi} from './api/employeeApi';

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});
