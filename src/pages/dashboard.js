import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Text,
  useTheme,
  Heading,
  Pressable,
} from 'native-base';
import WeatherContext from '../contexts/weather';

import layout from '../styles/layout';
import colors from '../styles/colors';

const styles = StyleSheet.create({
  container: layout.container,
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

const weatherIcon = id =>
  id ? `http://openweathermap.org/img/wn/${id}@2x.png` : null;

function DashboardPage(props) {
  const navigateTo = (routeName, routeParams = {}) =>
    props.navigation.navigate(routeName, routeParams);
  const goBack = () => props.navigation.goBack();
  const {gradients} = useTheme();

  const {state, updateWeaterReducer} = useContext(WeatherContext);

  const renderWeatherItem = (weatherData, key, navigateFn) => {
    if (!weatherData) {
      return null;
    }
    const weather = weatherData?.weather?.[0];
    let main = '',
      iconPath = '';
    main = weather?.main?.toLowerCase();
    iconPath = weatherIcon(weather?.icon);
    return (
      <Pressable key={key} onPress={() => navigateFn('city', {weatherData})}>
        <Box
          style={styles.card}
          width="90%"
          bg={{
            linearGradient: gradients?.[main],
          }}
          p={4}
          shadow={3}>
          <View>
            <Text>{weatherData.name}</Text>
          </View>
          <View>
            <Image source={{uri: iconPath}} size="lg" alt={main} />
          </View>
          <View>
            <Text style="">{kelvinToCelsius(weatherData.main?.temp)}°</Text>
          </View>
        </Box>
      </Pressable>
    );
  };

  const renderWeatherItemList = (list, navigateFn) => {
    if (!(list && Array.isArray(list))) {
      return null;
    }
    return (
      <View>
        {list.map((item, index) => renderWeatherItem(item, index, navigateFn))}
      </View>
    );
  };

  const welcomeMessage = 'Good morning Mario!';
  const weatherList = Object.values(state);
  const weatherItemList = renderWeatherItemList(weatherList, navigateTo);

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
