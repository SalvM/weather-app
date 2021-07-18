/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {StatusBar} from 'react-native';
import {AddIcon, Box, extendTheme, NativeBaseProvider, Pressable} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import DashboardPage from './src/pages/dashboard';
import CityPage from './src/pages/city';

import {WeatherProvider} from './src/contexts/weather';

import colors from './src/styles/colors';

const Stack = createStackNavigator();

const stackOptions = {
  city: {
    headerShown: false,
    // headerStyle: {
    //   backgroundColor: colors.primary,
    // },
    // headerTintColor: '#f4f4f4',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  },
};

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const mainTheme = extendTheme({
  gradients: {
    clear: {
      colors: ['#6173DF', '#61a9df'],
      start: [0, 0],
      end: [1, 1],
    },
    rain: {
      colors: ['#426aa8', '#6d89b5'],
      start: [0, 0],
      end: [1, 1],
    },
    clouds: {
      colors: ['#495363', '#959aa3'],
      start: [0, 0],
      end: [1, 1],
    },
    thunderstorm: {
      colors: ['#3e4e69', '#757c8a'],
      start: [0, 0],
      end: [1, 1],
    },
  },
});

function DashboardScreen(props) {
  return (
    <WeatherProvider>
      <DashboardPage {...props} />
    </WeatherProvider>
  );
}

function CityScreen(props) {
  const {weatherData} = props?.route?.params;
  return <CityPage {...weatherData} navigation={props.navigation} />;
};


const App: () => Node = () => {
  return (
    <NativeBaseProvider config={config} theme={mainTheme}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="dashboard"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen
            name="city"
            component={CityScreen}
            options={stackOptions.city}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
