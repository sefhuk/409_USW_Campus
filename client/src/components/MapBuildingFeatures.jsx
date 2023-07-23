import { Polygon } from 'react-native-maps';
import BuildingPolygon from './BuildingPolygon';
import { buildingFeatures } from '../assets/mapPolygonData';

const MapBuildingFeatures = () => {
  return (
    <>
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
    </>
  );
};

export default MapBuildingFeatures;
