import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Text} from 'react-native';
import * as SQLite from 'expo-sqlite';

import Qoute from './components/Qoute';
import NewQoute from './components/NewQoute';
import BigButton from './components/BigButton';
import IconButton from './components/IconButtons';

const database = SQLite.openDatabaseSync('qoutes.db');

export default function App() {
  const [index, setIndex] = useState(0);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    initDB();
    loadQuotes();
  }, []);

  function initDB () {
    database.runSync(
      'CREATE TABLE IF NOT EXISTS allquotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT)');
  }

  function addQuoteToList(text, author) {
    setShowNewDialog(false);

    const newQuotes = [...quotes, { text, author }];  
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(text, author, newQuotes);
  }

 async function saveQuotes(text, author, newQuotes) {
    const result = await database.runAsync(
    'INSERT INTO allquotes (text,author) VALUES (?,?)',
    text,
    author
    );
    newQuotes[newQuotes.length - 1].id = result.lastInsertRowId;
    setQuotes(newQuotes);
  }

  async function loadQuotes() {
    const rows = await database.getAllAsync('SELECT * FROM allquotes');
    setQuotes(rows);
  }

  function removeQuoteFromList() {
    const newQuotes = [...quotes];
    const id = quotes[index].id;
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotes(newQuotes);
    database.runAsync('DELETE FROM allquotes WHERE id=?', id)
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
