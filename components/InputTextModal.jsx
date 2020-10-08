import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from './Modal';

export default function ({ open, setModal, defaultText, onSubmit, inputDescription }) {
    const [text, setText] = useState("");

    const submit = () => {
        if (text === "" || text === " "){
            onSubmit(defaultText);
        } else {
            onSubmit(text);
        }
    }

    return (
        <Modal open={open} setModal={setModal}>
            <View style={styles.modal_closeIcon}>
                <TouchableOpacity onPress={() => setModal(false)}>
                    <Ionicons name="ios-close" size={35} color="#A20000" />
                </TouchableOpacity>
            </View>
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
    },
    modal_closeIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        paddingLeft: 12,
    },
})