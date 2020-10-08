import React, { useState, useEffect } from 'react';
import {
    StyleSheet, FlatList, ActivityIndicator, View, Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemList from '../components/ItemList';
import FloatingButton from '../components/FloatingButton';
import InputTextModal from '../components/InputTextModal';
import ShoppingListClass from '../classes/List';

function Main({ navigation }) {
    const [loadingLists, setLoadingLists] = useState(true);
    const [modal, setModal] = useState(false);
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        const listsString = await AsyncStorage.getItem('lists');
        if (listsString) {
            let listsObject = JSON.parse(listsString);
            if (listsObject.lists) {
                setLists(JSON.parse(listsString).lists);
            }
        }
        setLoadingLists(false);
    }

    const deleteList = (index) => {
        let listsCopy = lists.map(x => x);
        listsCopy.splice(index, 1);
        setLists(listsCopy);
        updateLists();
    }

    const createList = async (listName) => {
        let newList = new ShoppingListClass(listName);
        try {
            await AsyncStorage.setItem(listName, JSON.stringify(newList));
            let listsCopy = lists.map(x => x);
            listsCopy.push(listName);
            setLists(listsCopy);
            updateLists();
        } catch (e) {
            alert("Error")
        } finally {
            setModal(false)
        }
    }

    const updateLists = async () => {
        try {
            await AsyncStorage.setItem("lists", JSON.stringify(lists));
        } catch (e) {
            alert("Error at save list")
        }
    }

    useEffect(() => {
        getLists();
    }, [])

    if (loadingLists) return (<ActivityIndicator size="large" color="#00ff00" />)
    return (
        <View style={styles.container}>
            {
                lists.length === 0 ? <Text style={{ textAlign: 'center' }}>No hay listas</Text> : <FlatList
                    data={lists}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => (
                        <ItemList
                            listName={item}
                            onSelectList={() => { navigation.navigate("List", { listName: item }) }}
                            onCheckList={() => { deleteList(index) }}
                        />
                    )}
                />
            }
            <FloatingButton onPress={() => setModal(true)} iconName={"ios-add-circle"} />
            <InputTextModal
                inputDescription="Nombre de la lista"
                defaultText={`Lista del ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
                onSubmit={createList}
                open={modal}
                setModal={setModal}
            />
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