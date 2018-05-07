import {combineReducers} from 'redux';
import {CITY_ADDED} from './actions.js';

let dataState = {city:null}

const cityReducer = (state = dataState, action) => {
  switch (action.type) {
    case CITY_ADDED:
      state = Object.assign({}, state, { city: action.data });
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cityReducer
})

export default rootReducer;
