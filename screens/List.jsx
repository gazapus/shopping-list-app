import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, FlatList, ActivityIndicator, Text, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ItemProducto from '../components/ItemProduct';
import AddButton  from '../components/AddButton'

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
        <ScrollView 
            stickyHeaderIndices={[0]}
            style={styles.container}
        >
            <AddButton/>
            <FlatList
                data={products.filter((item) => item.ready)}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => 
                    <ItemProducto product={item} index={index} onChange={() => alert("changing")}/>
                }
            />
            <Text>LISTOS</Text>
            <FlatList
                data={products.filter((item) => !item.ready)}
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