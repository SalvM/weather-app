import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  AddIcon,
  ArrowBackIcon,
  Box,
  Image,
  Pressable,
  Text,
  useTheme,
  View,
} from 'native-base';
import moment from 'moment';

import colors from '../styles/colors';
import layout from '../styles/layout';
import WeatherAPI from './../services/weather';

import WeatherCard from '../components/weatherCard';
import Timeline from '../components/timeline';
import Header from '../components/header';

const styles = StyleSheet.create({
  container: {
    ...layout.container,
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

const weatherIcon = id =>
  id ? `http://openweathermap.org/img/wn/${id}@2x.png` : null;

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

function HourlyTimeline(props) {
  const {list} = props;
  if (!(list && Array.isArray(list)) && list.length) {
    return null;
  }

  const renderChildren = (item, key) => {
    const size = key === 0 ? 'lg' : 'md';
    const weight = key === 0 ? 'bold' : '200';
    return (
      <View key={`child_${key}`}>
        <Text color="white" fontSize={size} fontWeight={weight} mt={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  const data = list.map(item => {
    const time = moment(item.ms).format('h a');
    const title = `${item.temp}°`;
    const lineColor = colors.white;
    const lineWidth = 3;
    return {time, title, lineColor, lineWidth};
  });

  return (
    <View>
      <Timeline datasource={data} renderChildren={renderChildren} />
    </View>
  );
}

export default function City(props) {
  const {gradients} = useTheme();
  const weather = props.weather[0];
  const temp = kelvinToCelsius(props.main?.temp);
  const shortDayName = moment(props?.dt).format('dddd DD, MMMM');

  const [future, setFuture] = useState({});

  const goBack = () => props.navigation.goBack();

  useEffect(() => {
    const {lat, lon} = props?.coord;
    getCityFuture(lat, lon).then(setFuture);
  }, []);

  const hourlyWeather = () => {
    let list = Object.assign([], future?.hourly);
    if (!(list && Array.isArray(list))) {
      return [];
    }

    const max_hours = 23;
    if (list.length > max_hours) {
      list = list.slice(0, list.length - max_hours - 1);
    }

    return list.map((d: any) => ({
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

  const renderHeaderLeftButton = cb => (
    <Pressable onPress={cb}>
      <ArrowBackIcon color={colors.white} size={7} ml={3} />
    </Pressable>
  );
  const renderHeaderRightButton = cb => (
    <Pressable onPress={cb}>
      <AddIcon color={colors.white} size={5} mr={5} />
    </Pressable>
  );

  const dailyList = renderDailyList(dailyWeather());
  const iconPath = weatherIcon(weather?.icon);
  const main = weather?.main?.toLowerCase();

  const headerLeftButton = renderHeaderLeftButton(goBack);
  const headerRightButton = renderHeaderRightButton();

  return (
    <Box
      style={styles.container}
      bg={{
        linearGradient: gradients?.[main],
      }}>
      <Header
        title={props?.name}
        leftButton={headerLeftButton}
        rightButton={headerRightButton}
      />
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
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        my="6">
        {iconPath && <Image source={{uri: iconPath}} size="lg" alt={main} />}
        {temp && (
          <Text fontSize={'7xl'} style={styles.temp}>
            {temp}°
          </Text>
        )}
      </View>
      <View>
        <HourlyTimeline list={hourlyWeather()} />
      </View>
      <View>{dailyList}</View>
    </Box>
  );
}
