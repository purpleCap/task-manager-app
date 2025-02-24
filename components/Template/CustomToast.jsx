import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import color from '../../constants/color';
import fontFamily from '../../constants/fontFamily';

const CustomToast = ({status, heading, describe}) => {
  const showColor = useMemo(() => {
    let bg = color.GREY;
    let borderColor = color.GREY_BORDER;
    switch (status) {
      case 'success':
        bg = '#ddfbf4';
        borderColor = '#13A180';
        break;
      case 'failure':
        bg = '#f6dede';
        borderColor = '#FF0000'
        break;
      case 'info':
        bg = '#fff5e0';
        borderColor = '#FFAA00'
        break;
      default:
        bg = color.GREY;
        borderColor = color.GREY_BORDER
    }
    return {bg, borderColor};
  }, [status]);

  return (
    <View
      style={{
        // left:'4%',
        // bottom: 60,
        backgroundColor: showColor.bg,
        borderColor: showColor.borderColor,
        borderWidth:1,
        width: '95%',
        // position: 'absolute',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: showColor.bg,
        shadowOpacity: 0.7,
        shadowRadius: 2,
        shadowOffset: {width: 0, height: 1},
        elevation: 2,
        
      }}>
      {/* {status === "success" ? <CheckCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} /> : (status === "failure" ? <XCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} /> : <ExclamationCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} />)} */}
      <View>
        <Text
          style={{
            color: showColor.borderColor,
            fontWeight: '500',
            marginLeft: 10,
            fontSize: 17,
            letterSpacing: 0.6,
            fontFamily: fontFamily.promaryFontFamily,
          }}>
          {!!heading ? heading : (status === "success" ? "Success" :  (status === 'warning' ? 'Warning' : 'Something went wrong'))}
        </Text>
        {!!describe && (
          <Text
            style={{
              color: showColor.borderColor,
              fontWeight: '500',
              marginLeft: 10,
              fontSize: 13,
              paddingVertical: 5,
              letterSpacing: 0.8,
              fontFamily: fontFamily.promaryFontFamily
            }}>
            {describe}
          </Text>
        )}
      </View>
    </View>
  );
  

};

export default CustomToast;

