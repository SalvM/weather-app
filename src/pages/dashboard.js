import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  Heading,
  Pressable,
} from 'native-base';
import WeatherContext from '../contexts/weather';
import {Dimensions} from 'react-native';

import layout from '../styles/layout';
import colors from '../styles/colors';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    width,
    height,
  },
  card: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    backgroundColor: colors.primary,
    height: 128,
    marginVertical: 8,
    borderRadius: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const kelvinToCelsius = kelvin => Math.floor(kelvin - 273.15);
const renderWeatherItem = (weatherData, key) => {
  if (!weatherData) {
    return null;
  }
  return (
    <Pressable key={key}>
      <View style={styles.card}>
        <View>
          <Text>{weatherData.name}</Text>
        </View>
        <View>
          <Text>{'icon'}</Text>
        </View>
        <View>
          <Text style="">{kelvinToCelsius(weatherData.main?.temp)}°</Text>
        </View>
      </View>
    </Pressable>
  );
};

const renderWeatherItemList = list => {
  if (!(list && Array.isArray(list))) {
    return null;
  }
  return <View>{list.map(renderWeatherItem)}</View>;
};

function DashboardPage(props) {
  const {dispatch, state, updateWeaterReducer} = useContext(WeatherContext);
  const welcomeMessage = 'Good morning Mario!';
  const weatherList = Object.values(state);
  const weatherItemList = renderWeatherItemList(weatherList);

  useEffect(() => {
    updateWeaterReducer(['Amsterdam', 'London', 'Rome']);
  }, []);

  return (
    <View style={styles.container}>
      <Heading style={layout.avatarTitle}>{welcomeMessage}</Heading>
      <View>{weatherItemList}</View>
    </View>
  );
}

export default DashboardPage;
