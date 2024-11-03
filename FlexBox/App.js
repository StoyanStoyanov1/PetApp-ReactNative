import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[styles.box, {backgroundColor: 'cyan'}]}/>
      <View style={[styles.box, {backgroundColor: 'magenta'}]}/>
      <View style={[styles.box, {backgroundColor: 'yellow'}]}/>
      <View style={[styles.box, {backgroundColor: 'blue'}]}/>
      <View style={[styles.box, {backgroundColor: 'orange'}]}/>
      <View style={[styles.box, {backgroundColor: 'green'}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    gap: 10
  },
  box: {
    width: 100,
    height: 100,
  }
});
