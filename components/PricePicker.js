import React, { Component } from 'react';
import {
TouchableOpacity,
StyleSheet,
Text,
View,
PickerIOS,
} from 'react-native';

import Colors from '../constants/Colors';

const PickerItemIOS = PickerIOS.Item;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    label: {
      fontSize: 12,
      color: Colors.textColor,
      textAlign: 'center'
    },
  
    value: {
      fontSize: 22,
      color: Colors.green,
    },
});

class PricePicker extends Component {

//   getDefaultProps() {
//     return {
//       onChange() {},
//       value: 100,
//       label: ''
//     };
//   },

  render() {
    const amounts = [];

    for (let i=100; i<=900; i+=100) {
      amounts.push({ label: i + ' 000 kr', value: i });
    };

    for (let i=1000; i<=15000; i+=500) {
      amounts.push({ label: i + ' 000 kr', value: i });
    };

    amounts.push({ label: 'Vad som helst', value: '' });

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>

        <PickerIOS
          selectedValue={this.props.value}
          onValueChange={this.handleChange.bind(this)}>
          {amounts.map((amount) => 
            (<PickerItemIOS key={'amount-' + amount.value} value={amount.value} label={amount.label} />)
          )}
        </PickerIOS>
      </View>
    );
  }

  handleChange(value) {
    console.log('handleChange', value);
    this.props.onChange(value);
  }
}

export default PricePicker;
