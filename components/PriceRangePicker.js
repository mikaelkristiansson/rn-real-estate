import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import searchStyles from '../styles/search';
import PricePicker from './PricePicker';

class PriceRangePicker extends Component {

  handleStartChange(value) {
    this.props.onChange('priceRange', [value, this.props.value[1]]);
  }

  handleEndChange(value) {
    this.props.onChange('priceRange', [this.props.value[0], value]);
  }

  constructor() {
      super();
  }

  render() {
    return (
      <View style={searchStyles.container}>
        <Text style={searchStyles.label}>Pris</Text>
        <View style={searchStyles.innerBox}>
          <PricePicker label='Lägsta' onChange={this.handleStartChange.bind(this)} value={this.props.value[0]} />
          <PricePicker label='Högsta' onChange={this.handleEndChange.bind(this)} value={this.props.value[1]} />
        </View>
      </View>
    );
  }
};

export default PriceRangePicker;
