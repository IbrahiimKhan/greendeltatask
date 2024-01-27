import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Box, Button, Input, FormControl, VStack, Text} from 'native-base';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useUpdateEmployeeMutation} from '../../store/api/employeeApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const EditEmployee = ({route}: any) => {
  //state & variable

  const navigation = useNavigation();
  const [updateEmployee, {isLoading, isError, error}] =
    useUpdateEmployeeMutation();
  const {user} = route.params;

  //validate input
  const validationSchema = yup.object().shape({
    employee_name: yup.string().required('Employee Name is required'),
    employee_age: yup.number().required('Employee Age is required'),
    employee_salary: yup.number().required('Employee Salary is required'),
  });

  //handle form
  const formik = useFormik({
    initialValues: {
      employee_name: user.employee_name,
      employee_age: String(user.employee_age),
      employee_salary: String(user.employee_salary),
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        await updateEmployee({id: user.id, ...values});
        Toast.show({type: 'success', text1: 'Successfully updated'});
        navigation.navigate('EmployeeList');
      } catch (error) {
        Toast.show({type: 'error', text1: 'Failed to update employee'});
      }
    },
  });

  return (
    <>
      <SafeAreaView style={styles.ScreenContainer}>
        <StatusBar backgroundColor={'#fefefe'} barStyle={'dark-content'} />
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/arrow.webp')}
            style={styles.Image}
          />
        </TouchableOpacity>
        <Box p={4}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Edit Employee
          </Text>
          <VStack space={1}>
            <FormControl>
              <FormControl.Label>Employee Name</FormControl.Label>
              <Input
                value={formik.values.employee_name}
                onChangeText={formik.handleChange('employee_name')}
                onBlur={formik.handleBlur('employee_name')}
              />
              <Text style={styles.errorText}>
                {formik.touched.employee_name && formik.errors.employee_name}
              </Text>
            </FormControl>

            <FormControl>
              <FormControl.Label>Employee Age</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={formik.values.employee_age}
                onChangeText={formik.handleChange('employee_age')}
                onBlur={formik.handleBlur('employee_age')}
              />
              <Text style={styles.errorText}>
                {formik.touched.employee_age && formik.errors.employee_age}
              </Text>
            </FormControl>

            <FormControl>
              <FormControl.Label>Employee Salary</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={formik.values.employee_salary}
                onChangeText={formik.handleChange('employee_salary')}
                onBlur={formik.handleBlur('employee_salary')}
              />
              <Text style={styles.errorText}>
                {formik.touched.employee_salary &&
                  formik.errors.employee_salary}
              </Text>
            </FormControl>

            <Button onPress={formik.handleSubmit}>Submit</Button>
          </VStack>
        </Box>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  Image: {
    width: 20,
    height: 20,
  },
  Button: {
    width: 20,
    height: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});

export default EditEmployee;
