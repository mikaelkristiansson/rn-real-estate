import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

import searchStyles from '../styles/search';
import Colors from '../constants/Colors';

class SearchNoResults extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Image source={require('../assets/images/sad-foxy.png')} style={styles.image} />
        <Text style={styles.text}>
          Oh no! There aren’t any houses 
          that match your search!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    //backgroundColor: Colors.cardBackground
  },

  image: {
    width: 263, 
    height: 218,
  },

  text: {
    flex: 1,
    padding: 40,
    color: Colors.orange,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    backgroundColor: 'transparent'
  },


});

export default SearchNoResults;