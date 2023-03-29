import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { buildingImage } from '../assets/imagePath';
import { buildingList } from '../assets/buildingList';
import { getPreciseDistance } from 'geolib';

const DistanceList = ({ safeHeight, pos }) => {
  const [rank, setRank] = useState(buildingList);

  const sortList = () => {
    let arr = [...rank];
    arr = arr.sort(
      (a, b) =>
        getPreciseDistance(
          { latitude: a.latitude, longitude: a.longitude },
          pos
        ) -
        getPreciseDistance(
          { latitude: b.latitude, longitude: b.longitude },
          pos
        )
    );
    setRank(arr);
  };

  useEffect(() => {
    sortList();
  }, [pos]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {rank.map(building => (
          <View
            key={building.engName}
            style={{ ...styles.item, height: safeHeight * 0.11 }}
          >
            <Image
              source={buildingImage[building.engName]}
              style={styles.image}
            />
            <View style={styles.textWrap}>
              <Text style={styles.title}>{building.korName}</Text>
              {building.departments && (
                <View
                  key={building.engName}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    width: '80%',
                  }}
                >
                  {building.departments.map(e => (
                    <Text style={{ color: '#0F6292' }} key={e}>
                      {e}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '30%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    width: '90%',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#EFFFFD',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  image: {
    width: '25%',
    height: '80%',
    borderRadius: 20,
  },
  textWrap: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '75%',
    height: '90%',
  },
  title: {
    fontSize: 20,
  },
});

export default DistanceList;
