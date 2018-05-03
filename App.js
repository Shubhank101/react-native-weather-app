/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';


import SplashScreenComponent from 'WeatherApp/src/components/SplashScreen/SplashScreenComponent.js';
import HomeScreenComponent from 'WeatherApp/src/components/HomeScreen/HomeScreenComponent.js';

const StackNavigation = StackNavigator({
  Splash: {
    screen: SplashScreenComponent,
  },
  Home: {
    screen: HomeScreenComponent,
  },
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <StackNavigation/>
    );
  }
}
