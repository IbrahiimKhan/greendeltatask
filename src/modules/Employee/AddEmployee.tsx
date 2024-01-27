import * as React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import BasicInfo from '../../components/tabview/BasicInfo';
import Skills from '../../components/tabview/Skills';
import Preview from '../../components/tabview/Preview';
import {useNavigation} from '@react-navigation/native';

export default function AddEmployee() {
  //state & variable declarations
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  // screen
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return <BasicInfo setIndex={setIndex} />;
      case 'second':
        return <Skills setIndex={setIndex} />;
      case 'third':
        return <Preview setIndex={setIndex} />;
      default:
        return null;
    }
  };

  //all route
  const [routes] = React.useState([
    {key: 'first', title: 'Basic Info'},
    {key: 'second', title: 'Skills'},
    {key: 'third', title: 'Preview'},
  ]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
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
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fefefe',
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
});
