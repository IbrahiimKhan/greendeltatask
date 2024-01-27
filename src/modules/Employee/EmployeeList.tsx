import {FlatList, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useGetEmployeesQuery} from '../../store/api/employeeApi';
import {useNavigation} from '@react-navigation/native';
import {setEmployees} from '../../store/slice/employeeSlice';
import EmployeeCard from '../../components/EmployeeCard';
import {Button, Spinner, Text, VStack} from 'native-base';

const EmployeeList = () => {
  //state & variable declaration
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data: employees, isError, isLoading} = useGetEmployeesQuery({});

  useEffect(() => {
    if (employees) {
      dispatch(setEmployees(employees));
    }
  }, [dispatch, employees]);

  console.log(employees);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar backgroundColor={'#fefefe'} barStyle={'dark-content'} />
      <VStack
        space={1}
        alignItems="center"
        flexDir="row"
        mx={'5'}
        my={'5'}
        justifyContent={'space-between'}>
        <Text fontSize="3xl">Employee List</Text>
        <Button
          onPress={() => navigation.navigate('AddEmployee')}
          variant={'solid'}
          color={'black'}
          mr={2}>
          Add New
        </Button>
      </VStack>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 100}}
          data={employees?.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <EmployeeCard user={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
