import {combineReducers} from 'redux';
import {SHOW_CITY_MODAL} from './actions.js';
import {CITY_MODAL_DISMISS,CITY_ADDED} from '../AddNewCityScreen/actions.js';
import {DELETE_CITY} from '../SettingsScreen/actions.js';


let dataState = { cities:[],
                  shouldShowAddCityPopup:false}

const homeScreenReducer = (state = dataState, action) => {
  switch (action.type) {
    case SHOW_CITY_MODAL:
      state = Object.assign({}, state, { shouldShowAddCityPopup: true });
      return state;
    case CITY_ADDED:
        var newCities = state.cities.slice();
        if (newCities.indexOf(action.data) == -1 && newCities.length < 9) {
           newCities.push(action.data);
        }
        
        state = Object.assign({}, state, { cities:newCities,
                                           shouldShowAddCityPopup: false });
        return state;
    case CITY_MODAL_DISMISS:
        state = Object.assign({}, state, { shouldShowAddCityPopup: false });
        return state;
    case DELETE_CITY:
        var newCities = state.cities.slice();
        newCities.splice(newCities.indexOf(action.data), 1);
        state = Object.assign({}, state, { cities: newCities});        
        return state;
    default:
      return state;
  }
};


export default homeScreenReducer;
