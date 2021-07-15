import React, {createContext} from 'react';

const WeatherContext = createContext(null);

async function getCity(cityName) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b2d61a00534fe567518effcb75e1cd58`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    res
      .json()
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}

function weatherReducer(state = {}, action) {
  switch (action.type) {
    case 'addCity':
      return {...state, [action.payload?.key]: action.payload?.value};
    case 'addCities':
      const cities = action.payload;
      if (!(cities && cities.length)) return state;
      const jsonCities = cities?.reduce((a, v) => ({...a, [v.key]: v.value}), {});
      if (!jsonCities) return state;
      return {...state, ...jsonCities};
    case 'removeCity':
      delete state[action.payload.key];
      return state;
    default:
      return state;
  }
}

function WeatherProvider({children}) {
  const [state, dispatch] = React.useReducer(weatherReducer, {});

  const updateWeaterReducer = (cityNameArray = []) => {
    const promises = cityNameArray.map(c => getCity(c));
    Promise.all(promises)
      .then(results => {
        const cities = results.map(c => ({key: c.name, value: c}));
        console.warn({res: cities});
        dispatch({type: 'addCities', payload: cities});
      })
      .catch(console.error);
  };

  return (
    <WeatherContext.Provider value={{state, dispatch, updateWeaterReducer}}>
      {children}
    </WeatherContext.Provider>
  );
}

export {WeatherProvider};
export default WeatherContext;
