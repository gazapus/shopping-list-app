import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemProduct from '../components/ItemProduct';
import AddButton from '../components/AddButton';
import ShoppingListClass from '../classes/List';
import Modal from '../components/Modal';
import ItemForm from '../components/ItemForm';


function List({ navigation }) {
    const listName = navigation.getParam('listName');
    const [shoppingList, setShoppingList] = useState({});
    const [loadingItems, setLoadingItems] = useState(true);
    const [editingItem, setEditingItem] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({});

    const getShoppingList = async () => {
        const listString = await AsyncStorage.getItem(listName);
        const result = listString != null ? JSON.parse(listString) : null;
        setShoppingList(new ShoppingListClass(listName, result.items));
        setLoadingItems(false);
    }

    const addProduct = async (product) => {
        let updatedShopList = new ShoppingListClass(listName, shoppingList.items);
        try {
            updatedShopList.addItem(product);
            try {
                await AsyncStorage.setItem(listName, JSON.stringify(updatedShopList));
                setShoppingList(updatedShopList);
            } catch {
                alert("Error al guardar");
            }
        } catch {
            alert(`${product.name} ya se encuentra en la lista`);
        }

    }

    const deleteProduct = async (product) => {
        let updatedShopList = new ShoppingListClass(listName, shoppingList.items);
        updatedShopList.deleteItem(product);
        try {
            await AsyncStorage.setItem(listName, JSON.stringify(updatedShopList));
            setShoppingList(updatedShopList);
        } catch {
            alert("Error al guardar");
        }
    }

    const openItemUpdate = (product) => {
        setItemToEdit(product);
        setEditingItem(true);
    }

    const updateItem = async (itemUpdated) => {
        let updatedShopList = new ShoppingListClass(listName, shoppingList.items);
        updatedShopList.updateItem(itemToEdit, itemUpdated);
        try {
            await AsyncStorage.setItem(listName, JSON.stringify(updatedShopList));
            setShoppingList(updatedShopList);
        } catch {
            alert("Error al actualizar");
        } finally {
            setItemToEdit({});
            setEditingItem(false);
        }
    }

    useEffect(() => {
        getShoppingList();
    }, []);

    if (loadingItems) return (<ActivityIndicator size="large" color="#00ff00" />)
    return (
        <ScrollView
            stickyHeaderIndices={[0]}
            style={styles.container}
        >
            <AddButton onSubmit={addProduct} />
            {shoppingList.items.filter(item => !item.ready).map(item => <ItemProduct
                product={item}
                onUpdate={openItemUpdate}
                onDelete={deleteProduct}
            />)}
            <Text>LISTOS</Text>
            {shoppingList.items.filter(item => item.ready).map(item => <ItemProduct
                product={item}
                onUpdate={openItemUpdate}
                onDelete={deleteProduct}
            />)}
            <Modal open={editingItem} setModal={setEditingItem}>
                <View style={styles.modal_editItem}>
                    <Text style={styles.modal_editItem_title}>Actualizar Item</Text>
                    <ItemForm onSubmit={updateItem} item={itemToEdit} />
                </View>
            </Modal>
        </ScrollView>
    )
}

List.navigationOptions = ({ navigation }) => {
    return {
        title: `${navigation.getParam('listName')}`
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    modal_editItem: {
        width: '100%',
        paddingTop: 10,
        paddingLeft: 2,
        paddingRight: 2,
    },
    modal_editItem_title: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default List;