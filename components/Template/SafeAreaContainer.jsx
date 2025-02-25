import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import color from '../../constants/color';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { addUserData, addUserTasks } from '../../store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import ApiLoaderAnimated from '../Loader/ApiLoaderAnimated';

export default function SafeAreaContainer({children, style={}}) {
  const toast = useToast();
  const navigation = useNavigation();
  const userData = useSelector(state => state.userDetails.userData);
  const isLoading = useSelector(state => state.userDetails.isLoading);
  console.log("isLoading", isLoading)
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    AsyncStorage.clear().then(() => {
      navigation.replace("LoginScreen");
      dispatch(addUserData({userData: null}));
      dispatch(addUserTasks({tasks: []}));
      toast.show("", {
        data: {
          status: 'info',
          heading: 'Session expired, Try login again',
        }
      });
    });
  }, []);

  useFocusEffect(useCallback(() => {
    console.log("UD", userData)
    if(!userData) {
      logoutHandler();
    }
  }, [userData]));

  console.log(userData)
  return (
    <>
    {isLoading && <ApiLoaderAnimated />}
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.GREY,
        justifyContent: 'space-between',
        ...style
      }}>{children}</SafeAreaView>
    </>
  );
}
