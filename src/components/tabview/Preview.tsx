import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Box, Text, Spinner, Button} from 'native-base';
import {useCreateEmployeeMutation} from '../../store/api/employeeApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {setBasicData, setSkillData} from '../../store/slice/employeeSlice';

interface RootState {
  employee: {
    skills: Record<string, string>;
    basic: Record<string, string>;
  };
}
interface PreviewProps {
  setIndex: any;
}

const Preview: React.FC<PreviewProps> = ({setIndex}) => {
  //states & varaibles

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const skillsData = useSelector((state: RootState) => state.employee.skills);
  const basicData = useSelector((state: RootState) => state.employee.basic);
  const [createEmployee, {isLoading, isError, error}] =
    useCreateEmployeeMutation();

  //handle employee create
  const handleCreateEmployee = async () => {
    try {
      if (!basicData) {
        Toast.show({type: 'error', text1: 'Please Fill Baisc Info'});
        setIndex(0);
        return;
      }
      if (!skillsData) {
        Toast.show({type: 'error', text1: 'Please Fill Skill Info'});
        setIndex(1);
        return;
      }
      await createEmployee({...basicData, ...skillsData});
      Toast.show({type: 'success', text1: 'Employee Added'});
      dispatch(setBasicData(null));
      dispatch(setSkillData(null));

      navigation.navigate('EmployeeList');
    } catch (err) {
      // Handle error
      console.log('employee creation error', err);
    }
  };
  return (
    <Box flex={1} mx={'5'} my={'5'}>
      <Box flex={1} justifyContent={'space-between'}>
        <Box>
          {basicData && (
            <Box
              my={'2'}
              shadow={2}
              backgroundColor={'coolGray.100'}
              width={'100%'}
              p={'5'}
              borderRadius={'2xl'}>
              <Text textAlign="center" fontWeight={'bold'} fontSize={'2xl'}>
                Basic Information
              </Text>
              <Text>
                <Text fontWeight={'bold'}>Name:</Text> {basicData?.firstName}{' '}
                {basicData?.lastName}
              </Text>

              <Text>
                <Text fontWeight={'bold'}> Date Of Birth : </Text>
                {basicData?.dob}
              </Text>
              <Text>
                <Text fontWeight={'bold'}> Gender : </Text>
                {basicData?.gender}
              </Text>
              <Box />
            </Box>
          )}
          {skillsData && (
            <Box
              my={'2'}
              shadow={2}
              backgroundColor={'coolGray.100'}
              width={'100%'}
              p={'5'}
              borderRadius={'2xl'}>
              <Text textAlign="center" fontWeight={'bold'} fontSize={'2xl'}>
                Skills
              </Text>
              <Text>
                <Text fontWeight={'bold'}>Skill Name:</Text>{' '}
                {skillsData?.skillName}
              </Text>
              <Text>
                {' '}
                <Text fontWeight={'bold'}>Total Experience: </Text>
                {skillsData?.experience} year
              </Text>
              <Text>
                {' '}
                <Text fontWeight={'bold'}>Skill Level: </Text>
                {skillsData?.skillLevel}
              </Text>
              <Box />
            </Box>
          )}
        </Box>
        <Button onPress={() => handleCreateEmployee()}>Add Employee</Button>
      </Box>
    </Box>
  );
};

export default Preview;
