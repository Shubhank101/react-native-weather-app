import {CITY_ADDED,CITY_MODAL_DISMISS} from './actions.js';

let dataState = {city:null}

const cityReducer = (state = dataState, action) => {
  switch (action.type) {
    case CITY_ADDED:
      state = Object.assign({}, state, { city: action.data });
      return state;
    case CITY_MODAL_DISMISS:
      state = Object.assign({}, state, { shouldShowAddCityPopup: false });
      return state;
    default:
      return state;
  }
};


export default cityReducer;