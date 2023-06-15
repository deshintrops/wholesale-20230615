import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../assets/colors/colors'; 


const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {/* Hamburger menu */}
        <Ionicons name="menu" size={24} color={colors.textLight} />
      </View>
      <View style={styles.centerContainer}>
        {/* Logo */}
        <Image source={require('../../assets/images/app/logo.png')} style={styles.logo} />
        {/* Name */}
        <Text style={styles.name}>WORKMAN</Text>
      </View>
      <View style={styles.rightContainer}>
        {/* User icon */}
        <Ionicons name="person" size={24} color={colors.textLight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection : 'row',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    color: colors.textLight,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Header;
