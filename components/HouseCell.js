import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

import Colors from '../constants/Colors';

import moment from 'moment';
const { width, height } = Dimensions.get('window');

class HouseCell extends Component {

    sub = (base, exponent) => {
        return (
        <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={[styles.iconText, {fontSize: 13, marginLeft: 0}]}>{base}</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={[styles.iconText, {fontSize: 10, marginLeft: 0, lineHeight: 18}]}>{exponent}</Text>
            </View>
        </View>
        );
    }

  render() {
    let ribbonBox = (
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          {this.props.house.listPrice.toLocaleString('sv-SE', {style: 'currency', currency: 'SEK', maximumSignificantDigits: 10})}
        </Text>
      </View>
    );

    if (this.props.type == 'saved') {
      // console.log(this.props.dateSaved, moment(this.props.dateSaved).fromNow());
      ribbonBox = (
        <View style={[styles.priceContainer, styles.dateContainer]}>
          <Text style={[styles.priceText, styles.dateText]}>
            {moment(this.props.dateSaved).fromNow()}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.item}>
        {/* <ActivityIndicator style={styles.spinner} /> */}

        <TouchableOpacity activeOpacity={0.9} onPress={this.props.onSelect}>
          <Image
            style={styles.image}
            //source={{uri: this.props.house.image}}>
            source={{uri: 'https://api.bcdn.se/cache/primary_'+this.props.house.booliId+'_800x600.jpg'}} />
            {ribbonBox}

            <View style={styles.detailContainer}>
              <Text style={styles.addressText} numberOfLines={1}>{this.props.house.location.address.streetAddress}</Text>

              <View style={styles.iconContainer}>
                <View style={styles.iconItem}>
                  {/* <Image style={styles.iconImage} source={require('../assets/images/real-estate/082-blueprint-3.png')} /> */}
                  <Image style={styles.iconImage} source={require('../assets/images/re/search.png')} />
                  <Text style={styles.iconText}>{this.props.house.rooms + ' rum'}</Text>
                </View>

                <View style={styles.iconItem}>
                  {/* <Image style={styles.iconImage} source={require('../assets/images/real-estate/128-mortgage.png')} /> */}
                  <Image style={styles.iconImage} source={require('../assets/images/re/house-5.png')} />
                  <Text style={styles.iconText}>{this.props.house.rent.toLocaleString('sv-SE', {style: 'currency', currency: 'SEK', maximumSignificantDigits: 10})}</Text>
                </View>

                <View style={styles.iconItem}>
                  {/* <Image style={styles.iconImage} source={require('../assets/images/real-estate/114-blueprint-1.png')} /> */}
                  <Image style={styles.iconImage} source={require('../assets/images/re/blueprint.png')} />
                  <Text style={styles.iconText}>{this.props.house.livingArea}</Text>
                  {(() => this.sub('m','2'))()}
                </View>

                <View style={styles.iconItem}>
                  {/* <Image style={styles.iconImage} source={require('../assets/images/real-estate/053-house-19.png')} /> */}
                  <Image style={styles.iconImage} source={require('../assets/images/re/engineer.png')} />
                  <Text style={styles.iconText}>{this.props.house.constructionYear}</Text>
                </View>
              </View>
            </View>
          {/* </Image> */}
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    //margin: 28,
    marginTop: 0,
    marginBottom: 2,
    padding: 0,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    height: 240,
  },

  spinner: {
    position: 'absolute',
    left: (width/2)-20,
    top: 90
  },

  image: {
    height: 240,
    resizeMode: 'cover',
  },

  priceContainer: {
    position: 'absolute',
    backgroundColor: Colors.green,
    padding: 5,
    top: 6,
    left: 0,
    height: 30,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1  },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  dateContainer: {
    backgroundColor: Colors.orange,
  },

  priceText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  dateText: {
    fontSize: 13,
  },

  detailContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 70,
    padding: 10
  },

  addressText: {
    color: Colors.textColor,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  iconItem: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  iconImage: {
    width: 20,
    height: 20,
    opacity: .3
  },

  iconText: {
    fontSize: 14,
    color: Colors.textColor,
    lineHeight: 22,
    marginLeft: 3,
  },

  bedBoxIcons: {
    flex: 2,
  },

});

export default HouseCell;
