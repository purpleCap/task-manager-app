import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { PlusCircleIcon, PlusIcon, PowerIcon } from 'react-native-heroicons/outline';
import color from '../constants/color';
import headerStyles from '../styles/headerStyles';
import TaskTemplate from '../components/Template/TaskTemplate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_KEY } from '../constants/common';
import TaskService from '../service/task';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, addUserTasks } from '../store/user';
import SafeAreaContainer from '../components/Template/SafeAreaContainer';
import { RefreshControl } from 'react-native-gesture-handler';
import fontFamily from '../constants/fontFamily';
import NoData from '../components/Template/NoData';
const {height, width} = Dimensions.get('window');

// const data = [
//     {
//     id: 1,
//     title: "Microprocessor",
//     description: "A microprocessor is a very small processing unit inside a CPU. It's a single integrated circuit on a computer chip that performs various arithmetic and logic functions on digital signals. Several dozen microprocessors work together inside high-performing servers for data processing and analytics.",
// },
//     {
//     id: 2,
//     title: "Demo task",
//     description: "Description task",
// },
//     {
//     id: 3,
//     title: "Demo task",
//     description: "Description task",
// }
// ];

const Home = ({navigation}) => {
  const userTasks = useSelector(state => state.userDetails.tasks);
  const userData = useSelector(state => state.userDetails.userData);
  const [data, setData] = useState([...userTasks]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    AsyncStorage.clear().then(() => {
      dispatch(addUserData({userData: null}));
      dispatch(addUserTasks({tasks: []}));
      setTimeout(() => {
        navigation.replace("LoginScreen");
      }, 300)
    });
  }, [])
    useFocusEffect(
        useCallback(() => {
          navigation.setOptions({
            headerRight: props => {
              return (
                <View style={styles.alignHorizontal}>
                <Pressable style={{paddingHorizontal: 10}} onPress={() => {navigation.navigate("AddEditScreen", {purpose: "add"})}}>
                  <PlusIcon strokeWidth={2} size={26} color={color.PRIMARY} />
                </Pressable>
                <Pressable style={{paddingHorizontal: 10}} onPress={logoutHandler}>
                  <PowerIcon strokeWidth={2} size={26} color={color.PRIMARY} />
                </Pressable>
                </View>
              );
            },
            headerLeft: props => null,
    
            headerShown: true,
            title: 'All Tasks',
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
  const loadData = async function() {
    setLoading(true);
    const res = await TaskService.getTasks();
    setLoading(false);
    if(res.status) {
      console.log(JSON.stringify(res));
      setData(res.task);
      dispatch(addUserTasks({tasks: res.task}));
    }
  }

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        loadData()
      } catch(err) {
        console.log(JSON.stringify(err))
      }
    })()
  }, [userData]))

  return (
    <SafeAreaContainer style={{
      justifyContent: !loading && data.length === 0 ? "center" : "space-between",
      alignItems: !loading && data.length === 0 ? "center" : ""
    }}>
      { !loading && data.length === 0 && <NoData message='No Task Found'/>}
      <FlatList
        data={data}
        renderItem={({item}) => <TaskTemplate item={item} navigation={navigation} />}
        keyExtractor={item => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
      />
    </SafeAreaContainer>
  )
}



export default Home

const styles = StyleSheet.create({
  alignHorizontal: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center'
  }
})