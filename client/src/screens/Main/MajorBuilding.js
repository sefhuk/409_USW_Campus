import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const MajorBuilding = () => {
  const [pos, setPos] = useState({});
  const [isPermit, setIsPermit] = useState(false);
  const [centerPos, setCenterPos] = useState({
    latitude: 37.208468830819136,
    longitude: 126.97655688740143,
  });

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
    console.log('traking start!');
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 0.5,
      },
      position => {
        setPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    );
  };

  useEffect(() => {
    askPermission();
  }, []);

  useEffect(() => {
    if (isPermit) {
      trackingPosition();
    }
  }, [isPermit]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.208468830819136,
          longitude: 126.97655688740143,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={16}
        maxZoomLevel={18}
        region={centerPos}
      >
        <Marker
          title='User'
          coordinate={{
            latitude: pos.latitude,
            longitude: pos.longitude,
          }}
        >
          <MaterialIcons name='location-history' size={30} color='red' />
        </Marker>
      </MapView>
      <TouchableOpacity
        style={styles.myLocation}
        onPress={() => {
          askPermission();
          setCenterPos({
            latitude: pos.latitude,
            longitude: pos.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      >
        <MaterialIcons name='my-location' size={30} color='#42C2FF' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  myLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    backgroundColor: '#ffffff',
    borderRadius: '10%',
  },
});

export default MajorBuilding;
