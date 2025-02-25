import axios from 'axios';
import {ACCESS_KEY, API_BASE_URL} from '../constants/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store/store';
import {addLoading, addUserData} from '../store/user';

const service = axios.create({
  baseURL: API_BASE_URL,
});

service.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem(ACCESS_KEY);
    // console.log("accessToken", accessToken);
    store.dispatch(addLoading({isLoading: true}));
    console.log('INTERCEPTOR REQUEST', JSON.stringify(config));
    if (accessToken) {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    store.dispatch(addLoading({isLoading: false}));
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    store.dispatch(addLoading({isLoading: false}));
    return response.data;
  },
  async error => {
    store.dispatch(addLoading({isLoading: false}));
    console.log(error.response.data);
    if (error.response.data?.statusCode === 403) {
      store.dispatch(addUserData({userData: null}));
    }
    return Promise.reject(error.response.data);
  },
);

export default service;
