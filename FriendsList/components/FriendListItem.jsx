import { Pressable, Text, Image, StyleSheet, View} from "react-native"

export default function FriendListItem ({friend, onPress}) {
    return (
    <Pressable onPress={onPress} style={styles.container}>
    <Image 
        style={styles.image} 
        source={require('../assets/icon.png')}
    />
    <View style={styles.info}>
        <Text style={styles.name} >{friend.first} {friend.last} </Text>
        <Text style={styles.email} >{friend.email}</Text>
    </View>
    </Pressable>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        gap: 10,
        padding: 10,
        alignItems: 'center',
    },
    image: {
       width: 50,
       height: 50,
       borderRadius: 25,
    },
    info: {
        justifyContent: 'space-evenly'
    },
    name: {
        fontSize: 20,
    },
    email: {
        fontSize: 16,
        fontWeight: '100'
    }
})