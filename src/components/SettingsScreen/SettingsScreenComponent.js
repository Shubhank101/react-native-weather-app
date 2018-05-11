import React from "react";
import {View,FlatList,TouchableOpacity} from "react-native";
import styles from './SettingsScreenComponentStyle.js';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreenListItemComponent from './SettingsScreenListItemComponent.js';

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

  state = {
    cities:["Delhi", "London"],
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{width:"100%",}}
          data = {this.state.cities}
          renderItem = {({item}) => {
              return (
                <SettingsScreenListItemComponent
                  item={item}
                  onDeletePress={this.callPress}/>
              );
            }
          }
          keyExtractor = {(item,index) => item}
        />
      </View>
    );
  }

  callPress = (item) => {
    var newCities = this.state.cities;
    newCities.splice(newCities.indexOf(item), 1);
    this.setState({
      cities: newCities
    });
  }

}

export default SettingsScreenComponent;
