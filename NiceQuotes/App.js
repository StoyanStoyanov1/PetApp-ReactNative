import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Pressable, View, Text } from 'react-native';
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
      <Qoute text={qoute.text} author={qoute.author}></Qoute>
      <Pressable
        onPress={() => setIndex((index + 1 ) % data.length)}
        style={styles.button}
        > 
        <Text style={styles.textButton}>Nächstes Zitat</Text> 
      </Pressable>
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
  button: {
    position: 'absolute', 
    bottom: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'darkred',
    backgroundColor: 'darkred',
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
  },
});
