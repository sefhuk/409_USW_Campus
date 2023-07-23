import { View } from 'react-native';
import { Polyline } from 'react-native-maps';
import { fieldFeatures } from '../assets/mapPolygonData';

const MapFieldFeatures = () => {
  return (
    <>
      {fieldFeatures.map((e, idx) => (
        <Polyline
          key={`filed${idx}`}
          coordinates={e}
          strokeWidth={3}
          strokeColor={'#ffffff'}
        />
      ))}
    </>
  );
};

export default MapFieldFeatures;
