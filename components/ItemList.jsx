import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ({ listName, onSelectList, onCheckList }) {

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={onSelectList}>
                <View style={styles.itemList}>
                    <Text style={styles.text}>
                        {listName}
                    </Text>
                    <TouchableWithoutFeedback onPress={onCheckList}>
                        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={30} color="#152AAB" />
                    </TouchableWithoutFeedback>
                </View>
            </TouchableNativeFeedback >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        padding: 0,
        margin: 0
    },
    itemList: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#FFEFDE',
        justifyContent: 'space-between',
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 193, 123, 0.4)"
    },
    text: {
        display: "flex",
        textAlign: 'left',
        fontSize: 20,
    }
})
