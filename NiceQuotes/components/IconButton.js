import { Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function IconButton({
    onPress,
    icon,
    style,
}) {
    return (
        <Pressable 
            onPress={onPress} 
            style={[style, { backgroundColor: 'lightgray', padding: 10, borderRadius: 5 }]} // временно добавени стилове за видимост
        >
            <MaterialIcons 
                name='home'  
                size={36} 
                color="green" 
            />
        </Pressable>
    );
}
