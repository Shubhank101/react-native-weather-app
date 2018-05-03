import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { NavigationActions } from 'react-navigation';

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
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Splash </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   }
});

export default SplashScreenComponent;
