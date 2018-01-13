import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions
} from 'react-native';

import { MapView } from 'expo';

//import _ from 'lodash';

const {width, height} = Dimensions.get('window');

import HouseDetailsCaroselImage from '../components/HouseDetailsCaroselImage';
// import SpecIconBox from './SpecIconBox.js';
// import KVBox from './KVBox.js';

// import SaveButton from './SaveButton.js';

// import parse from '../parsing/index.js';

import Colors from '../constants/Colors';

class EstateScreen extends Component {
    static navigationOptions = {
        title: 'Bostäder',
        headerTitle: 'BOSTAD',
        headerTintColor: Colors.green,
        headerTitleStyle: {
            color: Colors.textColor,
        },
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerBackTitle: null
    };

    constructor() {
        super();
        this.state = {
            searchPending: false,
            houseKV: {},
            images: null,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            }
        };
        this.house = {};
    }

    componentWillMount() {
        this.house = this.props.navigation.state.params.house;
    }

    componentDidMount() {
        //this.house = this.props.navigation.state.params.house;
        //this.getRMLSDetail();
        if (this.house.location && this.house.location.address.streetAddress) this.geocodeAddress(this.house.location.address.streetAddress);
    }

  geocodeAddress(address) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address))
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      //if (!_.isArray(response.results)) return;
      if (!Array.isArray(response.results)) return;

      const location = response.results[0].geometry.location;

      this.setState({
        region: {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
      });
    })
    .catch(function (error) {
      console.error('An error occured');
      console.error(error.message);
    });
  }


  render() {
    const houseKV = this.houseKV || this.state.houseKV || {};
    const images = this.state.images || ['https://api.bcdn.se/cache/primary_'+this.house.booliId+'_800x600.jpg'] || [];

    const kvElements = [];
    // _.each(_.omit(houseKV, ["Address", "Price", "Beds", "Baths", "SQFT", "Tax/Year", "REMARKS"]), function (item, key) {
    //   if (!key || !item) return;

    //   kvElements.push(
    //     <KVBox key={key} label={key} value={item} />
    //   );

    // });

    const caroselImages = [];

    images.forEach((item, i) => {
      caroselImages.push(
        <HouseDetailsCaroselImage image={item} key={i} />
      );
    });

    let mapPins = [];
    if (this.state.region.latitude) {
      mapPins = [{
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        title: this.house.location.address.streetAddress,
      }];
    }

    // data to save into favorites
    const saveData = {
      house: this.house,
      images,
      houseKV,
    };

    return (
      <ScrollView
        // scrollsToTop={true}
        style={styles.container}>

        <ScrollView
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          scrollsToTop={false}
          bounces={false}
          contentOffset={{x: 0, y: 0}}
          contentContainerStyle={[styles.carosel, {width: caroselImages.length * width}]}>

          {caroselImages}
        </ScrollView>

        {/* <SaveButton data={saveData} /> */}

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {this.house.listPrice}
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <Image style={styles.mapPin} source={require('../assets/images/map-pin.png')} />
          <Text style={styles.addressText} numberOfLines={1}>{this.house.location.address.streetAddress}</Text>
        </View>

        {/* <View style={styles.iconContainer}>
          <SpecIconBox value={this.house.specs.Beds} label={'Bedrooms'} icon={require('../images/beds-large.png')} />
          <SpecIconBox value={this.house.specs.Baths} label={'Bathrooms'} icon={require('../images/bath-large.png')} />
          <SpecIconBox value={this.house.specs.Sqft} label={'Square Footage'} icon={require('../images/sqft-large.png')} />
        </View>

        <View style={styles.iconContainer}>
          <SpecIconBox value={this.house.specs.YrBuilt} label={'Year Built'} icon={require('../images/year-large.png')} />
          <SpecIconBox value={this.house.specs['NHood/Bldg']} label={'Neighborhood'} icon={require('../images/neighborhood-large.png')} />
          <SpecIconBox value={this.house.specs['Tax/Yr']} label={'Tax per Year'} icon={require('../images/tax-large.png')} />
        </View> */}


        {/* <View style={styles.descContainer}>
          <Text style={styles.descLabel}>REMARKS:</Text>

          <Text style={styles.descText}>
            {this.house.desc}
          </Text>
        </View> */}

        <MapView
          style={styles.map}
          region={this.state.region}
        >
        {mapPins.map((marker, i) => (
            <MapView.Marker
                key={i}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.title}
            //description={marker.description}
            />
        ))}
        </MapView>

        {/* <View style={styles.kvContainer}>
          {kvElements}
        </View> */}

      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },

  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  // CAROSEL
  carosel: {
    width,
    height: 245,
    // borderColor: 'red',
    // borderWidth: 1
  },


  // PRICE
  priceContainer: {
    position: 'absolute',
    backgroundColor: Colors.green,
    padding: 5,
    top: 190,
    left: 0,
    height: 30,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1  },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  priceText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // ADDRESS BOX
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1  },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  addressText: {
    color: Colors.textColor,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center'
  },

  mapPin: {
    width: 10,
    height: 17,
    margin: 5
  },


  // ICON BOX
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },


  // DESC BOX
  descContainer: {
    padding: 20
  },

  descLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textColor
  },

  descText: {
    fontSize: 14,
    fontWeight: '200',
    color: Colors.textColor,
    lineHeight: 20
  },


  // KV BOX
  kvContainer: {
    padding: 20,
    paddingTop: 0,
  },
});

export default EstateScreen;
