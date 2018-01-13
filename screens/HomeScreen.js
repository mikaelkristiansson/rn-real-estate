import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Colors from '../constants/Colors';
import searchStyles from '../styles/search';

// COMPONENTS
import PropertyTypePicker from '../components/PropertyTypePicker';
import PriceRangePicker from '../components/PriceRangePicker';

import municipalities from '../assets/jsons/municipalities.json';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Bostäder',
    headerTitle: 'BOSTÄDER',
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitleStyle: {
      color: Colors.textColor,
    },
    headerBackTitle: null
  };

  constructor() {
    super();
    this.state = {
      propertyType: 'villa', //objectType
      priceRange: [300, 800],
      municipality: {},
      selectedMunicipalities: [],
      zipCodes: ['97202'],
      builtRange: [1900, 2020],
      isNewConstruction: false,
      bedrooms: 3,
      bathrooms: 1,
      bbox: '59.34674,18.0603,59.64674,18.3603'
    };
    this.municipalities = municipalities.data;

    this.onSearch = this.onSearch.bind(this);
    this.saveQueryOptions = this.saveQueryOptions.bind(this);
  }

  onSearch() {
    this.props.navigation.navigate('Search', {search: this.state});
  }

  onSelectedMunicipalitiesChange = selectedMunicipalities => {
    let selected = {}; 
    this.municipalities.map(mun => {
      if (mun.code === selectedMunicipalities[0]) selected = mun;
    });
    this.setState({ municipality: selected, selectedMunicipalities });
  };

  saveQueryOptions(key, value) {
    // console.log('saveQueryOptions', key, value);
    const temp = {};
    temp[key] = value;
    this.setState(temp);
  }
  // objectType villa, lägenhet, gård, tomt-mark, fritidshus, parhus,radhus,kedjehus
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.page}>

        <View style={searchStyles.container}>
          <Text style={searchStyles.label}>Kommun</Text>
          <View style={{marginTop: 5, marginBottom: -15}}>
            <MultiSelect
              //hideTags
              hideSubmitButton={true}
              single
              items={this.municipalities}
              uniqueKey="code"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={this.onSelectedMunicipalitiesChange}
              selectedItems={this.state.selectedMunicipalities}
              selectText="Välj kommun"
              searchInputPlaceholderText="Sök kommun..."
              onChangeInput={ (text)=> console.log(text)}
              fixedHeight={true}
              //tagRemoveIconColor="#CCC"
              //tagBorderColor="#CCC"
              //tagTextColor="#CCC"
              selectedItemTextColor={Colors.green}
              selectedItemIconColor={Colors.green}
              //itemTextColor="#000"
              displayKey="name"
              searchInputStyle={
                {
                  color: '#CCC',
                  height: 46,
                }
              }
            />
          </View>
        </View>
          <PropertyTypePicker value={this.state.propertyType} onChange={this.saveQueryOptions} />
          <PriceRangePicker value={this.state.priceRange} onChange={this.saveQueryOptions} />

          <TouchableOpacity onPress={this.onSearch} activeOpacity={0.9}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>
                Sök
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.background
  },
  
  page: {
    paddingBottom: 50
  },

  searchButton: {
    padding: 14,
    backgroundColor: Colors.green,
  },

  searchButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
