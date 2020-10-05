import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, FlatList, ActivityIndicator, View, Text, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemList from '../components/ItemList';
import FloatingButton from '../components/FloatingButton';
import Modal from '../components/Modal';

const listsName = {
    lists: ["Almacen", "Carniceria"]
}

const list1 = {
    name: "Almacen",
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
    }, {
        name: "Milanesa frijol",
        price: 150,
        quantity: 2,
        ready: true
    }]
}

const list2 = {
    name: "Carniceria",
    items: [{
        name: "Asado",
        price: 14,
        quantity: 1.5,
        ready: false
    }, {
        name: "Chorizo",
        price: 150,
        quantity: 2,
        ready: true
    }]
}

function Main({ navigation }) {
    const [loadingLists, setLoadingLists] = useState(true);
    const [modal, setModal] = useState(true);

    const [lists, setLists] = useState([]);

    const storeTestLists = async () => {
        const jsonValue = JSON.stringify(listsName)
        const jsonL1 = JSON.stringify(list1)
        const jsonL2 = JSON.stringify(list2)
        await AsyncStorage.setItem('lists', jsonValue)
        await AsyncStorage.setItem('Almacen', jsonL1)
        await AsyncStorage.setItem('Carniceria', jsonL2)
    }

    const getLists = async () => {
        const listsString = await AsyncStorage.getItem('lists');
        const listObject = listsString != null ? JSON.parse(listsString) : null;
        setLists(listObject.lists);
        setLoadingLists(false);
    }

    const archiveList = (index) => {
        let listsCopy = lists.map(x => x);
        if (index == 0) index = 1;
        listsCopy.splice(index - 1, index);
        setLists(listsCopy)
    }

    useEffect(() => {
        storeTestLists();
        getLists();
    }, [])

    if (loadingLists) return (<ActivityIndicator size="large" color="#00ff00" />)
    return (
        <View style={styles.container}>
            <FlatList
                data={lists}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                    <ItemList
                        listName={item}
                        onSelectList={() => { navigation.navigate("List", { listName: item }) }}
                        onCheckList={() => { archiveList(index) }}
                    />
                )}
            />
            <FloatingButton onPress={() => setModal(true)} />
            <Modal open={modal} setModal={setModal}>
                <Text>asdadad</Text>
                <Text>asdada asdasdasd asd</Text>
                <Button onPress={() => setModal(false)} title="Cerrar" />
            </Modal>
        </View>
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