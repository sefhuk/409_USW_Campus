import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import WebView from 'react-native-webview';
import * as Location from 'expo-location';
import { WEBVIEW_HOST } from '@env';

const MajorBuilding = () => {
  const [isPermit, setIsPermit] = useState(false);
  const WebViewRef = useRef();

  const askPermission = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      Alert.alert('본 앱은 위치제공 동의가 필요합니다', '', [
        {
          text: '확인',
          onPress: async () => {
            await Location.requestForegroundPermissionsAsync();
          },
        },
      ]);
    }
    // 위치제공 동의 가정
    setIsPermit(true);
    trackingPosition();
  };

  const trackingPosition = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 0.2,
      },
      position => {
        WebViewRef.current.postMessage(
          JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      }
    );
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ url: `${WEBVIEW_HOST}` }}
        style={styles.webview}
        ref={WebViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MajorBuilding;
