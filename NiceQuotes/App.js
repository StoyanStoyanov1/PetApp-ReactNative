import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';
import BigButton from './components/BigButton';
import IconButton from './components/IconButtons';


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
    setIndex(data.length - 1);

    setSchowNewDialog(false)
  }

  return (
    <View style={styles.container}>
        <IconButton 
        onPress={() => setSchowNewDialog(!showNewDialog)} 
        style={styles.createButton} 
        icon="add-circle"  
        />
        <NewQoute 
        visible={showNewDialog} 
        onCancel={() => setSchowNewDialog(false)} 
        onSave={addQouteToList}
        />
      <Qoute text={qoute.text} author={qoute.author}></Qoute>
      <BigButton 
      title='Nächstes Zitat' 
      onPress={() => setIndex((index + 1 ) % data.length)}
      style={styles.button}
      />
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
});
