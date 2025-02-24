import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import color from '../../constants/color';
  
  const {width, height} = Dimensions.get('window');
  
  function ButtonPrimary({text, activeOpacity = 0.85, onPress=()=>{}, style={}, loading}) {
    return (
      <TouchableOpacity
        disabled={loading}
        activeOpacity={activeOpacity}
        style={[styles.btnRev, styles.boxWithShadow, style]}
        onPress={onPress}>
        <Text style={[styles.btnTextRev]}>{text}</Text>
      </TouchableOpacity>
    );
  }
  
  export default ButtonPrimary;
  
  const styles = StyleSheet.create({
    boxWithShadow: {
      shadowColor: color.PRIMARY,
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 8,
    },
    btnTextRev: {
      color: color.PRIMARY,
      fontWeight: '600',
      letterSpacing: 1.1,
      fontFamily: 'Euclid Circular A Regular',
      // fontSize: 17
    },
    btnRev: {
      // height: 50,
      paddingVertical: height * 0.02,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.WHITE,
    },
  });
  