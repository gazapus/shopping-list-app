import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemProduct from '../components/ItemProduct';
import AddButton from '../components/AddButton'
import ShoppingListClass from '../classes/List';


function List({ navigation }) {
    const listName = navigation.getParam('listName');
    const [shoppingList, setShoppingList] = useState({});
    const [loadingItems, setLoadingItems] = useState(true);

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

    const updateProduct = async (product) => {

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
            <FlatList
                data={shoppingList.items.filter((item) => !item.ready)}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) =>
                    <ItemProduct
                        product={item}
                        index={index}
                        onUpdate={() => alert("changing")}
                        onDelete={deleteProduct}
                    />
                }
            />
            <Text>LISTOS</Text>
            <FlatList
                data={shoppingList.items.filter((item) => item.ready)}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) =>
                    <ItemProduct
                        product={item}
                        index={index}
                        onUpdate={() => alert("changing")}
                        onDelete={deleteProduct}
                    />
                }
            />
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
});

export default List;