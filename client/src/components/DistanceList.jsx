import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  PanResponder,
} from 'react-native';
import { buildingImage } from '../assets/imagePath';
import { buildingList } from '../assets/buildingList';
import { getPreciseDistance } from 'geolib';

const DistanceList = ({ safeHeight, pos }) => {
  const [rank, setRank] = useState(buildingList);
  const initialHeight = useRef(safeHeight * 0.25);
  const [scrollViewHeight, setScrollViewHeight] = useState(safeHeight * 0.25);

  // const fadeScollView = useRef(new Animated.Value(safeHeight * 0.25)).current;

  const pan = useRef(
    PanResponder.create({
      // 화면을 터치한 것을 감지함
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {},

      // 화면에 터치를 하고 움직일 때를 감지함
      // 이동에 대한 props로 event와 gesture 값을 받을 수 있다.
      // gesture내에 우리가 필요한 dx,dy 이동값이 들어있다.
      onPanResponderMove: (_, gesture) => {
        // const newH = scrollViewHeight - gesture.dy;
        setScrollViewHeight(scrollViewHeight - gesture.dy);
      },

      onPanResponderStart: () => {
        // console.log('start', scrollViewHeight);
      },
      //화면에 터치를 하고 손을 뗏을 때를 감지함
      onPanResponderRelease: (_, gesture) => {
        // setScrollViewHeight(newH);
      },
    })
  ).current;

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
    <View style={{ ...styles.container, height: scrollViewHeight }}>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 10,
          width: '100%',
        }}
        activeOpacity={1}
        {...pan.panHandlers}
      >
        <View
          style={{
            backgroundColor: '#aaaaaa',
            width: '20%',
            height: '40%',
            borderRadius: 50,
          }}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        // scrollEnabled={false}
      >
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
