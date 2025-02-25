import axios from 'axios';
import {ACCESS_KEY, API_BASE_URL} from '../constants/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store/store';
import {addIs403, addLoading, addUserData} from '../store/user';

const service = axios.create({
  baseURL: API_BASE_URL,
});

service.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem(ACCESS_KEY);
    store.dispatch(addLoading({isLoading: true}));
    // console.log('INTERCEPTOR REQUEST', JSON.stringify(config));
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
    console.log(error);
    store.dispatch(addLoading({isLoading: false}));
    if (error?.response?.data?.statusCode === 403) {
      store.dispatch(addUserData({userData: null}));
      store.dispatch(addIs403({is403: true}));
    }
    return Promise.reject(error?.response?.data ?? error);
  },
);

export default service;
