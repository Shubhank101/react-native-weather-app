/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {persistor,store} from 'WeatherApp/src/store.js';

import SplashScreenComponent from 'WeatherApp/src/components/SplashScreen/SplashScreenComponent.js';
import HomeScreenComponent from 'WeatherApp/src/components/HomeScreen/HomeScreenComponent.js';
import SettingsScreenComponent from 'WeatherApp/src/components/SettingsScreen/SettingsScreenComponent.js';

const mainStack = StackNavigator({
  Splash: {
    screen: SplashScreenComponent,
  },
  Home: {
    screen: HomeScreenComponent,
  }
});

const ModalStack = StackNavigator(
  {
    Main: {
      screen: mainStack,
    },
    Settings: {
      screen: SettingsScreenComponent,
    },
  },
  {
    mode: 'modal',
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
          <PersistGate loading={<View/>} persistor={persistor}>
            <ModalStack/>
          </PersistGate>        
      </Provider>

    );
  }
}
