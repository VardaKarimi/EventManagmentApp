/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo2() {
  return <Image source={require('../assets/logo3.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    marginBottom: 8,
  },
});