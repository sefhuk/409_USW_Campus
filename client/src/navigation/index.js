import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Main' component={MainTabs} />
        <Stack.Screen name='Splash' component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
