import React, {useContext, useEffect} from 'react';
import {Center, Container, Flex, Text, Heading, Pressable} from 'native-base';
import WeatherContext from '../contexts/weather';
const kelvinToCelsius = kelvin => Math.floor(kelvin - 273.15);

const renderWeatherItem = (weatherData, key) => {
  if (!weatherData) return null;
  return (
    <Pressable key={key}>
      <Flex direction={'row'}>
        <Center>
          <Text>{weatherData.name}</Text>
        </Center>
        <Center>{'Icon'}</Center>
        <Center>
          <Text>{kelvinToCelsius(weatherData.main?.temp)}</Text>
        </Center>
      </Flex>
    </Pressable>
  );
};

const renderWeatherItemList = list => {
  if (!(list && Array.isArray(list))) return null;
  return list.map(renderWeatherItem);
};

function DashboardPage(props) {
  const {dispatch, state, updateWeaterReducer} = useContext(WeatherContext);
  const welcomeMessage = 'Good morning Mario!';
  const weatherList = Object.values(state);
  const weatherItemList = renderWeatherItemList(weatherList);
  console.warn('weather state', state);
  console.warn({props});

  useEffect(() => {
    console.warn('updating weather...');
    updateWeaterReducer(['Amsterdam', 'London', 'Rome']);
  }, []);

  return (
    <Container>
      <Heading>{welcomeMessage}</Heading>
      <Center>{weatherItemList}</Center>
    </Container>
  );
}

export default DashboardPage;
