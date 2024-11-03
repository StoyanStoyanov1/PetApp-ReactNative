import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, View, Alert, Text} from 'react-native';
import Firebase from './Firebase';

import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';
import BigButton from './components/BigButton';
import IconButton from './components/IconButtons';

export default function App() {
  const [index, setIndex] = useState(0);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    Firebase.init();
    loadQuotes();
  }, []);


  function addQuoteToList(text, author) {
    setShowNewDialog(false);

    const newQuotes = [...quotes, { text, author }];  
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(text, author, newQuotes);
  }

 async function saveQuotes(text, author, newQuotes) {
    const id = await Firebase.saveQuote(text, author);
    newQuotes[newQuotes.length - 1].id = id;
    setQuotes(newQuotes)
  }

  async function loadQuotes() {
    const quotesFromDB = await Firebase.getQuotes();
    setQuotes(quotesFromDB);
    setIsloading(false);
  }

  function removeQuoteFromList() {
    const newQuotes = [...quotes];
    const id = quotes[index].id;
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotes(newQuotes);
    Firebase.removeQuote(id);
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='darkgreen'/>
      </View>
    )
  }
  
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
      {quotes.length > 0 && <Qoute text={quote.text} author={quote.author}> </Qoute> 
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
