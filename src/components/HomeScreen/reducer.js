import {combineReducers} from 'redux';
import {SHOW_CITY_MODAL} from './actions.js';
import {CITY_MODAL_DISMISS} from '../AddNewCityScreen/actions.js';

let dataState = {shouldShowAddCityPopup:false}

const homeScreenReducer = (state = dataState, action) => {
  switch (action.type) {
    case SHOW_CITY_MODAL:
      state = Object.assign({}, state, { shouldShowAddCityPopup: true });
      return state;
    case CITY_MODAL_DISMISS:
        state = Object.assign({}, state, { shouldShowAddCityPopup: false });
        return state;
    default:
      return state;
  }
};


export default homeScreenReducer;
