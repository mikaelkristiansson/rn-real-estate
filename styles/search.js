import React from 'react-native';
const {
  StyleSheet,
} = React;

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    color: Colors.textColor,
    paddingBottom: 5
  },

  innerBox: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

module.exports = styles;