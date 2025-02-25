import React, { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import color from '../../constants/color';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { addIs403, addUserData, addUserTasks } from '../../store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import ApiLoaderAnimated from '../Loader/ApiLoaderAnimated';

function SafeAreaContainer({children, style={}}) {
  const toast = useToast();
  const navigation = useNavigation();
  const userData = useSelector(state => state.userDetails.userData);
  const is403 = useSelector(state => state.userDetails.is403);
  const isLoading = useSelector(state => state.userDetails.isLoading);
  console.log("isLoading", isLoading)
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    AsyncStorage.clear().then(() => {
      // dispatch(addUserData({userData: null}));
      dispatch(addIs403({is403: false}));
      dispatch(addUserTasks({tasks: []}));
      toast.show("", {
        data: {
          status: 'info',
          heading: 'Session expired, Try login again',
        }
      });
      setTimeout(() => {
        navigation.replace("LoginScreen");
      }, 300)
    });
  }, []);

  useFocusEffect(useCallback(() => {
    console.log("UD", userData)
    if(is403 && !userData) {
      logoutHandler();
    }
  }, [userData, is403]));

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

export default memo(SafeAreaContainer);
