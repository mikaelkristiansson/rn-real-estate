import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PropertyTypePickerButton from './PropertyTypePickerButton';
import styles from '../styles/search';

class PropertyTypePicker extends Component {

//   getDefaultProps() {
//     return {
//       onChange() {},
//       value: null
//     };
//   },

constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
}

handleChange(value) {
    this.props.onChange('propertyType', value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Bostadstyp</Text>
        <View style={styles.innerBox}>
          <PropertyTypePickerButton
            text='Villa'
            icon='home'
            value='villa'
            current={this.props.value}
            onPress={this.handleChange} />

          <PropertyTypePickerButton
            text='Bostadsrätt'
            icon='condo'
            value='lägenhet'
            current={this.props.value}
            onPress={this.handleChange} />

          <PropertyTypePickerButton
            text='Radhus'
            icon='multi'
            value='radhus'
            current={this.props.value}
            onPress={this.handleChange} />
        </View>
      </View>
    );
  }
};

export default PropertyTypePicker;
