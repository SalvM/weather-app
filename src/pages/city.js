import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Box, Image, Text, useTheme} from 'native-base';
import moment from 'moment';

import colors from '../styles/colors';
import layout from '../styles/layout';
import WeatherAPI from './../services/weather';

import WeatherCard from '../components/weatherCard';

const styles = StyleSheet.create({
  container: {
    ...layout.container,
    backgroundColor: colors.primary,
  },
  temp: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whiteCentered: {
    color: colors.white,
    textAlign: 'center',
  },
});

const weatherIcon = id => id ? `http://openweathermap.org/img/wn/${id}@2x.png` : null;

async function getCityFuture(cityName, lat, lon) {
  return new Promise(async (resolve, reject) => {
    const res = await WeatherAPI.getCityFuture(cityName, lat, lon);
    res
      .json()
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

const kelvinToCelsius = kelvin =>
  isNaN(kelvin) ? null : Math.floor(kelvin - 273.15);

const renderDailyItem = day => {
  return <WeatherCard {...day} />;
};
const renderDailyList = list => {
  return (
    <FlatList
      horizontal={true}
      data={list}
      keyExtractor={e => e.index}
      renderItem={renderDailyItem}
    />
  );
};

export default function City(props) {
  const {gradients} = useTheme();
  const weather = props.weather[0];
  const temp = kelvinToCelsius(props.main?.temp);
  const shortDayName = moment(props?.dt).format('dddd DD, MMMM');

  const [future, setFuture] = useState({});

  useEffect(() => {
    const {lat, lon} = props?.coord;
    getCityFuture(lat, lon).then(setFuture);
  }, []);

  const hourlyWeather = () => {
    const list = future?.hourly;
    if (!(list && Array.isArray(list))) {
      return [];
    }
    return list.map((d: any) => ({
      main: d.weather?.[0]?.main,
      temp: kelvinToCelsius(d.temp),
      ms: d.dt * 1000,
    }));
  };

  const dailyWeather = () => {
    const list = future?.daily;
    if (!(list && Array.isArray(list))) {
      return [];
    }
    return list.map((d: any, index: number) => ({
      icon: d.weather?.[0]?.icon,
      index,
      main: d.weather?.[0]?.main,
      ms: d.dt * 1000,
      temp: kelvinToCelsius(d.temp?.day),
    }));
  };

  const dailyList = renderDailyList(dailyWeather());
  const iconPath = weatherIcon(weather?.icon);
  const main = weather?.main?.toLowerCase();

  return (
    <Box
      style={styles.container}
      bg={{
        linearGradient: gradients?.[main],
      }}>
      <Text
        fontSize={'md'}
        style={styles.whiteCentered}
        fontWeight="bold"
        m="2">
        {shortDayName}
      </Text>
      <Text fontSize={'md'} style={styles.whiteCentered}>
        {weather?.main}
      </Text>
      <View flexDirection="row" alignItems="center" justifyContent="center">
        {iconPath && <Image source={{uri: iconPath}} size="lg" alt={main} />}
        {temp && (
          <Text fontSize={'7xl'} style={styles.temp}>
            {temp}°
          </Text>
        )}
      </View>
      <View>{dailyList}</View>
    </Box>
  );
}
