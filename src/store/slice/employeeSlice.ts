import {createSlice} from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    selectedEmployee: null,
    basic: null,
    skills: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setBasicData: (state, action) => {
      state.basic = action.payload;
    },
    setSkillData: (state, action) => {
      state.skills = action.payload;
  },
  },
});

export const {setEmployees, setSelectedEmployee, setBasicData, setSkillData} =
  employeeSlice.actions;
export default employeeSlice.reducer;
