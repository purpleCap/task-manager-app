import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Pressable
  } from 'react-native';
import React, {useState, useCallback} from 'react';
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
  function ResetPassword({navigation}) {
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


    async function resetPasswordHandler() {
      let isValid = true;
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
            email: email.value.trim(),
            password: secureText.value.trim()
          }
          setLoading(true);
          const res = await AuthService.reset(payload);
          setLoading(false);
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
              Reset your password 📄
            </Text>
            <Text style={[styles.subWelcomeText, {textAlign: 'center'}]}>
              fill and submit
            </Text>
          </View>
          <View style={{marginTop: height * 0.05}}>
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
            />
            <InputField
              fieldName={'Confirm Password'}
              value={confirmSecureText}
              setValue={(text) => setConfirmSecureText({value: text, isError: false, errorMsg: ""})}
              keyboardType="Password"
              required={true}
              secureTextEntry={true}
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
                  Back to welcome screen ?
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
                  text={'Reset'}
                  onPress={resetPasswordHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  export default ResetPassword;
  
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
  