import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ItemForm from './ItemForm';

export default function ({onSubmit}) {
    const [openForm, setOpenForm] = useState(false);

    var form = (openForm) ? <ItemForm onSubmit={(item) => onSubmit(item)}/> : <Text></Text>;
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