import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ({onPress}) {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.touchableOpacityStyle}
        >
            <Ionicons name="ios-add-circle" size={50} color="green" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 40
    }
})