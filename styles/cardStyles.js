import { StyleSheet } from "react-native";
import color from "../constants/color";

export default cardStyles = StyleSheet.create({
    cardContainerStyles: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRadius: 10.5,
        backgroundColor: color.ICONBG,
        marginHorizontal: 24,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: color.ICONBG,
        shadowColor: color.DARK_BG_65,
        paddingVertical: 5
      },
      cardWithShadow: {
        elevation: 2,
        shadowColor: color.GREY_DARKER,
        shadowOpacity: 0.4,
        shadowOffset: {width: 4, height: 4},
      },
})