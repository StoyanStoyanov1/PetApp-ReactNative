import { 
  StyleSheet, 
  Text, 
  Image, 
  ScrollView,
  useWindowDimensions
  } 
   from 'react-native';

export default function FriendsScreen({navigation, route}) {
  const {width} = useWindowDimensions();
  const imageWidht = width * 0.8
  const { friend } = route.params;
    return (
      <ScrollView 
        contentContainerStyle={styles.container}  
        style={styles.scrollView}>
       
         <Image 
        style={{width: imageWidht, height: imageWidht}} 
        source={require('../assets/icon.png')}
    />
        <Text>{friend.first} {friend.last}</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   scrollView: {
    backgroundColor: '#FFF'
   }
});
  