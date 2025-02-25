import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import color from '../../constants/color';
import Animated, { FadeInDown, SlideInUp } from 'react-native-reanimated';
const {width, height} = Dimensions.get("window");
export default function ApiLoaderAnimated() {
  return (
    <Animated.View style={{zIndex:10, position: "absolute", top: 50, alignSelf: "center"}} entering={SlideInUp.duration(900)} exiting={FadeInDown.duration(900)}>
    <View style={[styles.containerWithShadow, styles.loadingContainer]}>
      <ActivityIndicator size={35} color={color.PRIMARY} />
    </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerWithShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 10,
  },
  loadingContainer: {
    backgroundColor: color.WHITE,
    padding: 10,
    borderRadius: 50
  },
});
