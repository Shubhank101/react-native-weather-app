import React from 'react';
import {View,Text,StyleSheet,Animated, Button} from 'react-native';
import styles from './HomeScreenCompStyle.js';
import apiKey from 'WeatherApp/src/Config/APIKey.js';
var homeScreenComp; // to use in navigation right button
class HomeScreenComponent extends React.Component {

  constructor(props) {
    super(props);
    homeScreenComp = this;
  }

  static navigationOptions = {
    headerTitle:'Home',
    headerTintColor: '#fff',
    headerStyle:{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.3)', zIndex: 100, top: 0, left: 0, right: 0 },
    headerRight: (
      <Button
        onPress={() => {
          homeScreenComp.resetState();

          setTimeout(()=> {
            homeScreenComp.animateViews()
          } ,200)
        }
      }
        title = 'Reload'
        color="#fff"
      />
    )
  }



  state = {
      _color : new Animated.Value(0),
      stack1Opacity : new Animated.Value(0),
      stack1Top : new Animated.Value(200),
      stack2Opacity : new Animated.Value(0),
      stack2Top : new Animated.Value(200),
      stack3Opacity : new Animated.Value(0),
      stack3Top : new Animated.Value(200),
  };

  resetState = () => {
    this.setState( {
      _color : new Animated.Value(0),
      stack1Opacity : new Animated.Value(0),
      stack1Top : new Animated.Value(200),
      stack2Opacity : new Animated.Value(0),
      stack2Top : new Animated.Value(200),
      stack3Opacity : new Animated.Value(0),
      stack3Top : new Animated.Value(200),
    });
  }

  componentDidMount() {
    this.animateViews();
  }

  animateViews = () => {
    Animated.timing(this.state._color, {
        delay: 0,
        duration: 500,
        toValue: 1
    }).start();

    const duration = 400;

    Animated.parallel([
        Animated.timing(this.state.stack1Opacity, {
            delay: 0,
            duration: duration,
            toValue: 1
        }),
        Animated.timing(this.state.stack1Top, {
            delay: 0,
            duration: duration,
            toValue: 0
        })
    ]).start();

    Animated.parallel([
        Animated.timing(this.state.stack2Opacity, {
            delay: 0,
            duration: duration,
            toValue: 1
        }),
        Animated.timing(this.state.stack2Top, {
            delay: 0,
            duration: duration,
            toValue: 0
        })
    ]).start();

    Animated.parallel([
        Animated.timing(this.state.stack3Opacity, {
            delay: 0,
            duration: duration,
            toValue: 1
        }),
        Animated.timing(this.state.stack3Top, {
            delay: 0,
            duration: duration,
            toValue: 0
        })
    ]).start();

  }

  render() {
    var color = this.state._color.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 1)', 'rgba(0, 75, 130, 1)']
    });

    return (
      <Animated.View style={[styles.container, { backgroundColor: color }]}>

        <Text style={styles.cityTitle}> Paris </Text>
        <Text style={styles.cityWeatherInfo}> {apiKey} </Text>

        <Animated.View style={[styles.stack1, { top: this.state.stack1Top, opacity: this.state.stack1Opacity}]}>
          <View style={styles.stackInsideWrapperview}>
          </View>
        </Animated.View>
        <Animated.View style={[styles.stack2, { top: this.state.stack2Top, opacity: this.state.stack2Opacity}]}>
          <View style={styles.stackInsideWrapperview}>
          </View>
        </Animated.View>
        <Animated.View style={[styles.stack3, { top: this.state.stack2Top, opacity: this.state.stack3Opacity}]}>
          <View style={styles.stackInsideWrapperview}>

          </View>
        </Animated.View>
      </Animated.View>

    );
  }
}


export default HomeScreenComponent;
