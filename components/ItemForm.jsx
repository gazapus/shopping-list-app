import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import ItemClass from '../classes/Item';

export default function ({onSubmit}) {
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("0");
    const [quantity, setQuantity] = useState("1");

    const submit = () => {
        let newItem = new ItemClass(product, price, quantity);
        onSubmit(newItem);
        setProduct("");
        setPrice("0");
        setQuantity("1");
    }
    
    const validateNumber = (input) => {
        const numbers = ["0","1","2","3","4","5","6","7","8","9","."];
        let pointsQuantity = 0;
        let cursor = 0;
        let onlyNumbers = true;
        while(cursor < input.length && pointsQuantity <= 1 && onlyNumbers) {
            if(input.charAt(cursor) === "." ) {
                pointsQuantity++;
            }
            onlyNumbers = numbers.indexOf(input.charAt(cursor)) != -1;
            cursor++;
        }
        return onlyNumbers && pointsQuantity <= 1;
    }

    const setValidatedPrice = (input) => {
        if(validateNumber(input)) {
            if(parseFloat(input) >= 0){
                setPrice(input);
            }
        }
    }

    const setValidatedQuantity = (input) => {
        if(validateNumber(input)) {
            if(parseFloat(input) > 0){
                setQuantity(input);
            }
        }
    }

    return (
        <View style={styles.form_container}>
            <TextInput
                placeholder="Product name"
                value={product}
                onChangeText={(text) => setProduct(text)}
                style={[styles.form_productInput, styles.form_input]}
                autoCapitalize="sentences"
                maxLength={30}
                onSubmitEditing={submit}
            />
            <View style={styles.form_subsection}>
                <View style={styles.form_number_labels}>
                    <Text style={styles.form_price_text}>Price</Text>
                    <TextInput
                        value={price}
                        keyboardType={'numeric'}
                        onChangeText={(number) => setValidatedPrice(number)}
                        selectTextOnFocus={true}
                        style={[styles.form_number_input, styles.form_input]}
                    />
                </View>
                <View style={styles.form_number_labels}>
                    <Text>Quantity</Text>
                    <TextInput
                        value={quantity}
                        keyboardType={'numeric'}
                        onChangeText={(number) => setValidatedQuantity(number)}
                        selectTextOnFocus={true}
                        style={[styles.form_number_input, styles.form_input]}
                    />
                </View>
                <View style={styles.add} >
                    <Button
                        onPress={submit}
                        title="AGREGAR"
                        color="blue"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form_container: {
        backgroundColor: '#FDF1EC',
        borderBottomWidth: 2,
        borderColor: 'grey',
        shadowOpacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    form_input: {
        borderWidth: 1,
        height: 40,
        borderRadius: 7,
        borderColor: 'grey',
        paddingLeft: 10,
        backgroundColor: '#FAF5F3'
    },
    form_productInput: {
        margin: 10,
    },
    form_subsection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 0
    },
    form_number_labels: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    form_number_input: {
        margin: 10,
        width: 70,
    },
    add: {
        borderRadius: 30,
        justifyContent: 'center'
    }
})