import {Avatar, Button, Card, IconButton} from 'react-native-paper';
import color from '../../constants/color';
import {TrashIcon} from 'react-native-heroicons/outline';
import cardStyles from '../../styles/cardStyles';
import {Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import { memo } from 'react';

const {height, width} = Dimensions.get('window');

function TaskTemplate({item, navigation}) {
  return (
    //     <View
    //     style={[
    //       cardStyles.cardContainerStyles,
    //       {
    //         alignSelf: 'flex-end',
    //         width: '85%',
    //         paddingLeft: '10%',
    //         position: 'relative',
    //         // height: height * 0.16,
    //         elevation: 4,
    //       },
    //     ]}>
    //     <Text style={[styles.heading]}>{item.title}</Text>
    //     <Text style={[styles.text]}>{item.description}</Text>
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         justifyContent: 'space-between',
    //         width: '75%',
    //       }}>

    //       <View
    //         style={{borderRightWidth: 0.7, borderColor: color.GREY_BORDER}}
    //       />

    //     </View>
    //     <Text style={[styles.text, {fontSize: height * 0.016}]}>
    //       {item.location}
    //     </Text>
    //   </View>
    <TouchableOpacity
      style={[
        //   cardStyles.cardContainerStyles,
        {
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: '4%',
          marginTop: 6
        },
      ]}
      activeOpacity={0.8}
      >
      <Card
        theme={{
          colors: {
            primaryContainer: color.GREY,
            primary: color.GREY,
            background: color.GREY,
          },
          roundness: 1
        }}
        style={styles.card}
        onPress={() => navigation.navigate("DetailsScreen", {item})}
        elevation={2}>
        <Card.Title titleStyle={styles.heading} title={item.title} />
        {/* <Card.Actions>
            <View style={{width: "20%"}}>
                <ButtonPrimary text={"Edit"} style={{paddingVertical: 8}} />
            </View>
            <View style={{width: "20%"}}>
                <ButtonPrimary text={"Delete"} style={{paddingVertical: 8}} />
            </View>
        </Card.Actions> */}
      </Card>
    </TouchableOpacity>
  );
}

export default memo(TaskTemplate);

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamily.plusJakartaSansRegular,
    fontSize: height * 0.02,
    fontWeight: '400',
    // lineHeight: 15,
    color: color.GREY_DARKER,
    letterSpacing: 0.2,
    paddingVertical: 0,
    fontStyle: "italic",
    marginVertical: 0,
  },
  text: {
    fontFamily: fontFamily.plusJakartaSansRegular,
    fontSize: height * 0.017,
    fontWeight: '500',
    lineHeight: 17,
    color: color.TEXT_COLOR_BLACK,
    paddingVertical: 1,
  },
  bottomSheetButton: {},
  bottomSheetButtonText: {
    fontFamily: fontFamily.promaryFontFamily,
    fontSize: 14,
  },
  bottomSheetContent: {
    fontFamily: fontFamily.promaryFontFamily,
    fontSize: 13,
  },
  card: {
    borderColor: color.PRIMARY,
    borderWidth: 1,
    borderStyle: 'dashed'
  }
});
