import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import SearchNoResults from '../components/SearchNoResults';
import HouseCell from '../components/HouseCell';

// MOCK
import mock from '../assets/jsons/mock.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContent: {
    height: 40, 
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1  },
    shadowOpacity: 0.2
  },
  topText: {
    color: Colors.textColor,
    lineHeight: 40,
    fontWeight: '500'
  },
  centerText: {
    alignItems: 'center',
  },
  spinner: {
    width: 30,
  },
  scrollSpinner: {
    marginVertical: 20,
  },

  doneView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  doneImage: {
    width: 302 / 5,
    height: 252 / 5
  },
});

export default class SearchScreen extends Component {
    static navigationOptions = {
        //title: 'Sökresultat',
        title: 'Bostäder',
        headerTitle: 'SÖKRESULTAT',
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
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        houses: [],
        filter: '',
        searchPending: true
      };
    }

    componentWillMount() {
      this.fetchHouses(this.props.navigation.state.params.search);
    }

    getDataSource(houses) {
      return this.state.dataSource.cloneWithRows(houses);
    }

    renderFooter() {
      // if (!this.state.next && !this.state.searchPending) {
      //   return (
      //     <View style={styles.doneView}>
      //       <Image source={require('../assets/images/foxy.png')} style={styles.doneImage} />
      //     </View>
      //   );
      // }
  
      return <ActivityIndicator style={styles.scrollSpinner} />;
    }
  
    onEndReached() {
      console.log('onEndReached');
  
      // if (this.state.next && !this.state.searchPending) {
      //   this.getRMLSPagination(this.state.next, this.state.form);
      // }
    }
  
    selectHouse(house) {
      this.props.navigation.navigate('Estate', {house: house});
      // this.props.navigator.push({
      //   component: HouseDetails,
      //   title: 'Details',
      //   passProps: {
      //     house,
      //     form: this.state.form
      //   },
      // });
    }

    // TODO: move this to separate api file
    fetchHouses(search) {
      const options = [
        'q='+encodeURIComponent(search.municipality.name || '').replace(' kommun', ''),
        'objectType='+encodeURIComponent(search.propertyType),
        'minListPrice='+encodeURIComponent(search.priceRange[0] || ''),
        'maxListPrice='+encodeURIComponent(search.priceRange[1] || '')
      ];
  
      this.setState({ searchPending: true });
  
      const serialized = options.join('&');
      // fetch(`https://www.booli.se/api/proxy?url=/listings?${serialized}`, {
      //   method: 'get'
      // }).then(res => res.json())
      // .then(response => this.processsResults(response));
      // fetch('http://www.rmls.com/rc2/engine/sqlGenerator_RmlsCom.asp', {
      //   method: 'post',
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36",
      //     "Referer": "http://www.rmls.com/rc2/UI/search_residential.asp"
      //   },
      //   body: serialized
      // })
      // .then((response) => response.text())
      // .then((responseText) => {
      //   console.log(responseText);
      //   this.processsResults(responseText);
      // })
      // .catch(function (error) {
      //   console.error('An error occured');
      //   console.error(error.message);
      // });
      setTimeout(() => {
        this.processsResults();
      }, 1200);
    }

    processsResults(response) {
      //console.log(JSON.parse(response.body));
      this.setState({ 
        searchPending: false,
        houses: mock.listings,
        dataSource: this.getDataSource(mock.listings)
      });
      // const data = parse.searchResults(html);
      // console.log(data);
  
      // // cancel out if no houses were found
      // if (!data.houses.length) return;
  
      // const newHouses = this.state.houses.concat(data.houses);
  
      // this.setState({
      //   houses: newHouses,
      //   searchPending: false,
      //   dataSource: this.getDataSource(newHouses),
      //   form: data.form,
      //   next: data.next
      // });
    }

    render() {
      const { navigate } = this.props.navigation;
      if (this.state.searchPending && !this.state.houses.length) {
        return (
          <ActivityIndicator style={styles.scrollSpinner} />
        );
      }

      if (!this.state.searchPending && !this.state.houses.length) {
        return (
          <View style={styles.container}>
            <SearchNoResults />
          </View>
        );
      }
  
      return (
        <View style={styles.container}>
          <View style={[styles.topContent, styles.centerText]}>
            <Text style={styles.topText}>{this.props.navigation.state.params.search.municipality.name.replace(' kommun', '')} » {this.props.navigation.state.params.search.propertyType} » {this.props.navigation.state.params.search.priceRange[0] + '-' + this.props.navigation.state.params.search.priceRange[1]}</Text>
          </View>
          <ListView
            ref='listview'
            dataSource={this.state.dataSource}
            //renderFooter={this.renderFooter}
            //renderRow={this.renderRow}
            renderRow={(house) => (
              <HouseCell
                onSelect={() => navigate('Estate', {house: house})}
                key={house.booliId}
                house={house}
              />
            )}
            //onEndReached={this.onEndReached}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={true}
          />
        </View>
      );
    }
}