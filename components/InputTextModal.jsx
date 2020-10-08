import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import Modal from './Modal';

export default function ({ open, setModal, defaultText, onSubmit, inputDescription }) {
    const [text, setText] = useState("");

    const submit = () => {
        if (text === "") setText(defaultText);
        onSubmit(text);
    }

    return (
        <Modal open={open} setModal={setModal}>
            <View style={styles.input_cotainer}>
                <Text style={styles.input_desctiption}>{inputDescription || ""}</Text>
                <TextInput
                    autoCapitalize="sentences"
                    placeholder={defaultText || ""}
                    maxLength={30}
                    style={styles.text_input}
                    onChangeText={text => setText(text)}
                    value={text}
                    onSubmitEditing={() => submit()}
                />
                <Button onPress={() => submit()} title="Aceptar" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    input_cotainer: {
        margin: 20,
        alignItems: 'center'
    },
    input_desctiption: {
        textAlign: 'center',
        margin: 6,
        fontSize: 17
    },
    text_input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        minWidth: '80%',
        paddingLeft: 5,
    }
})