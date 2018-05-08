import {createStore,combineReducers} from 'redux';


import cityReducer from 'WeatherApp/src/components/AddNewCityScreen/reducer.js';
import homeReducer from 'WeatherApp/src/components/HomeScreen/reducer.js';

const reducer = combineReducers({
  cityReducer,
  homeReducer
})
export default createStore(reducer);
