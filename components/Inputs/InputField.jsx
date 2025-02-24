import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Animated,
  } from 'react-native';
  import Reac, {useState, useEffect} from 'react';
  import color from '../../constants/color';
  import fontFamily from '../../constants/fontFamily';
  import { TextInput, HelperText } from 'react-native-paper';
  
  const {width, height} = Dimensions.get('window');
  
  function InputField({
    fieldName,
    value,
    setValue = () => {},
    keyboardType = 'default',
    regex = null,
    check = 1,
    hasError = false,
    errorMsg = '',
    required = false,
    placeholder="",
    right=null,
    secureTextEntry=false,
    multiline=false,
    noOfLines=1,
    affix
  }) {
    const [borderColor, setBorderColor] = useState(color.GREY_BORDER);
    const [errDisplay, setErrorDisplay] = useState(true);
    const [isSecure, setIsSecure] = useState(true)
  

    useEffect(() => {
      isValid();
    }, [check]);
  
    function validRegex() {
      const regexObj = new RegExp(regex);
      return regexObj.test(value);
    }
  
    function isValid() {
      if (
        hasError ||
        (!!regex && check > 1 && !validRegex()) ||
        (!!required && !value && check > 1)
      ) {
        setErrorDisplay(true);
        setBorderColor(color.ERROR);
      } else {
        setBorderColor(color.GREY_BORDER);
      }
    }
  
    return (
      <View style={{marginBottom: height*0.026, position: "relative"}}>
        {/* <Text style={styles.inputFieldName}>{fieldName}</Text>
        <View style={{position: 'relative'}}> */}
        <TextInput
            value={value.value}
            mode="outlined"
            label={fieldName}
            keyboardType={keyboardType}
            placeholder={placeholder}
            right={secureTextEntry ? <TextInput.Icon color={isSecure ? color.PRIMARY : color.GREY_DARKEST} icon={"eye"} onPress={() => setIsSecure(p => !p)} /> : (affix ? <TextInput.Affix text={`/${affix}`} /> : null)}
            textColor={color.GREY_DARKER}
            theme={{
              roundness: 5,
              fonts: fontFamily.promaryFontFamily,
              mode: "exact",
              colors: {
                primary: color.PRIMARY,
                outline: color.PRIMARY
              }         
            }}
            multiline={multiline}
            // outlineColor={color.PRIMARY}
            
            // onFocus={customOnFocus}
            // onBlur={customOnBlur}
            onChangeText={setValue}
            secureTextEntry={secureTextEntry ? isSecure : false}
            numberOfLines={noOfLines}
            scrollEnabled={multiline}
        />
        {value.isError && <HelperText type="error" visible={value.isError} style={{position: "absolute", bottom: -1*height*0.028, left: -10}}>
          {value.errorMsg}
        </HelperText>}
        {/* <Animated.View style={{height: 20}} entering={FadeIn} exiting={FadeOut}>
          {errDisplay && required && !value && check > 1 && (
            <Animated.Text
              style={styles.error}
              entering={FadeIn}
              exiting={FadeOut}>{`${fieldName} is mandatory`}</Animated.Text>
          )}
          {errDisplay && value && !!regex && check > 1 && !validRegex() && (
            <Text
              style={styles.error}
              entering={FadeIn}
              exiting={FadeOut}>{`Invalid ${fieldName}`}</Text>
          )}
          {errDisplay && (hasError && errorMsg) && (
            <Text style={styles.error} entering={FadeIn} exiting={FadeOut}>
              {errorMsg}
            </Text>
          )}
        </Animated.View> */}
        {/* </View> */}
      </View>
    );
  }
  
  export default InputField;
  
  const styles = StyleSheet.create({
    inputField: {
      borderColor: color.GREY_BORDER,
      borderWidth: 1,
      borderBottomWidth: 0.5,
      borderRadius: 20,
      paddingVertical: height * 0.013,
      paddingHorizontal: width * 0.04,
      fontFamily: 'Euclid Circular A Regular',
      letterSpacing: 0.5,
      color: color.GREY_DARKEST,
    },
    inputFieldName: {
      fontFamily: 'Euclid Circular A Regular',
      fontSize: 16,
      fontWeight: '400',
      color: color.TEXT_COLOR_BLACK,
      marginBottom: 10,
    },
    error: {
      color: color.ERROR,
      fontWeight: '200',
      textAlign: 'center',
      fontSize: 11,
      fontFamily: fontFamily.promaryFontFamily,
      letterSpacing: 0.8,
      marginTop: 2,
    },
  });
  