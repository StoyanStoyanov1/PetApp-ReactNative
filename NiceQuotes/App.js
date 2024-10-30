import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Qoute from './components/Qoute';

const data = [
  {text: "Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.", 
    author: "Antoine de Saint-Exupéry" },
{ text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.", 
  author: "Albert Einstein" },
{ text: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", 
  author: "Bertolt Brecht" },
];

export default function App() {

  const [index, setIndex] = useState(0);

  const qoute = data[index];

  return (
    <View style={styles.container}>
      <Text>{qoute.text}</Text>
      <Text>-- {qoute.author}</Text>
      <Qoute></Qoute>
      <Button title="Nächstes Zitat" 
        onPress={() => setIndex((index + 1 ) % data.length)}/>
      <StatusBar style="auto" />
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
});
