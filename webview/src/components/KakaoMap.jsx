import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.css';
import { building } from '../assets/buildings';

const KakaoMap = () => {
  const [pos, setPos] = useState(null);

  const onMessageHandler = e => {
    const message = JSON.parse(e.data);
    setPos(message);
  };

  useEffect(() => {
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/);
    };

    const receiver = isUIWebView() ? window : document;

    receiver.addEventListener('message', onMessageHandler);
    return () => {
      receiver.removeEventListener('message', onMessageHandler);
    };
  });

  return (
    <>
      <Map
        className={styles.container}
        center={{ lat: 37.20879323125512, lng: 126.97666944064247 }}
        style={{ width: '100vw', height: '100vh' }}
        level={4}
      >
        {building.map(e => (
          <MapMarker
            key={e.engName}
            position={{ lat: e.latitude, lng: e.longitude }}
            image={{
              src: require(`../assets/buildings/${e.engName}.png`),
              size: {
                width: 40,
                height: 30,
              },
            }}
          />
        ))}
        {pos && (
          <MapMarker
            position={{ lat: pos.latitude, lng: pos.longitude }}
            image={{
              src: require('../assets/userPos.png'),
              size: {
                width: 15,
                height: 15,
              },
            }}
          />
        )}
      </Map>
    </>
  );
};

export default KakaoMap;
