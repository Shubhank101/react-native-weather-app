import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './SplashScreenCompStyle.js';
import Icon from 'react-native-vector-icons/Ionicons';

class SplashScreenComponent extends React.Component {
  static navigationOptions = {
    header:null,
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  componentDidMount() {
    setTimeout( () => {
      this.resetNavigation('Home');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="ios-rainy" color="#555" size={140}/>
        <Text style={styles.splashText}> Made with love using <Text style={styles.reactNativeText}>React Native</Text> </Text>
      </View>
    );
  }
}

export default SplashScreenComponent;
