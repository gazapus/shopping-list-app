import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function({estimated, total}) {
    return(
        <View style={styles.bottomBar_container}>
            <View style={styles.bottomBar_estimated_container}>
                <Text style={styles.bottomBar_estimated_value}>
                    ${estimated}
                </Text>
                <Text style={styles.bottomBar_estimated_description}>
                    ESTIMADO
                </Text>
            </View>
            <View style={styles.bottomBar_total_container}>
                <Text style={styles.bottomBar_total_value}>
                    ${total}
                </Text>
                <Text style={styles.bottomBar_total_description}>
                    TOTAL
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar_container: {
        width: '100%',
        backgroundColor: '#8A6400',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'grey',
        paddingTop: 3,
        paddingBottom: 2
    },
    bottomBar_estimated_container:{
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    bottomBar_estimated_value: {
        fontSize: 18,
        backgroundColor: 'white',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5
    },  
    bottomBar_estimated_description:{
        fontSize: 10
    },
    bottomBar_total_container:{
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center'

    },
    bottomBar_total_value: {
        fontSize: 18,
        backgroundColor: 'white',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 5
    },
    bottomBar_total_description: {
        fontSize: 10

    }
})