import { StyleSheet } from "react-native";
import fontFamily from "../constants/fontFamily";
import color from "../constants/color";

export default headerStyles = StyleSheet.create({
    titleStyles : {
        color: color.PRIMARY,
        fontFamily: fontFamily.promaryFontFamily,
        fontWeight: "400",
        fontSize: 24,
        lineHeight: 23,
        marginBottom: 2,
        paddingHorizontal: '2%',
        // textAlign: 'center'
      }
})