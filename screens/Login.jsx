import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import color from '../constants/color';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import {TextInput} from 'react-native-paper';
import InputField from '../components/Inputs/InputField';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import fontFamily from '../constants/fontFamily';
import {validateEmail} from '../common/utils';
import AuthService from '../service/auth';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {ACCESS_KEY, USER_DATA} from '../constants/common';
import {useDispatch, useSelector} from 'react-redux';
import {addUserData} from '../store/user';
import Checkbox from '../components/Inputs/Checkbox';
import CustomCheckbox from '../components/Inputs/Checkbox';

const {width, height} = Dimensions.get('window');
function Login({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const [secureText, setSecureText] = useState({
    value: '',
    isError: false,
    errorMsg: '',
  });
  const [email, setEmail] = useState({
    value: '',
    isError: false,
    errorMsg: '',
  });
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(ACCESS_KEY).then(token => {
        AsyncStorage.getItem(USER_DATA).then(data => {
          dispatch(addUserData({userData: {user: JSON.parse(data), token}}));
        });
        if (token) {
          navigation.navigate('HomeScreen');
        }
      });
      return () => {
        setEmail({
          value: '',
          isError: false,
          errorMsg: '',
        });
        setSecureText({
          value: '',
          isError: false,
          errorMsg: '',
        });
      };
    }, []),
  );

  async function loginHandler() {
    let isValid = true;
    if (!email.value.trim() || !validateEmail(email.value)) {
      setEmail(p => ({
        ...p,
        isError: true,
        errorMsg: 'Please enter your valid registered email',
      }));
      isValid = false;
    }
    if (!secureText.value.trim()) {
      setSecureText(p => ({
        ...p,
        isError: true,
        errorMsg: 'Please enter your password',
      }));
      isValid = false;
    }

    if (isValid) {
      try {
        const payload = {
          email: email.value,
          password: secureText.value,
        };
        setLoading(true);

        const res = await AuthService.login(payload);
        console.log(res);
        setLoading(false);
        await AsyncStorage.setItem(ACCESS_KEY, res.token);
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(res.user));
        dispatch(addUserData({userData: {user: res.user, token: res.token}}));
        setTimeout(() => {
          navigation.navigate('HomeScreen');
        }, 500);
      } catch (err) {
        setLoading(false);
        if (!err.status) {
          toast.show('', {
            data: {
              status: 'failure',
              heading: err.message,
            },
          });
        }
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.GREY,
        justifyContent: 'center',
        position: 'relative',
      }}>
      <View style={{marginHorizontal: 24}}>
        <View>
          <Text style={[styles.welcomeText, {textAlign: 'center'}]}>
            Welcome back !👋
          </Text>
          <Text style={[styles.subWelcomeText, {textAlign: 'center'}]}>
            Please login with your credentials
          </Text>
        </View>
        <View style={{marginTop: height * 0.05}}>
          <InputField
            fieldName={'Email address'}
            value={email}
            setValue={text =>
              setEmail({value: text, isError: false, errorMsg: ''})
            }
            keyboardType="email-address"
            required={true}
          />
          <InputField
            fieldName={'Password'}
            value={secureText}
            setValue={text =>
              setSecureText({value: text, isError: false, errorMsg: ''})
            }
            keyboardType="Password"
            required={true}
            secureTextEntry={true}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {/* <View>
              <CustomCheckbox />
              <Text style={[styles.inputFieldName, {fontSize: 14}]}>
                Remember me
              </Text>
            </View> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("ResetScreen")}>
              <Text style={[styles.inputFieldName, {fontSize: 14, textDecorationLine: "underline"}]}>
                Reset password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: height * 0.06}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text style={[styles.inputFieldName, {fontSize: 14}]}>
                Don't have an account ?
              </Text>
              <Pressable onPress={() => navigation.replace('SignupScreen')}>
                <Text
                  style={[
                    styles.inputFieldName,
                    {fontSize: 14, color: color.PRIMARY},
                  ]}>
                  Sign up
                </Text>
              </Pressable>
            </View>
            <View style={{marginTop: 20}}>
              <ButtonPrimary
                loading={loading}
                activeOpacity={0.85}
                style={{width: '100%'}}
                text={'Login'}
                onPress={loginHandler}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  welcomeText: {
    fontWeight: '400',
    fontSize: 24,
    fontFamily: fontFamily.promaryFontFamily,
    lineHeight: 30,
    color: color.ACCENT,
    letterSpacing: 1.05,
  },
  subWelcomeText: {
    fontWeight: '400',
    fontSize: 18,
    fontFamily: fontFamily.promaryFontFamily,
    lineHeight: 30,
    color: color.GREY_DARKEST,
    letterSpacing: 1.05,
  },
  inputField: {
    borderColor: color.GREY_BORDER,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  inputFieldName: {
    fontFamily: fontFamily.promaryFontFamily,
    fontSize: 16,
    fontWeight: '400',
    color: color.GREY_DARKEST,
    marginBottom: 5,
  },
  btnRev: {
    width: width * 0.43,
    height: 50,
    borderRadius: 5,
    borderColor: color.PRIMARY,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 3,
  },
  btnText: {
    color: color.WHITE,
    fontWeight: '600',
    letterSpacing: 1.1,
    fontFamily: fontFamily.promaryFontFamily,
  },
  btnTextRev: {
    color: color.PRIMARY,
    fontWeight: '600',
    letterSpacing: 1.1,
    fontFamily: fontFamily.promaryFontFamily,
  },
});
