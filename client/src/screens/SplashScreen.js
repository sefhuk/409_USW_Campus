import { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { images } from '../assets/imagePath';

const SplashScreen = ({ navigation }) => {
  const [asset] = useAssets(Object.values(images));

  useEffect(() => {
    if (asset) {
      setTimeout(() => {
        navigation.replace('Main');
      }, 3000);
    }
  }, [asset]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/main.png')} style={styles.image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 0.5,
    width: '100%',
  },
});

export default SplashScreen;
