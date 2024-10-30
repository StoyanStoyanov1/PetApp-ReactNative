import { StyleSheet, Text, View } from 'react-native';

export default function Qoute(props) {
    return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.fontColor]}>{props.text}</Text>
        <Text style={[styles.author, styles.fontColor]}>-- {props.author}</Text>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    text: { 
        fontSize: 36, 
        fontStyle: 'italic',
        marginBottom: 10,
    },
    fontColor: {
        color: '#20b2aa',
        textAlign: 'center',
    },
    author: { 
        fontSize: 24, 
        fontStyle: 'italic',
        textAlign: 'right',
    },
});