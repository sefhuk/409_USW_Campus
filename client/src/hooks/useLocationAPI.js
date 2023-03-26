import { useState } from 'react';
import * as Location from 'expo-location';
import { Linking, Alert } from 'react-native';

export const useLocationAPI = () => {
  const [pos, setPos] = useState({});
  const [isPermit, setIsPermit] = useState(false);

  const askPermission = async () => {
    const { canAskAgain } = await Location.getForegroundPermissionsAsync();
    if (canAskAgain) {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        setIsPermit(true);
        return;
      }
    }
    Alert.alert(
      '본 앱은 위치제공 동의가 필요합니다',
      '설정 화면으로 이동합니다',
      [
        {
          text: '확인',
          style: 'cancel',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]
    );
  };

  const trackingPosition = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 0.1,
      },
      position => {
        setPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    );
  };

  return [askPermission, trackingPosition, pos, isPermit];
};
