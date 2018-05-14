import {combineReducers} from 'redux';
import {SHOW_CITY_MODAL,CLEAR_INFO_MSG} from './actions.js';
import {CITY_MODAL_DISMISS,CITY_ADDED} from '../AddNewCityScreen/actions.js';
import {DELETE_CITY} from '../SettingsScreen/actions.js';

const max_cities_msg = "Max cities added. Please delete one from settings";
const city_already_added = "City already added.";
const swipe_to_change = "Swipe up to change cities";
const MAX_CITIES = 10;

let initialState = { cities:[],
                    shouldShowAddCityPopup:false,
                    infoMessage:null}

const homeScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CITY_MODAL:
      state = Object.assign({}, state, { shouldShowAddCityPopup: true });
      return state;
    case CITY_ADDED:
        var newCities = state.cities.slice();
        if (newCities.length == MAX_CITIES) {
          state = Object.assign({}, state, {  infoMessage : max_cities_msg,
                                              shouldShowAddCityPopup: false
                                            });
          //console.warn(state);
        }
        else {
          if (newCities.indexOf(action.data) == -1) {
             newCities.push(action.data);
             state = Object.assign({}, state, { cities:newCities,
                                                shouldShowAddCityPopup: false,
                                                infoMessage:swipe_to_change});
          }
          else {
            state = Object.assign({}, state,
                { infoMessage : city_already_added,
                  shouldShowAddCityPopup: false
                });
          }
        }

        return state;
    case CITY_MODAL_DISMISS:
        state = Object.assign({}, state, { shouldShowAddCityPopup: false });
        return state;
    case DELETE_CITY:
        var newCities = state.cities.slice();
        newCities.splice(newCities.indexOf(action.data), 1);
        state = Object.assign({}, state, { cities: newCities});
        return state;
    case CLEAR_INFO_MSG:
      state = Object.assign({}, state, { infoMessage: null});
      return state;
    default:
      return state;
  }
};


export default homeScreenReducer;
