import React from 'react';
import Modal from "react-native-modal";
import {View,Text,TextInput,TouchableOpacity,Button} from 'react-native';
import styles from './AddNewCityCompStyle.js';
import Autocomplete from 'react-native-autocomplete-input';
import sourceData from 'WeatherApp/src/data/cities.json';

export default class AddNewCityScrenModal extends React.Component {
  state = {
    isVisible:true,
    query:null,
  }

  onDismissModal = () => {
   this.setState({ isVisible: false })
  }


  render() {
    var data = sourceData.data;
    if (this.state.query) {
      const query = this.state.query;
      data  = data.filter(function (str) { return str.indexOf(query) > -1; });
    }

    return (
       <View style={styles.container}>
         <View style={styles.modalContainer}>
           <Autocomplete
              underlineColorAndroid='white'
              containerStyle={{ width:"100%"}}
              data={data.length == 1 && data[0] == this.state.query ? undefined : data}
              defaultValue={this.state.query}
              placeholder="Enter City"
              onChangeText={text => this.setState({ query: text })}
              renderItem={item => (
                <TouchableOpacity onPress={() => this.setState({ query: item })}>
                  <Text style={{fontSize:16, color:"#222", padding:3, height:30}}>{item}</Text>
                </TouchableOpacity>
              )}>
            </Autocomplete>
         </View>
           <TouchableOpacity style={styles.doneButtonWrapper} onPress={()=> {}}>
             <Text style={styles.doneText}>DONE</Text>
           </TouchableOpacity>
      </View>

    );
  }
}
