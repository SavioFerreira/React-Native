import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.fontColor}>Main</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#103',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontColor: {
    color: 'purple',
    fontSize: 40,
    margin: 10,
  },
});
