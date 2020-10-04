import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemList from '../components/ItemList';

const exampleList = {
    lists: [
        {
            name: "Lista Batata",
            created: new Date(),
            items: [{
                name: "Polenta",
                price: 14,
                quantity: 1.5,
                ready: false
            }, {
                name: "Milanesa",
                price: 150,
                quantity: 2,
                ready: true
            }
            ]
        },
        {
            name: "Lista Papa",
            created: new Date(),
            items: [{
                name: "Pollo",
                price: 222,
                quantity: 1.5,
                ready: true
            }, {
                name: "Sanguncho",
                price: 150,
                quantity: 5,
                ready: false
            }
            ]
        }
    ]
}

const exampleArchivedList = {
    lists: [
        {
            name: "Lista Pera",
            created: new Date(),
            items: [{
                name: "Polenta",
                price: 14,
                quantity: 1.5,
                ready: false
            }, {
                name: "Milanesa",
                price: 150,
                quantity: 2,
                ready: true
            }
            ]
        },
        {
            name: "Lista Durazno",
            created: new Date(),
            items: [{
                name: "Pollo",
                price: 222,
                quantity: 1.5,
                ready: true
            }, {
                name: "Sanguncho",
                price: 150,
                quantity: 5,
                ready: false
            }
            ]
        }
    ]
}

function Main({ navigation }) {
    const [loadingLists, setLoadingLists] = useState(true);
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        const jsonValue = JSON.stringify(exampleArchivedList)
        await AsyncStorage.setItem('archivedLists', jsonValue)
        const listsString = await AsyncStorage.getItem('lists');
        const listObject = listsString != null ? JSON.parse(listsString) : null;
        setLists(listObject.lists);
        setLoadingLists(false);
    }

    useEffect(() => {
        getLists();
    }, [])

    return (
            <FlatList style={styles.container}
                data={lists}
                keyExtractor={(item, index) => item.name}
                renderItem={({ item }) => (
                    <ItemList
                        list={item}
                        onSelectList={() => {navigation.navigate("List", {list: item})}}
                        onCheckList={(param) => {alert(param)}}
                    />
                )}
            />
    )
}

Main.navigationOptions = {
    title: 'Shopping List'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E4FC',
    },
});

export default Main;