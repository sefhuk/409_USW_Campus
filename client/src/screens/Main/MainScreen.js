import { StyleSheet, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MajorBuilding from './MajorBuilding';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName='major'
      screenOptions={{
        headerBackground: () => {
          return (
            <View style={styles.headerContainer}>
              <Image source={require('../../assets/header.png')} />
            </View>
          );
        },
        headerTitleStyle: { opacity: 0 },
        tabBarLabel: '주요건물',
        tabBarLabelStyle: {
          color: '#000000',
        },
        tabBarIcon: () => {
          return (
            <View>
              <Image source={require('../../assets/tab/tab_building.png')} />
            </View>
          );
        },
      }}
    >
      <Tab.Screen name='major' component={MajorBuilding} />
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

export default MainScreen;
