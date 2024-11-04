import {FlatList, Button, StyleSheet, Text, View } from 'react-native';
import FriendListItem from '../components/FriendListItem';

export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <FlatList data={[
            {name: 'Alice'},
            {name: 'Bob'},
            {name: 'Jane'},
            {name: 'Joe'},
        ]}
        renderItem={({item}) => {
            return <FriendListItem friend={item} onPress={() => {
                navigation.navigate('Friend', {name: item.name})}}/>
        }}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={<View style={styles.listSeparator}/>}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50,
    },
    listSeparator: {
        height: StyleSheet.hairlineWidth, 
        backgroundColor: 'lightsalmon',
    }
});
  