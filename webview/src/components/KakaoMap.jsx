import { Map } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.css';

const KakaoMap = () => {
  return (
    <Map
      className={styles.container}
      center={{ lat: 37.20879323125512, lng: 126.97666944064247 }}
    />
  );
};

export default KakaoMap;
