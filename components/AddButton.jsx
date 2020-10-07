import React, { useState } from 'react';
import { StyleSheet, View, Text, Input, TextInput, Button } from 'react-native';
import ItemForm from './ItemForm';

export default function () {

    const [openForm, setOpenForm] = useState(false);

    const onSubmit = (item) => {
        alert("item")
    }


    var form = (openForm) ? <ItemForm onSubmit={onSubmit}/> : <Text></Text>;
    return (
        <View>
            <Button 
                style={styles.add_button}
                onPress={() => setOpenForm(!openForm)}
                title={openForm ? "OCULTAR" : "AGREGAR ITEM"}
                color="#841584"
            />
            {form}
        </View>
    )
}

const styles = StyleSheet.create({
    add_button: {
        width: '100%'
    }
})