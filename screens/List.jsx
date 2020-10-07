import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, FlatList, ActivityIndicator, Text, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemProducto from '../components/ItemProduct';
import AddButton  from '../components/AddButton'
import ShoppingListClass from '../classes/List';


function List({ navigation }) {
    const listName = navigation.getParam('listName');
    const [shoppingList, setShoppingList] = useState({});
    const [loadingItems, setLoadingItems] = useState(true);

    const getShoppingList = async () => {
        const listString = await AsyncStorage.getItem(listName);
        const result = listString != null ? JSON.parse(listString) : null;
        setShoppingList(result);
        setLoadingItems(false);
    }

    const addProduct = async (product) => {
        let updatedShopList = new ShoppingListClass(listName, shoppingList.items);
        updatedShopList.items.push(product);
        try{
            await AsyncStorage.setItem(listName, JSON.stringify(updatedShopList));
            setShoppingList(updatedShopList);
        } catch {
            alert("Error at save");
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
            <AddButton onSubmit={addProduct}/>
            <FlatList
                data={shoppingList.items.filter((item) => !item.ready)}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => 
                    <ItemProducto product={item} index={index} onChange={() => alert("changing")}/>
                }
            />
            <Text>LISTOS</Text>
            <FlatList
                data={shoppingList.items.filter((item) => item.ready)}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => 
                    <ItemProducto product={item} index={index} onChange={() => alert("changing")}/>
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