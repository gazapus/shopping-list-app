import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import Modal from './Modal';

export default function ({open, setModal, defaultText, onSubmit, inputDescription}) {
    const [text, setText] = useState("");

    const submit = () => {
        if(text === "") setText(defaultText);
        onSubmit(text);
        setText("");
    }

    return (
        <Modal open={open} setModal={setModal}>
            <Text>{inputDescription || ""}</Text>
            <TextInput
                autoCapitalize="sentences"
                placeholder={defaultText || ""}
                maxLength={30}
                style={styles.text_input}
                onChangeText={text => setText(text)}
                value={text}
                onSubmitEditing={()=> submit()}
            />
            <Button onPress={() => submit()} title="Aceptar" />
        </Modal>
    )
}

const styles = StyleSheet.create({
    text_input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
        minWidth: '80%',
        paddingLeft: 5
    }
})