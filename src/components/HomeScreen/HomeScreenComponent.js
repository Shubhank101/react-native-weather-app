import React from 'react';
import {View,Text,StyleSheet,Animated, TouchableOpacity} from 'react-native';
import styles from './HomeScreenCompStyle.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Webservice from 'WeatherApp/src/services/Webservice.js';
import HomeScreenWeatherModel from './HomeScreenWeatherModel.js';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <TouchableOpacity
        onPress={() => {
            homeScreenComp.resetState();
  
            setTimeout(()=> {
              homeScreenComp.animateViews()
            } ,200)
          }
        }       
      >
        <Text style={styles.navBarRightButton}> Reload </Text>
      </TouchableOpacity>
    )
  }



  state = {
      _color : new Animated.Value(0),
      stackOpacity : new Animated.Value(0),
      stackTop : new Animated.Value(200),
      cities : ["Paris", "London", "Delhi"],
      weather : ["10", "14", "34"],
      citiesColors: [['rgba(0, 0, 0, 1)', 'rgba(0, 75, 130, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(0, 191, 255, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(70, 70, 70, 1)']],
      currentCityIndex:0,
      weatherInfo:null,
  };

  resetState = () => {
    this.setState( {
      _color : new Animated.Value(0),
      stackOpacity : new Animated.Value(0),
      stackTop : new Animated.Value(200),
    });
  }

  onSwipeUp(gestureState) {
    var newIndex = this.state.currentCityIndex + 1;
    if (newIndex > 2) {
      newIndex = 0
    }

    this.setState( {
      currentCityIndex: newIndex
    })

    this.resetState();

    setTimeout(()=> {
      this.animateViews()
    } ,200)
  }

  componentDidMount() {
    this.animateViews();
  }

 animateViews = async() => {

    let json = await Webservice.getWeatherData(this.state.cities[this.state.currentCityIndex]);
    let weatherInfo = HomeScreenWeatherModel.getWeatherObjectFromJSON(json);
    this.setState({
      weatherInfo: weatherInfo
    });

    Animated.timing(this.state._color, {
        delay: 0,
        duration: 500,
        toValue: 1
    }).start();

    const duration = 400;

    Animated.parallel([
        Animated.timing(this.state.stackOpacity, {
            delay: 0,
            duration: duration,
            toValue: 1
        }),
        Animated.timing(this.state.stackTop, {
            delay: 0,
            duration: duration,
            toValue: 0
        })
    ]).start();
  }

  render() {

    const color1 =  this.state.citiesColors[this.state.currentCityIndex][0];
    const color2 =  this.state.citiesColors[this.state.currentCityIndex][1];
    var color = this.state._color.interpolate({
      inputRange: [0, 1],
      outputRange: [color1, color2]
    });

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer style={styles.gestureContainer}
          onSwipeUp={(state) => this.onSwipeUp(state)}
          config={config}>

                <Animated.View style={[styles.container,{backgroundColor: color}]}>

                    <Text style={styles.cityTitle}>
                      {this.state.cities[this.state.currentCityIndex]}
                    </Text>
                    
                    <Text style={styles.cityWeatherInfo}>
                      {this.state.weatherInfo && this.state.weatherInfo.temp}°
                    </Text>
  
                    {
                      this.state.cities.map((item,index) =>
                        <Animated.View key={index} style={[styles.stack, { top: this.state.stackTop, opacity: this.state.stackOpacity}]}>
                          <View style={styles.stackInsideWrapperview}>
                            {index === 0 && this.state.weatherInfo &&
                              <View style={styles.weatherView}>
                                <Icon style={styles.icon} name="ios-rainy" size={60} color="#fff"  />
                                <Text style={{fontSize:18, color:"white"}}>
                                  Weather: {this.state.weatherInfo.weather}
                                </Text>
                              </View>
                            }
                            {index === 1 && this.state.weatherInfo &&
                              <Text numberOfLines={1} style={{fontSize:18, color:"white"}}>
                                  Wind: {HomeScreenWeatherModel.formattedWindSpeed(this.state.weatherInfo.wind)}
                              </Text>
                            }
                            {index === 2 && this.state.weatherInfo &&
                              <Text numberOfLines={1} style={{fontSize:18, color:"white"}}>
                                  Humidity: {this.state.weatherInfo.humidity}%
                              </Text>
                            }
                          </View>
                        </Animated.View>
                      )
                    }


                </Animated.View>
      </GestureRecognizer>


    );
  }
}


export default HomeScreenComponent;
