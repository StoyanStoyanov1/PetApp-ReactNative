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
import BigButton from './BigButton';
import IconButton from './IconButtons';

export default function NewQoute({
    visible, 
    onCancel, 
    onSave,
}) {
    
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const onSubmit = () => {
        content.trim();
        name.trim();
        if (!content || !name) {
            return alert('Inhalt und Name des Zitats dürfen nicht leer sein.')
        }

        onSave(content, name);
        setContent('');
        setName('');
    }

    function cancelEditing() {
        onCancel();
        setContent('');
        setName('');
    }

    return (
        <Modal 
        visible={visible} 
        onRequestClose={onCancel}
        animationType="slide"
        >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <IconButton 
                onPress={cancelEditing}
                icon="arrow-back"
                style={styles.back}
            />
            <TextInput 
            placeholder="Inhalt" 
            multiline={true} 
            style={[styles.input, { height: 150}]}
            onChangeText={setContent}
            />
            <TextInput 
            placeholder="Name" 
            style={styles.input}
            returnKeyType="done"
            onChangeText={setName}
            onSubmitEditing={onSubmit}
            />
             <BigButton
                title='Speichern'
                onPress={onSubmit}
            />
    
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
    },
    back: {
        position: 'absolute',
        top: 50,
        left:20
    }
})
