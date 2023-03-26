import { StyleSheet, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MajorScreen from '../screens/Main/MajorScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Major'
      screenOptions={{
        headerBackground: () => {
          return (
            <View style={styles.headerContainer}>
              <Image source={require('../assets/image/header.png')} />
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
              <Image
                source={require('../assets/image/tab/majorBuilding.png')}
              />
            </View>
          );
        },
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
