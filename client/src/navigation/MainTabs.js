import { StyleSheet, Image, View } from 'react-native';
// import {createNativeStackNavigator} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MajorScreen from '../screens/Main/MajorScreen';

const Tab = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Major'
      screenOptions={{
        headerTitle: '캠퍼스',
        headerTitleAlign: 'center',
        // tabBarLabel: '주요건물',
        // tabBarLabelStyle: {
        //   color: '#000000',
        // },
        // headerBackground: () => {
        //   return (
        //     <View style={styles.headerContainer}>
        //       <Image source={require('../assets/image/header.png')} />
        //     </View>
        //   );
        // },
        // tabBarIcon: () => {
        //   return (
        //     <View>
        //       <Image
        //         source={require('../assets/image/tab/majorBuilding.png')}
        //       />
        //     </View>
        //   );
        // },
      }}
    >
      <Tab.Screen name='Major' component={MajorScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default MainTabs;
