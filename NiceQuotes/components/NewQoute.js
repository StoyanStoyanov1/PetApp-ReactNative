import { Modal, Text, View, Pressable } from "react-native";

export default function NewQoute({visible, onCancel}) {

    return (
        <Modal 
        visible={visible} 
        onRequestClose={onCancel}
        animationType="slide"
        >
            <View style={{marginBottom: 50}}>
            <Text style={{ 
                borderWidth: 3, 
                padding: 30, 
                marginBottom: 50
                }}>
            Neues Zitat eingeben...
            </Text>
            <Pressable onPress={onCancel}>
                <Text style={{fontSize: 24, padding: 10}}>Abbrechen</Text>
            </Pressable>
            </View>
        </Modal>
    )
}