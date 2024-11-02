import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';
import BigButton from './components/BigButton';
import IconButton from './components/IconButtons';

const data = [
  { text: "Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.", author: "Antoine de Saint-Exupéry" },
  { text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.", author: "Albert Einstein" },
  { text: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", author: "Bertolt Brecht" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [quotes, setQuotes] = useState(data);

  useEffect(() => {
    loadQuotes();
  }, []);

  const quote = quotes[index];

  function addQuoteToList(name, content) {
    const newQuotes = [...quotes, { text: content, author: name }];  
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    setShowNewDialog(false); 
    saveQuotes(newQuotes);
  }

  function saveQuotes(newQuotes) {
    AsyncStorage.setItem('QUOTES', JSON.stringify(newQuotes));
  }

  async function loadQuotes() {
    let quotesFromDB = await AsyncStorage.getItem('QUOTES');

    if (quotesFromDB) {
      quotesFromDB = JSON.parse(quotesFromDB);
      console.log('nach JSON.parse: ' + quotesFromDB.length);
      setQuotes(quotesFromDB);
    }
  }

  return (
    <View style={styles.container}>
      <IconButton 
        onPress={() => setShowNewDialog(!showNewDialog)}  
        style={styles.createButton} 
        icon="add-circle"  
      />
      <NewQoute 
        visible={showNewDialog} 
        onCancel={() => setShowNewDialog(false)} 
        onSave={addQuoteToList}
      />
      <Qoute text={quote.text} author={quote.author}></Qoute>
      <BigButton 
        title="Nächstes Zitat" 
        onPress={() => setIndex((index + 1) % quotes.length)} 
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
