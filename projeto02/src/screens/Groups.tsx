import { View, Text, StyleSheet } from 'react-native';

export function Groups() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Projeto 002 - React Native - SFC</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text : {
        fontSize: 25,
    },
  });
  