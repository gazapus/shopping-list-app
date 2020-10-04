import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import ItemProducto from '../components/ItemProduct';
import AsyncStorage from '@react-native-community/async-storage';

function List({ navigation }) {
    const listName = navigation.getParam('listName');
    const [products, setProducts] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);

    const getItems = async () => {
        const listString = await AsyncStorage.getItem(listName);
        const listObject = listString != null ? JSON.parse(listString) : null;
        setProducts(listObject.items);
        setLoadingItems(false);
    }

    const updateProduct = (index, productUpdated) => {
        let productsCopy = producto.map( x => x);
        productsCopy[index] = productUpdated;
        setProducts(productsCopy);
    }

    useEffect(() => {
        getItems();
    }, []);

    if (loadingItems) return (<ActivityIndicator size="large" color="#00ff00" />)
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => 
                    <ItemProducto product={item} index={index} onChange={() => alert("changing")}/>
                }
            />
        </View>
    )
}

List.navigationOptions = ({ navigation }) => {
    return {
        title: `${navigation.getParam('listName')}`
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default List;