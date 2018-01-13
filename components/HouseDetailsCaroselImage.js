import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
class HouseDetailsCaroselImage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.image}} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    width,
  },

  image: {
    height: 240,
    resizeMode: 'cover',
  }
});

export default HouseDetailsCaroselImage;
