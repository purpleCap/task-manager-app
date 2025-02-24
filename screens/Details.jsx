import {SafeAreaView, StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import {Card, Divider} from 'react-native-paper';
import color from '../constants/color';
import {useFocusEffect} from '@react-navigation/native';
import headerStyles from '../styles/headerStyles';
import fontFamily from '../constants/fontFamily';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import TaskService from '../service/task';
import { useToast } from 'react-native-toast-notifications';
import SafeAreaContainer from '../components/Template/SafeAreaContainer';

const {height, width} = Dimensions.get('window');

const Details = ({navigation, route}) => {
  const toast = useToast();
  const item = route.params.item;
  // console.log(item);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: props => {
          return (
            <Pressable style={{paddingHorizontal: 10}} onPress={() => {navigation.goBack()}}>
              <ArrowLeftIcon strokeWidth={2} size={24} color={color.PRIMARY} />
            </Pressable>
          );
        },
        // headerLeft: props => null,

        headerShown: true,
        title: item.title,
        headerStyle: {
          backgroundColor: color.GREY,
          height: height * 0.1,
        },
        headerTintColor: '#fff',
        headerTitleStyle: headerStyles.titleStyles,
        headerIconStyle: {
          color: color.GREY_DARKEST,
        },
      });
    }, []),
  );

  async function deleteHandler() {
    try {
      setLoading(true);
      const res = await TaskService.delete(item._id);
      setLoading(false);
      if(res.status) {
        navigation.navigate("HomeScreen");
        toast.show("", {
          data: {
            status: 'success',
            heading: err.message,
          }
        });
      }
    } catch {
      setLoading(false);
      toast.show("", {
        data: {
          status: 'failure',
          heading: err.message,
        }
      });
    }
  }
  return (
    <>
      <SafeAreaContainer
        style={{
          paddingHorizontal: '5%',
        }}>
        <View>
          <Text style={styles.heading}>Description</Text>
          {/* <Divider theme={{colors: {primary: color.GREY_DARKEST}}} /> */}
          <Text style={styles.description}>{item.description ? item.description : '__NO_DESCRIPTION__'}</Text>
        </View>
      </SafeAreaContainer>
      <View style={styles.btnContainer}>
        <View style={{width: '49%'}}>
          <ButtonPrimary onPress={() => navigation.navigate("AddEditScreen", {purpose: "edit", item})} text={'Edit'} style={{paddingVertical: 12, borderColor: color.PRIMARY, borderWidth: 1}} />
        </View>
        <View style={{width: '49%'}}>
          <ButtonPrimary loading={loading} text={'Delete'} style={{paddingVertical: 12, borderColor: color.PRIMARY, borderWidth: 1}} onPress={deleteHandler} />
        </View>
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamily.ralewayThin,
    fontSize: 24,
    color: color.ACCENT,
  },
  description: {
    color: color.GREY_DARKER,
    fontSize: 18,
    fontFamily: fontFamily.promaryFontFamily,
    fontStyle: 'italic',
    textDecorationColor: color.GREY_DARKER,
    textDecorationLine: "underline"
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    backgroundColor: color.GREY05,
    borderTopColor: color.PRIMARY,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
