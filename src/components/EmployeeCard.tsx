import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Button, Icon, Image, Text} from 'native-base';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {useNavigation} from '@react-navigation/native';

interface EmployeeCardProps {
  user: {
    employee_age: number;
    employee_name: string;
    profile_image: string;
    employee_salary: number;
  };
}

const EmployeeCard = ({user}: EmployeeCardProps) => {
  const navigation = useNavigation();

  return (
    <Box
      borderRadius={'2xl'}
      mx={'3'}
      flexDir={'row'}
      py={'0.5'}
      backgroundColor={'coolGray.100'}
      alignItems={'center'}
      justifyContent={'space-between'}
      my={'1'}
      shadow={2}>
      <Box flexDir={'row'} alignItems={'center'}>
        <Text />
        <Image
          width={50}
          height={50}
          resizeMode="cover"
          alt="Employee Image"
          borderRadius="full"
          mr={2}
          source={{
            uri: user?.profile_image
              ? user?.profile_image
              : 'https://i.ibb.co/D8Wsfwd/avatar.jpg',
          }}
        />
        <Box>
          <Text fontSize={'lg'} fontWeight={'semibold'} color={'black'}>
            {user?.employee_name}
          </Text>
          <Text>
            <Text fontWeight={'bold'}>Age: </Text> {user?.employee_age}
          </Text>
          <Text>
            {' '}
            <Text fontWeight={'bold'}>Salary: </Text>
            {user?.employee_salary}
          </Text>
        </Box>
      </Box>
      <Button
        onPress={() => {
          navigation.navigate('EditEmployee', {
            user: user,
          });
        }}
        variant={'solid'}
        color={'black'}
        mr={2}>
        Edit Employee
      </Button>
    </Box>
  );
};

export default EmployeeCard;
