import { Text } from 'react-native';

export default function Qoute(props) {
    return (
    <>
        <Text>{props.text}</Text>
        <Text>-- {props.author}</Text>
    </>
)
}