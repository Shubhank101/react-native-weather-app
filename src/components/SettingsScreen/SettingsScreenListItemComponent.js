import React from 'React';
import {View,Text,TouchableOpacity} from "react-native";
import styles from './SettingsScreenComponentStyle.js';

class SettingsScreenListItemComponent extends React.Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {this.props.item}
        </Text>
        <TouchableOpacity style={styles.deleteButtonWrapperView}
          onPress={
            () => {
              this.props.onDeletePress(this.props.item);
            }
          }
        >
          <Text style={styles.deleteButton}>DELETE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SettingsScreenListItemComponent;
