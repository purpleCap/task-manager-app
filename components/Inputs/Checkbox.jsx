import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CustomCheckbox = ({status="unchecked", onPress=() => {}}) => (
  <>
    <Checkbox.Android label="Item" status={status} onPress={onPress} />
  </>
);

export default CustomCheckbox;

