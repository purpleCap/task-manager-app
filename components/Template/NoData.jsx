import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline'
import React from 'react'
import color from '../../constants/color'
import fontFamily from '../../constants/fontFamily'
const {height, width} = Dimensions.get("window");
export default function NoData({message="No data"}) {
  return (
    <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: height*0.1}}>
      <ExclamationTriangleIcon color={color.PRIMARY100} size={width*0.27} strokeOpacity={0.8} strokeWidth={2} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      fontSize: 40, 
      fontWeight: "700", 
      fontFamily: fontFamily.promaryFontFamily, 
      color: color.PRIMARY100
    }
})