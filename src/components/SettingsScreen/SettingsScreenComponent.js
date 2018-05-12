import React from "react";
import {View,FlatList,TouchableOpacity} from "react-native";
import styles from './SettingsScreenComponentStyle.js';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreenListItemComponent from './SettingsScreenListItemComponent.js';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as SettingsAction from './actions.js';

var settingScreenObj = null;
class SettingsScreenComponent extends React.Component {

  constructor(props) {
      super(props);
      settingScreenObj = this;
  }

  static navigationOptions = {
    title:'Settings',
    headerTintColor: '#fff',
    headerTitleStyle :{ width: '90%', textAlign:'center', alignSelf:'center' },
    headerLeft: (
      <TouchableOpacity onPress={() => {
        settingScreenObj.props.navigation.goBack();
      }}>
        <Icon style={styles.navCloseIcon} name="ios-close-circle" size={32} color="#ddd"/>
      </TouchableOpacity>
    ),
    headerStyle:styles.headerStyle,
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{width:"100%",}}
          data = {this.props.cities}
          renderItem = {({item}) => {
              return (
                <SettingsScreenListItemComponent
                  item={item}
                  onDeletePress={this.deletePressed}/>
              );
            }
          }
          keyExtractor = {(item,index) => item}
        />
      </View>
    );
  }

  deletePressed = (cityName) => {   
    this.props.deleteCity(cityName);
  }  
}

mapStateToProps = (state,props) => {
  return {
    cities: state.homeReducer.cities
  }
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(SettingsAction,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (SettingsScreenComponent);
