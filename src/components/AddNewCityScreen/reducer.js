import {CITY_ADDED,CITY_MODAL_DISMISS} from './actions.js';
import {CLEAR_CITY_ADDED} from '../HomeScreen/actions.js';

let dataState = {city:null}

const cityReducer = (state = dataState, action) => {
  switch (action.type) {
    case CITY_ADDED:
      state = Object.assign({}, state, { city: action.data, shouldShowAddCityPopup: false });
      return state;
    case CLEAR_CITY_ADDED:
      state = Object.assign({}, state, { city: null, shouldShowAddCityPopup: false });
      return state;
    case CITY_MODAL_DISMISS:
      state = Object.assign({}, state, { shouldShowAddCityPopup: false });
      return state;
    default:
      return state;
  }
};


export default cityReducer;
