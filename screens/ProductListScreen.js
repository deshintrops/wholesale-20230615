import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import colors from '../assets/colors/colors';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductItem from '../components/products/ProductItem';
import { getProducts } from '../assets/data/product';
import { log_data } from '../assets/data/system';

const ProductListScreen = ({ route }) => {
  const { propData } = route.params;
  const [propsForItems, setPropsForItems] = useState({
    shareBtnClicked: false,
    invoiceBtnClicked: false,
    stockBtnClicked: false,
  });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [proListTitle, setProListTitle] = useState('Product List');
  const [selectedCount, setSelectedCount] = useState(8);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      shareBtnClicked: true,
    });
    setProListTitle('Share Products');
  };

  const handleInvoiceBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      invoiceBtnClicked: true,
    });
    setProListTitle('Invoice Products');
  };

  const handleStockBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      stockBtnClicked: true,
    });
    setProListTitle('Stock Products');
  };

  const handleCancelBtnClick = () => {
    setPropsForItems({
      ...propsForItems,
      shareBtnClicked: false,
      invoiceBtnClicked: false,
      stockBtnClicked: false,
    });
    setProListTitle('Product List');
  };

  const handleNextBtnClick = () => {
    console.log('button clicked');
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  const renderProductList = () => (
    <View style={styles.content}>
      <Header />
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchText}
          placeholder="Search Products Here"
          keyboardType="default"
          maxLength={15}
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={24} color={colors.textDark} />
        </View>
      </View>

      <View style={styles.proListWrapper}>
        <View style={styles.proListTitleWrapper}>
          <Text style={styles.proListTitle}>{proListTitle}</Text>
          {selectedCount > 0 ? (<Text>8 Selected</Text>):''}
        </View>

        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} props={propsForItems} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {propData.type === 'myProducts' ? (
        (propsForItems.shareBtnClicked ||
          propsForItems.invoiceBtnClicked ||
          propsForItems.stockBtnClicked) ? (
          <View style={styles.bottomButtonsWrapper}>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleCancelBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Cancel</Text>*/}
              <MaterialCommunityIcons
                name="cancel"
                size={24}
                color={colors.red}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleNextBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>
                {propsForItems.shareBtnClicked
                  ? 'Share'
                  : propsForItems.invoiceBtnClicked
                  ? 'Invoice'
                  : 'Stock'}
              </Text>*/}
              {propsForItems.shareBtnClicked ? (
                <Ionicons
                  name="share-social-sharp"
                  size={24}
                  color={colors.secondary}
                />
              ) : propsForItems.invoiceBtnClicked ? (
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color={colors.secondary}
                />
              ) : (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color={colors.secondary}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottomButtonsWrapper}>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleStockBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Stock</Text>*/}
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleShareBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Share</Text>*/}
              <Ionicons
                name="share-social-sharp"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonStyles}
              onPress={handleInvoiceBtnClick}
            >
              {/*<Text style={styles.bottomButtonText}>Invoice</Text>*/}
              <MaterialCommunityIcons
                name="file-document-outline"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
        )
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? renderLoadingIndicator() : renderProductList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchText: {
    flex: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  proListWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  proListTitleWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomButtonsWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: colors.bgDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomButtonStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomButtonText: {
    marginRight: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default ProductListScreen;
