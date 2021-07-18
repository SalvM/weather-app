import React from 'react';

import {Text, View} from 'native-base';

export default function Header(props) {
  return (
    <View flex={1} flexDirection="row" style={{maxHeight: 48}}>
      <View flex={1} justifyContent="center" alignItems="flex-start">
        {props.leftButton}
      </View>
      <View flex={2} justifyContent="center">
        <Text fontWeight="bold" fontSize="2xl" color="white" textAlign="center">
          {props.title}
        </Text>
      </View>
      <View flex={1} justifyContent="center" alignItems="flex-end">
        {props.rightButton}
      </View>
    </View>
  );
}
