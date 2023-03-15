import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import Main from './src/screens/Main/Main';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='Splash' component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
