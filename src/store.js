import {createStore,combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import cityReducer from 'WeatherApp/src/components/AddNewCityScreen/reducer.js';
import homeReducer from 'WeatherApp/src/components/HomeScreen/reducer.js';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};


const reducer = combineReducers({
  cityReducer,
  homeReducer
})

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
