import React from 'react';
import { StyleSheet, View, ScrollView, Modal } from 'react-native';


export default function ({ open, setModal, children }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => setModal(false)}
            statusBarTranslucent ={true}
        >
            <View style={styles.modal_outer_window}>
                <View style={styles.modal_inner_window}>
                    <ScrollView style={styles.modal_content_container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <View style={styles.modal_content_body}>
                            {children}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal_outer_window: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal_inner_window: {
        borderColor: '#989695',
        backgroundColor: '#F9ECE6',
        width: '85%',
        minHeight: '50%',
        maxHeight: '90%',
        alignItems: 'center',
    },
    modal_content_container: {
        width: '100%',
    },
    modal_content_body: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})
