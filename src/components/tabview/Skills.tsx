// Import necessary components from native-base
import {StyleSheet, Text, View} from 'react-native';
import {Formik, Field} from 'formik';
import {Input, Button, Select, Box} from 'native-base';
import * as Yup from 'yup';
import {FC} from 'react';
import {setSkillData} from '../../store/slice/employeeSlice';
import {useDispatch, useSelector} from 'react-redux';

interface SkillsProps {
  setIndex: any;
}

//skill schema validation
const skillsSchema = Yup.object().shape({
  skillName: Yup.string().required('Skill Name is required'),
  experience: Yup.number().required('Experience in Years is required'),
  skillLevel: Yup.string().required('Skill Level is required'),
});

const Skills: FC<SkillsProps> = ({setIndex}) => {
  //variable & states
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    dispatch(setSkillData({...values}));
    setIndex(2);
  };
  return (
    <Box mx={'5'} flex={1}>
      <Formik
        initialValues={{skillName: '', experience: '', skillLevel: ''}}
        validationSchema={skillsSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box flex={1} justifyContent={'space-between'}>
            <Box>
              <Field name="skillName">
                {({field}) => (
                  <>
                    <Input
                      my={'2'}
                      placeholder="Skill Name"
                      onChangeText={handleChange('skillName')}
                      onBlur={handleBlur('skillName')}
                      value={values.skillName}
                    />
                    {touched.skillName && errors.skillName && (
                      <Text style={styles.error}>{errors.skillName}</Text>
                    )}
                  </>
                )}
              </Field>

              <Field name="experience">
                {({field}) => (
                  <>
                    <Input
                      my={'2'}
                      placeholder="Experience in Years"
                      keyboardType="numeric"
                      onChangeText={handleChange('experience')}
                      onBlur={handleBlur('experience')}
                      value={values.experience}
                    />
                    {touched.experience && errors.experience && (
                      <Text style={styles.error}>{errors.experience}</Text>
                    )}
                  </>
                )}
              </Field>

              <Field name="skillLevel">
                {({field}) => (
                  <>
                    <Select
                      my={'2'}
                      placeholder="Skill Level"
                      selectedValue={values.skillLevel}
                      onValueChange={handleChange('skillLevel')}>
                      <Select.Item label="Beginner" value="Beginner" />
                      <Select.Item label="Intermediate" value="Intermediate" />
                      <Select.Item label="Advanced" value="Advanced" />
                    </Select>
                    {touched.skillLevel && errors.skillLevel && (
                      <Text style={styles.error}>{errors.skillLevel}</Text>
                    )}
                  </>
                )}
              </Field>
            </Box>

            <Button mb={'5'} onPress={handleSubmit} style={styles.button}>
              Next
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
});

export default Skills;
