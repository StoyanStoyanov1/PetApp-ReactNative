import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';


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
  const [showNewDialog, setSchowNewDialog ] = useState(false);

  const qoute = data[index];

  function addQouteToList(name, content) {
    data.push({text: content, author: name});
    setSchowNewDialog(false);
    setIndex(data.length - 1);
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.createButton} onPress={() => setSchowNewDialog(!showNewDialog)}>
      <MaterialIcons name="add-circle" size={24} color="green" />
      </Pressable>
        <NewQoute 
        visible={showNewDialog} 
        onCancel={() => setSchowNewDialog(false)} 
        onSave={addQouteToList}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute', 
    bottom: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'darkgreen',
    backgroundColor: 'darkgreen',
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
  },
  createButton: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  createButtonText: {

  },
});
