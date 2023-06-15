import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ProductListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch the product data
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Perform API call to fetch products
      const response = await fetch('https://api.example.com/products');
      const data = await response.json();
      
      // Update state with fetched products
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductListScreen;
