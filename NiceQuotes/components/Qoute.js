import { StyleSheet, Text } from 'react-native';

export default function Qoute(props) {
    return (
    <>
        <Text style={styles.text}>{props.text}</Text>
        <Text style={styles.author}>-- {props.author}</Text>
    </>
)
}

const styles = StyleSheet.create({
    text: { 
        fontSize: 36, 
        fontStyle: 'italic'
    } ,
    author: { 
        fontSize: 24, 
        fontStyle: 'italic'
    },
});