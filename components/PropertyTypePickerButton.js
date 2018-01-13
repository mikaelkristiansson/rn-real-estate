import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

class PropertyTypePickerButton extends Component {

//   getDefaultProps() {
//       return {
//           onPress() {},
//           text: null,
//           icon: null,
//           value: null,
//           current: null
//       };
//   },
    constructor() {
        super();
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.props.onPress(this.props.value);
      }
  render() {
    const isActive = this.props.value === this.props.current;

    let icon = require('../assets/images/House.png');

    if (this.props.icon == 'condo') icon = require('../assets/images/Condo.png');
    if (this.props.icon == 'multi') icon = require('../assets/images/Multi.png');

    if (isActive) {
      icon = require('../assets/images/House-Active.png');

      if (this.props.icon == 'condo') icon = require('../assets/images/Condo-Active.png');
      if (this.props.icon == 'multi') icon = require('../assets/images/Multi-Active.png');
    }

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.tapAreaView}>
          <Image
            style={styles.icon}
            source={icon}
          />
          <Text style={[styles.text, isActive && styles.active]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  tapAreaView: {
    alignItems: 'center',
  },

  icon: {
    width: 72,
    height: 38
  },

  text: {
    color: 'rgba(0,0,0,0.5)',
    paddingTop: 5
  },

  active: {
    color: Colors.green
  },
});

export default PropertyTypePickerButton;
