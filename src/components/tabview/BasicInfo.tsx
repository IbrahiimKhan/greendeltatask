import React, {useState} from 'react';
import {View, Text, Button, Radio, Input, Box} from 'native-base';
import {Formik, Field, FormikProps} from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setBasicData} from '../../store/slice/employeeSlice';
import moment from 'moment';
import Toast from 'react-native-toast-message';

//interfaces
interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
}
interface RootState {
  employee: {
    skills: Record<string, string>;
    basic: Record<string, string>;
  };
}

interface BasicInfoProps {
  setIndex: any;
}

const BasicInfo: React.FC<BasicInfoProps> = ({setIndex}) => {
  //states & variables
  const dispatch = useDispatch();
  const [dob, setDob] = useState('');
  const skillsData = useSelector((state: RootState) => state.employee.skills);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //form validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string(),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone must be 11 digits')
      .required('Phone is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const handleSubmit = (values: FormValues) => {
    const basicData = {...values, dob};
    const yesterday = moment().add(-1, 'days').format('YYYY/M/D');
    const today = moment().format('YYYY/M/D');
    const isDateMatch = dob === yesterday || dob === today;
    if (!isDateMatch) {
      Toast.show({type: 'error', text1: 'Invalid Date!'});
      return;
    } else {
      dispatch(setBasicData(basicData));
      if (skillsData) {
        setIndex(2);
      } else {
        setIndex(1);
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //handle date selection

  const handleConfirm = (date: Date) => {
    const selectedDate = moment(date).format('YYYY/M/D');
    setDob(selectedDate);
    hideDatePicker();
  };

  return (
    <Box px={'5'} flex={1}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          gender: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }: FormikProps<FormValues>) => (
          <View flex={1} justifyContent={'space-between'}>
            <Box>
              <Field name="firstName">
                {({field}) => (
                  <>
                    <Input
                      my={'2'}
                      placeholder="First Name"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text color={'red.400'}>{errors.firstName}</Text>
                    )}
                  </>
                )}
              </Field>

              <Field name="lastName">
                {({field}) => (
                  <Input
                    my={'2'}
                    placeholder="Last Name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                )}
              </Field>

              <View my={'2'}>
                <Text mb={'2'}>Date of Birth: {dob}</Text>
                <Button onPress={() => showDatePicker()}>
                  Select Date of Birth
                </Button>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>

              <Field name="phone">
                {({field}) => (
                  <>
                    <Input
                      my={'2'}
                      placeholder="Phone"
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                    {touched.phone && errors.phone && (
                      <Text color={'red.400'}>{errors.phone}</Text>
                    )}
                  </>
                )}
              </Field>

              <Field name="gender">
                {({field}) => (
                  <>
                    <Radio.Group
                      my={'2'}
                      name="gender"
                      value={values.gender}
                      onChange={value => setFieldValue('gender', value)}>
                      <Text>Gender:</Text>
                      <Radio value="male" my={1}>
                        Male
                      </Radio>
                      <Radio value="female" my={1}>
                        Female
                      </Radio>
                      <Radio value="other" my={1}>
                        Other
                      </Radio>
                    </Radio.Group>
                    {touched.gender && errors.gender && (
                      <Text color={'red.400'}>{errors.gender}</Text>
                    )}
                  </>
                )}
              </Field>
            </Box>

            <Button mb={'5'} onPress={handleSubmit}>
              Next
            </Button>
          </View>
        )}
      </Formik>
    </Box>
  );
};

export default BasicInfo;
