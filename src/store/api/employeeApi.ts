import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummy.restapiexample.com/api/v1/',
  }),
  endpoints: builder => ({
    getEmployees: builder.query({
      query: () => 'employees',
    }),
    createEmployee: builder.mutation({
      query: employeeData => ({
        url: 'create',
        method: 'POST',
        body: employeeData,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({id, ...employeeData}) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: employeeData,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
