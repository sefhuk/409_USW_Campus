import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.css';
import { building } from '../assets/buildings';

const KakaoMap = () => {
  return (
    <Map
      className={styles.container}
      center={{ lat: 37.20879323125512, lng: 126.97666944064247 }}
      style={{ width: '100vw', height: '100vh' }}
      level={4}
    >
      {building.map(e => (
        <MapMarker
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
    </Map>
  );
};

export default KakaoMap;
