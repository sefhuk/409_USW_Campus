import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const MajorBuilding = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ url: 'http://hyuk.ml' }} style={styles.webview} />
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
