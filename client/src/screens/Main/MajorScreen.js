import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { buildingList } from '../../assets/buildingList';
import { markerImage } from '../../assets/imagePath';
import { useLocationAPI } from '../../hooks/useLocationAPI';

const MajorScreen = () => {
  const [centerPos, setCenterPos] = useState({
    latitude: 37.208468830819136,
    longitude: 126.97655688740143,
  });
  const [askPermission, trackingPosition, pos, isPermit] = useLocationAPI();

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
        {buildingList.map(element => (
          <Marker
            key={element.engName}
            title={element.engName}
            coordinate={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
          >
            <Image
              source={markerImage[element.engName]}
              style={{ width: 35, height: 35 }}
            />
          </Marker>
        ))}
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
          console.log(pos);
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

export default MajorScreen;
