import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TextInput,
    Dimensions,
    Pressable,
    Platform,
  } from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import color from '../constants/color';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import InputField from '../components/Inputs/InputField';
import { useToast } from 'react-native-toast-notifications';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import fontFamily from '../constants/fontFamily';
import { validateEmail } from '../common/utils';
import AuthService from '../service/auth';
import { useFocusEffect } from '@react-navigation/native';
  
  const {width, height} = Dimensions.get('window');
  function Signup({navigation}) {
    const toast = useToast();
    const [secureText, setSecureText] = useState({
      value: '',
      isError: false,
      errorMsg: ''
    });
    const [confirmSecureText, setConfirmSecureText] = useState({
      value: '',
      isError: false,
      errorMsg: ''
    });
    const [email, setEmail] = useState({
      value: '',
      isError: false,
      errorMsg: ''
    });
    const [name, setName] = useState({
      value: '',
      isError: false,
      errorMsg: ''
    });
    const [loading, setLoading] = useState(false);


    const reset =  useCallback(() => {
      setSecureText({
        value: '',
        isError: false,
        errorMsg: ''
      });
      setConfirmSecureText({
        value: '',
        isError: false,
        errorMsg: ''
      });
      setName({
        value: '',
        isError: false,
        errorMsg: ''
      });
      setEmail({
        value: '',
        isError: false,
        errorMsg: ''
      });
    }, []);

    useFocusEffect(useCallback(() => {
      return () => {
        reset();
      }
    }, []))


    async function registerHandler() {
      let isValid = true;
      if(!name.value.trim()) {
        setName(p => ({...p, isError: true, errorMsg: "Please enter your name"}));
        isValid = false;
      }
      if(!email.value.trim() || !validateEmail(email.value)) {
        setEmail(p => ({...p, isError: true, errorMsg: "Please enter your valid registered email"}));
        isValid = false;
      }
      if(!secureText.value.trim() || secureText.value.length < 5) {
        setSecureText(p => ({...p, isError: true, errorMsg: "Please enter a password (min. length 5)"}));
        isValid = false;
      }
      if(!confirmSecureText.value.trim()) {
        setConfirmSecureText(p => ({...p, isError: true, errorMsg: "Please re-enter the password"}));
        isValid = false;
      }

      if(confirmSecureText.value.trim() !== secureText.value.trim()) {
        setSecureText(p => ({...p, value: "", isError: true, errorMsg: "Entered password not matched"}));
        setConfirmSecureText(p => ({...p, value: "", isError: true, errorMsg: "Re-enter the password"}));
        isValid = false;
      }

      if(isValid) {
        try {
          const payload = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: secureText.value.trim()
          }
          setLoading(true);
          const res = await AuthService.signup(payload);
          setLoading(false);
          console.log(JSON.stringify(res));
          // {"status":true,"statusCode":201,"message":"Registered successfully","userId":"67bb010a1326e2c35f3cca2c"}
          if(res.status) {
            toast.show('', {
              data: {
                status: 'success',
                heading: res.message,
              }
            });
            navigation.replace("LoginScreen");
          } else {
            
          }

        } catch (err) {
          // {"status":false,"statusCode":422,"message":"Validation failed","data":{"errors":[{"type":"field","value":"demo123@demo.com","msg":"Account already exists with this email","path":"email","location":"body"}]}}
          setLoading(false);
          toast.show('', {
            data: {
              status: 'failure',
              heading: err.message,
            }
          });
          if(err.data) {
            err.data.errors.forEach(obj => {
              if(obj.path === 'email') {
                setEmail(p => ({...p, errorMsg: obj.msg, isError: true}))
              }
              if(obj.path === 'name') {
                setName(p => ({...p, errorMsg: obj.msg, isError: true}))
              }
              if(obj.path === 'password') {
                setSecureText(p => ({...p, errorMsg: obj.msg, isError: true}))
                setConfirmSecureText(p => ({...p, errorMsg: "", isError: false, value: ""}))
              }
            })
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
              Fill the form to register 📄
            </Text>
            <Text style={[styles.subWelcomeText, {textAlign: 'center'}]}>
              Let's get started
            </Text>
          </View>
          <View style={{marginTop: height * 0.05}}>
            <InputField
              fieldName={'Name'}
              value={name}
              setValue={(text) => setName({value: text, isError: false, errorMsg: ""})}
              keyboardType="default"
              required={true}
            />
            <InputField
              fieldName={'Email address'}
              value={email}
              setValue={(text) => setEmail({value: text, isError: false, errorMsg: ""})}
              keyboardType="email-address"
              required={true}
            />
            <InputField
              fieldName={'Password'}
              value={secureText}
              setValue={(text) => setSecureText({value: text, isError: false, errorMsg: ""})}
              keyboardType="Password"
              required={true}
              secureTextEntry={true}
              right={<EyeIcon size={24} color={color.GREY_DARKEST} />}
            />
            <InputField
              fieldName={'Confirm Password'}
              value={confirmSecureText}
              setValue={(text) => setConfirmSecureText({value: text, isError: false, errorMsg: ""})}
              keyboardType="Password"
              required={true}
              secureTextEntry={true}
              right={<EyeIcon size={24} color={color.GREY_DARKEST} />}
            />
            
            <View style={{marginTop: height * 0.06}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text style={[styles.inputFieldName, {fontSize: 14}]}>
                  Already registered ?
                </Text>
                <Pressable onPress={() => navigation.replace("LoginScreen")}>
                  <Text
                    style={[
                      styles.inputFieldName,
                      {fontSize: 14, color: color.PRIMARY},
                    ]}>
                    Log in
                  </Text>
                </Pressable>
              </View>
              <View style={{marginTop: 20}}>
                <ButtonPrimary
                  loading={loading}
                  activeOpacity={0.85}
                  style={{width: '100%'}}
                  text={'Register'}
                  onPress={registerHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  export default Signup;
  
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
  