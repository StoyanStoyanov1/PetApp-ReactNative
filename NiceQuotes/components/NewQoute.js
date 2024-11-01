import { useState } from 'react';
import { 
    Modal, 
    Text, 
    Pressable, 
    StyleSheet, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform
} from "react-native";

export default function NewQoute({
    visible, 
    onCancel, 
    onSave,
}) {
    
    const [name, setName] = useState(null);
    const [content, setContent] = useState(null);

    return (
        <Modal 
        visible={visible} 
        onRequestClose={onCancel}
        animationType="slide"
        >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TextInput 
            placeholder="Inhalt" 
            multiline={true} 
            style={[styles.input, { height: 150}]}
            onChangeText={setContent}
            value={content}
            />
            <TextInput 
            placeholder="Name" 
            style={styles.input}
            returnKeyType="done"
            onChangeText={setName}
            value={name}
            onSubmitEditing={() => {
                onSave(name, content);
                setContent('');
                setName('');
            }}
            />
            <Pressable onPress={onCancel}>
                <Text style={{fontSize: 24, padding: 10}}>Abbrechen</Text>
            </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'darkgreen',
        borderRadius: 5,
        width: '80%',
        marginBottom: 10,
        padding: 10,
        fontSize: 20,
        textAlignVertical: 'top',
    }
})
