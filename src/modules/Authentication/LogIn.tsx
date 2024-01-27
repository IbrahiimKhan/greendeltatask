import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {Box, Input, Text, Button, StatusBar} from 'native-base';

// Login schema for validation
const LoginSchema = yup.object().shape({
  username: yup.string().min(3).required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      '  Must Contain  One Special Case Character',
    ),
});

const Login = () => {
  const navigation = useNavigation();
  const handleLogin = values => {
    navigation.navigate('EmployeeList');
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'#fefefe'} barStyle={'dark-content'} />
      <Box mx={'5'}>
        <Box alignItems={'center'} mt={'5'}>
          <Text font>Login Screen</Text>
        </Box>
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({handleSubmit}) => (
            <View>
              {/* Use useField hook to get the necessary props */}
              <Field name="username">
                {({field, meta}) => (
                  <>
                    <Input
                      my={'3'}
                      placeholder="Username"
                      onChangeText={field.onChange('username')}
                      onBlur={field.onBlur('username')}
                      value={field.value}
                    />
                    {meta.touched && meta.error && (
                      <Text color={'red.400'}>{meta.error}</Text>
                    )}
                  </>
                )}
              </Field>

              <Field name="password">
                {({field, meta}) => (
                  <>
                    <Input
                      my={'3'}
                      secureTextEntry
                      placeholder="Password"
                      onChangeText={field.onChange('password')}
                      onBlur={field.onBlur('password')}
                      value={field.value}
                    />
                    {meta.touched && meta.error && (
                      <Text color={'red.400'}>{meta.error}</Text>
                    )}
                  </>
                )}
              </Field>

              <Button onPress={() => handleSubmit()}>Login</Button>
            </View>
          )}
        </Formik>
      </Box>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
