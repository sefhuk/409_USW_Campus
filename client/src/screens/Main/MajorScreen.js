import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import DistanceList from '../../components/DistanceList';
import { buildingFeatures } from '../../assets/mapPolygonData';
import { buildingList } from '../../assets/buildingList';

import { useLocationAPI } from '../../hooks/useLocationAPI';
import BuildingName from '../../components/BuildingName';

const MajorScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useSafeAreaFrame();

  const mapViewRef = useRef();

  const [askPermission, trackingPosition, pos, isPermit] = useLocationAPI();

  const [scrollViewHeight, setScrollViewHeight] = useState(
    height - bottom - top
  );

  // const fadeScollView = useRef(new Animated.Value(safeHeight * 0.25)).current;

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
        customMapStyle={[
          {
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.business',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.school',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.government',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ]}
      >
        {buildingFeatures.map(e => {
          return (
            <Polygon
              key={e.name}
              coordinates={e.coord}
              fillColor={e.color}
              zIndex={0}
              tappable={true}
            />
          );
        })}
        {buildingList.map(e => {
          return (
            <Marker
              key={e.engName}
              title={e.korName}
              coordinate={{
                latitude: Number(e.latitude),
                longitude: Number(e.longitude),
              }}
            >
              <BuildingName name={e.korName} />
            </Marker>
          );
        })}
        <Marker
          title='User'
          coordinate={{
            latitude: pos.latitude ? pos.latitude : 0,
            longitude: pos.longitude ? pos.longitude : 0,
          }}
        >
          <MaterialIcons name='location-history' size={30} color='red' />
        </Marker>
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
