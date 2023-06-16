import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../assets/colors/colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { CheckBox } from 'react-native-elements';

import { log_data } from '../../assets/data/system';

const ProductItem = ({ product, props }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      {((props.shareBtnClicked || props.invoiceBtnClicked || props.stockBtnClicked) && log_data.log_userType === 'supplier') ? (
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            containerStyle={styles.checkboxStyles}
            checked={isChecked}
            onPress={handleCheckBoxToggle}
          />
        </View>
      ) : null}

      <View style={styles.cardWrapper}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity>
            <Image source={product.image} style={styles.imageStyles} />
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.nameStyles} numberOfLines={2}>
              {product.name}
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                style={styles.iconStyles}
                name="chevron-double-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.priceStyles}>${product.price}</Text>
            <View style={styles.qtyWrapper}>
              <Text style={styles.qtyStyles}>Avb Qty: {product.qty}</Text>
              <View
                style={[
                  styles.statusWrapper,
                  { alignItems: product.qty > 0 ? 'center' : 'flex-start' },
                ]}
              >
                <Text style={styles.statusText}>
                  {product.qty > 0 ? 'In Stock' : 'Out of Stock'}
                </Text>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: product.qty > 0 ? colors.green : colors.red },
                  ]}
                ></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  checkBoxWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkboxStyles: {
    padding: 0,
  },
  cardWrapper: {
    flex: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
    height: 120,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 2,
    padding: 5,
  },
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  textWrapper: {
    flex: 3,
    padding: 5,
    justifyContent: 'space-between',
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameStyles: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 10,
  },
  iconStyles: {
    flex: 2,
  },
  priceStyles: {
    fontSize: 16,
  },
  qtyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  qtyStyles: {
    marginTop: 5,
    fontSize: 12,
    color: colors.gray,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    marginLeft: 5,
    borderRadius: 50,
  },
});

export default ProductItem;
