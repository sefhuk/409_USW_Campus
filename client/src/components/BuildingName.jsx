import { Text, StyleSheet } from 'react-native';

const BuildingName = ({ name }) => {
  return <Text style={styles.text}>{name}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'gray',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
export default BuildingName;
