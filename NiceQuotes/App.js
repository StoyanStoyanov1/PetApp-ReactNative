import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';
import BigButton from './components/BigButton';
import IconButton from './components/IconButtons';

export default function App() {
  const [index, setIndex] = useState(0);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    loadQuotes();
  }, []);


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
      setQuotes(quotesFromDB);
    }
  }

  function removeQuoteFromList() {
    const newQuotes = [...quotes];
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotes(newQuotes);
    saveQuotes(newQuotes);
  }

  function deleteQoute () {
    Alert.alert(
      'Zitat löschen',
      'Soll das Zitat wirklich gelöscht werden?',
      [
        {text: 'Abbrechen', style: 'cancel'}, 
        {text: 'Bestätigen', style: 'destructive', onPress: removeQuoteFromList}
      ]
    )
  }

  const quote = quotes[index] ? quotes[index] : {};

  return (
    <View style={styles.container}>
       {quotes.length > 0 && <IconButton 
        onPress={deleteQoute}  
        style={styles.delete} 
        icon="delete"  
      />}
      {<IconButton 
        onPress={() => setShowNewDialog(!showNewDialog)}  
        style={styles.createButton} 
        icon="add-circle"  
      />}
      <NewQoute 
        visible={showNewDialog} 
        onCancel={() => setShowNewDialog(false)} 
        onSave={addQuoteToList}
      />
      {quotes.length && <Qoute text={quote.text} author={quote.author}> </Qoute> 
      || <Text style={styles.noQuotes}>Keine Zitate</Text>
      }
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
  delete: {
    position: 'absolute',
    top: 60,
    left: 30
  },
  noQuotes: {
    fontSize: 26,
    color: 'darkred'
  }
});
