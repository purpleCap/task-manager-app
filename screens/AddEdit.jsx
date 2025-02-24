import {SafeAreaView, StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import {Card, Divider} from 'react-native-paper';
import color from '../constants/color';
import {useFocusEffect} from '@react-navigation/native';
import headerStyles from '../styles/headerStyles';
import fontFamily from '../constants/fontFamily';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import InputField from '../components/Inputs/InputField';
import TaskService from '../service/task';
import { useToast } from 'react-native-toast-notifications';
import SafeAreaContainer from '../components/Template/SafeAreaContainer';

const {height, width} = Dimensions.get('window');

const AddEdit = ({navigation, route}) => {
  const toast = useToast();
    const purpose = route.params.purpose;
    const item = route.params?.item;
    const [title, setTitle] = useState({value: item ? item.title: '', errorMsg: '', isError: false});
    const [description, setDescription] = useState({value: item ? item.description : '', errorMsg: '', isError: false});
  console.log(item);
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
        title: purpose.toLowerCase() === "edit" ? "Edit Task" : "Add New Task",
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

      return () => {
        setTitle({value: '', errorMsg: '', isError: false});
        setDescription({value: '', errorMsg: '', isError: false});
      }
    }, []),
  );

  function titleHandler(text) {
    setTitle(p => ({...p, value: text, isError: false, errorMsg: ""}))
  }
  function descriptionHandler(text) {
    setDescription(p => ({...p, value: text, isError: false, errorMsg: ""}))
  }

  const saveHandler = async () => {
    let isValid = true;
    if(!title.value.trim()) {
      setTitle( p=> ({...p, isError: true, errorMsg: "Title is mandatory"}));
      isValid = false;
    }
    if(isValid) {
      try {
        const payload = {
          title: title.value.trim(),
          description: description.value.trim()
        }
        if(item && item._id) {
          const res = await TaskService.update(item._id, payload);
          if(res.status) {
            navigation.navigate("HomeScreen");
             toast.show('', {
              data: {
                status: 'success',
                heading: res.message,
              }
            });
          }
        } else {
          const res = await TaskService.create(payload);
          console.log(res)
          if(res.status) {
            // toast.show('', {
            //   data: {
            //     status: 'success',
            //     heading: res.message,
            //   }
            // });
            navigation.navigate("HomeScreen");
          } else {
    
          }
        }
      } catch(err) {
        console.log(err);
        toast.show('', {
          data: {
            status: 'failure',
            heading: err.message,
          }
        });
  
        err.data.errors.forEach(obj => {
          if(obj.path === 'title') {
            setTitle( p=> ({...p, isError: true, errorMsg: "Title is mandatory"}));
          }
        })
      }
    }
  };

  return (
    <>
      <SafeAreaContainer
        style={{
          paddingHorizontal: '5%',
        }}>
        <View>
          <Text style={styles.heading}>Title</Text>
          <InputField value={title} setValue={titleHandler} affix={25} />
          <Text style={styles.heading}>Description</Text>
          <InputField value={description} setValue={descriptionHandler} multiline={true} noOfLines={18} affix={100} />
        </View>
      </SafeAreaContainer>
      <View style={styles.btnContainer}>
        <View style={{width: '100%'}}>
          <ButtonPrimary onPress={saveHandler} text={purpose.toLowerCase() === "edit" ? "Save" : "Add"} style={{paddingVertical: 12, borderColor: color.PRIMARY, borderWidth: 1}} />
        </View>
      </View>
    </>
  );
};

export default AddEdit;

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamily.ralewayThin,
    fontSize: 20,
    color: color.ACCENT,
    marginBottom: 4
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
