import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import EstateScreen from '../screens/EstateScreen';

const stackNav = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Estate: {
    screen: EstateScreen,
  }
})

export default TabNavigator(
  {
    Home: {
      screen: stackNav,
    },
    Saved: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Saved':
            iconName = Platform.OS === 'ios' ? `ios-heart${focused ? '' : '-outline'}` : 'md-heart';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-more${focused ? '' : '-outline'}` : 'md-more';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,    
      },
      style: {
        backgroundColor: Colors.tabBar,
      },
    }
    
  }
);
