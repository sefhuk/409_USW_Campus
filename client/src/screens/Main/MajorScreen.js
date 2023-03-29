import { useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { buildingList } from '../../assets/buildingList';
import { markerImage } from '../../assets/imagePath';
import { useLocationAPI } from '../../hooks/useLocationAPI';
import DistanceList from '../../components/DistanceList';

const MajorScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useSafeAreaFrame();

  const mapViewRef = useRef();

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
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.208468830819136,
          longitude: 126.97655688740143,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={16}
        maxZoomLevel={18}
        region={{ latitude: 37.208468830819136, longitude: 126.97655688740143 }}
      >
        <Marker
          title='User'
          coordinate={{
            latitude: pos.latitude ? pos.latitude : 0,
            longitude: pos.longitude ? pos.longitude : 0,
          }}
        >
          <MaterialIcons name='location-history' size={30} color='red' />
        </Marker>
        {buildingList.map(element => (
          <Marker
            key={element.engName}
            title={element.engName}
            coordinate={{
              latitude: element.latitude ? parseFloat(element.latitude) : 0,
              longitude: element.longitude ? parseFloat(element.longitude) : 0,
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
          mapViewRef.current.animateToRegion(pos, 300);
        }}
      >
        <MaterialIcons name='my-location' size={30} color='#42C2FF' />
      </TouchableOpacity>
      <DistanceList safeHeight={height - bottom - top} pos={pos} />
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
    borderRadius: 10,
  },
});

export default MajorScreen;
