import React from 'react';
import {View,Text,StyleSheet,Animated,Button, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import styles from './HomeScreenCompStyle.js';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Webservice from 'WeatherApp/src/services/Webservice.js';
import HomeScreenWeatherModel from './HomeScreenWeatherModel.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Permissions from 'react-native-permissions';
import Geocoder from 'react-native-geocoder';
import AddNewCityScreenModal from 'WeatherApp/src/components/AddNewCityScreen/AddNewCityScreenModal.js';
import {connect} from 'react-redux';
import * as HomeActions from './actions.js';
import * as AddNewCityActions from 'WeatherApp/src/components/AddNewCityScreen/actions.js';
import Toast from 'react-native-root-toast';

var homeScreenComp; // to use in navigation right button
class HomeScreenComponent extends React.Component {

  constructor(props) {
    super(props);
    homeScreenComp = this;
  }

  static navigationOptions = {
    title:'Weather',
    headerTintColor: '#fff',
    headerTitleStyle :{ width: '90%', textAlign:'center', alignSelf:'center' },
    headerLeft: (
        <TouchableOpacity
              onPress={() => {
                  homeScreenComp.props.navigation.navigate("Settings");
                }
              }
            >

          <Icon style={styles.navBarRightButton} name="ios-settings" size={30} color="#fff"  />
        </TouchableOpacity>
    ),
    headerStyle:{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.3)', zIndex: 100, top: 0, left: 0, right: 0 },
    headerRight: (
      <TouchableOpacity
        onPress={() => {
            homeScreenComp.addCity();
          }
        }
      >
        <Icon style={styles.navBarRightButton} name="ios-add" size={40} color="#fff"  />
      </TouchableOpacity>
    )
  }


  state = {
      _color : new Animated.Value(0),
      stackOpacity : new Animated.Value(0),
      stackTop : new Animated.Value(200),
      cities : [],
      subAdminArea:[],
      attributes: ["Weather", "Wind", "Humidity"],
      citiesColors: [['rgba(0, 0, 0, 1)', 'rgba(0, 75, 130, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(0, 191, 255, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(70, 70, 70, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(220, 70, 70, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(150, 75, 30, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(225, 10, 10, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(100, 100, 100, 1)'],
                     ['rgba(0, 0, 0, 1)', 'rgba(10, 10, 210, 1)']],
      currentCityIndex:0,
      weatherInfo:null,
      isLoading:true
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
    if (newIndex >= this.props.cities.length) {
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

     Permissions.check('location').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response })
      this._handlePermissionResult(response);
    });

    this.animateViews();
  }


  _handlePermissionResult = (result) => {
    if (result == 'authorized') {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          // Position Geocoding
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          

          Geocoder.geocodePosition(location).then(res => {          
            if (res.length > 0 && this.props.cities.length == 0) {
               let geocodingObj = res[0];
               Webservice.getWeatherData_async(geocodingObj.adminArea).then ((data) => {
                 //add admin area
                 this.props.cityAdded(geocodingObj.adminArea);
                  this.setState({ isLoading: false });                 
               })
               .catch(err =>{
                 // add subadmin area // todo add error checking here
                  this.props.cityAdded(geocodingObj.subAdminArea);
                  this.setState({ isLoading: false });                  
               });         
            }
          })
          .catch(err => {
            this.setState({ locationError: err.message })
          })
        },
        (error) => {
          //console.warn(error); this.setState({ error: error.message })
          this.setState({ locationError: error.message })
        },
        { enableHighAccuracy: true, timeout: 20000 },
      );




    }
    else if (result == 'undetermined') {
      this._requestPermission();
    }
    else if (result == 'denied') {
      this.setState({ locationError: "User didn't give location permission" })
    }
  }

  _requestPermission = () => {
      Permissions.request('location').then(response => {

        this.setState({ locationPermission: response })
        this._handlePermissionResult(response);
      })
  }

 animateViews = async() => {
    if (this.props.cities.length == 0) {
      return;
    }
    var json = await Webservice.getWeatherData(this.props.cities[this.state.currentCityIndex]);
    
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

  addCity = () => {
    this.props.showCityModal();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cities.length != this.props.cities.length) {
        setTimeout(()=>{
          this.setState((prevState) => {
            return {
              currentCityIndex: Math.max(this.props.cities.length - 1,0)
            }                   
          });
        
          this.resetState();
          this.animateViews();      
        },300);
        
        
      if (nextProps.cities.length >= 2) {
        let toast = Toast.show('Swipe up to change cities', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,   
        });
        
        setTimeout(function () {
            Toast.hide(toast);
        }, 2000);
      }
      
    }   
  }

  renderWeatherIcon = () => {
    var icon = ""
    switch (this.state.weatherInfo.weather) {
      case "Clouds":
        icon = "ios-cloudy";
        break;
      case "Haze":
        icon = "ios-sunny";
        break;
      case "Clear":
        icon = "ios-sunny";
        break;
      case "Night":
        icon = "ios-moon";
        break;
      case "Rain":
        icon = "ios-rainy";
        break;
    }

    return (<Icon style={styles.icon} name={icon} size={60} color="#fff"  />);
  }

  render() {
    if (this.props.shouldShowAddCityPopup) {
      return (
        <View style={styles.modalContainer}>
          <AddNewCityScreenModal />
        </View>
      );
    }



    if (this.props.cities.length == 0) {

      if (this.state.locationError || !this.state.isLoading) {
        return (
          <View style={styles.onBoardContainer}>
              <Text style={styles.onboardingText}> Go Ahead and add city </Text>
              <Button title="Add city" onPress={() => this.addCity()}/>
          </View>
        )
      }
      else if (this.state.isLoading) {
        //show Onboarding
        return (
          <View style={styles.onBoardContainer}>
              <Text style={styles.onboardingText}> Loading </Text>
          </View>
        )
      }

    }

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
                      {this.props.cities[this.state.currentCityIndex]}
                    </Text>

                    <Text style={styles.cityWeatherInfo}>
                      {this.state.weatherInfo && this.state.weatherInfo.temp}°
                    </Text>

                    {
                      this.state.attributes.map((item,index) =>
                        <Animated.View key={index} style={[styles.stack, { top: this.state.stackTop, opacity: this.state.stackOpacity}]}>
                          <View style={styles.stackInsideWrapperview}>
                            {index === 0 && this.state.weatherInfo &&
                              <View style={styles.weatherView}>
                                {this.renderWeatherIcon()}
                                <Text style={{fontSize:18, color:"white"}}>
                                   {this.state.weatherInfo.weather}
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


mapStateToProps = (state) => {

  return {
    cities:state.homeReducer.cities,
    shouldShowAddCityPopup:state.homeReducer.shouldShowAddCityPopup
  }

}

mapDispatchToProps = (dispatch) => {
  let combinedActions = Object.assign(HomeActions,AddNewCityActions);
  return bindActionCreators(combinedActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreenComponent);
