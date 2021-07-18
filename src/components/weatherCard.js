import React from 'react';
import moment from 'moment';

import layout from '../styles/layout';

import {
  VStack,
  HStack,
  Avatar,
  Image,
  Text,
  NativeBaseProvider,
  AspectRatio,
  Center,
  Box,
  Stack,
  Heading,
} from 'native-base';

const weatherIcon = id => id ? `http://openweathermap.org/img/wn/${id}@2x.png` : null;

export default function WeatherCard(props) {
  const shortDayName = moment(props?.item?.ms).format('dddd');
  const temperature = props?.item?.temp;
  const main = props?.item?.main;
  const iconPath = weatherIcon(props?.item?.icon);
  return (
    <Box
      style={{minHeight: 128, minWidth: 96, borderRadius: 8}}
      bg="rgba(255, 255, 255, 0.2)"
      p={2}
      m={2}
      rounded="lg"
      maxWidth="90%">
      {shortDayName && (
        <Text color="white" fontWeight="bold" style={layout.h3}>
          {shortDayName}
        </Text>
      )}
      {temperature && (
        <Text color="white" fontWeight="bold" fontSize="3xl" textAlign="center">
          {temperature}°
        </Text>
      )}
      <Image source={{uri: iconPath}} size="lg" alt={main} resizeMode="cover" />
    </Box>
  );
}
