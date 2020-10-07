import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

export default function ({ product, changeState }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    /* cuando cambie algun dato del producto llama a actualizar(index, productoACTUALIZADO)
    * donde reemplaza el elemento en index posicion por productoActualizado y lo guarda
    */

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <CheckBox
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    style={styles.item_checkbox}
                />
                <TouchableNativeFeedback onPress={() => alert("editando")}>
                    <View style={styles.item_details}>
                        <Text style={styles.item_details_name}>
                            {product.name}
                        </Text>
                        <Text style={styles.item_details_subtotal}>
                            {product.quantity} x ${product.price}
                        </Text>
                    </View>
                </TouchableNativeFeedback >
            </View>
            <TouchableNativeFeedback onPress={() => alert("delete")}>
                <View style={styles.item_delete}>
                    <MaterialCommunityIcons name="delete" size={24} color="#D7BEBE"/>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(221, 221, 221, 0.7)', 
        padding: 3,
        paddingRight: 8
    },
    item: {
        flexDirection: 'row',
        flexGrow: 1
    },
    item_checkbox: {
        justifyContent: 'center',
    },
    item_details: {
        flex: 1,
        paddingLeft: 6,
        color: 'black'
    },
    item_details_name: {
        fontSize: 18
    },
    item_details_subtotal: {
        fontSize: 14,
        color: 'gray'
    },
    item_delete: {
        justifyContent: 'center',
    }
})
