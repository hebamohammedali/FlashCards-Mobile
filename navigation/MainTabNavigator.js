import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Quiz from '../components/Quiz';
import DetailsOfDeck from '../components/DetailsOfDeck';
import ListOfDecks from '../components/ListOfDecks';
import FactoryMood from '../components/FactoryMood';
import { darkGray, lightGreen, white, green } from '../utils/colors';
import AddDeck from '../components/AddDeck';
import AddCard from '../components/AddCard';


const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
  Decks: { screen: ListOfDecks,
    navigationOptions: {
      tabBarLabel: 'Decks', tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons name={isIOS ? 'ios-bookmarks' : 'md-bookmarks'} size={20}color={tintColor}/>)
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: { tabBarLabel: 'Add Deck', tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="plus-square" size={20} color={tintColor} />)
    }
  },
  FactoryMood: { screen: FactoryMood,
      navigationOptions: {
      tabBarLabel: 'Factory Mood', tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="sliders" size={20} color={tintColor} />
      )
    }
  }
};

routeConfigs.FactoryMood.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.AddDeck.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};


const tabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: green,
    style: {
      height: 50,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: darkGray
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
  
  }
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DetailsOfDeck: {
      screen: DetailsOfDeck,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
        title: 'Deck Details'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Add Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        }
      }
    }
  },
  { headerLayoutPreset: 'center' }
);

export default MainNavigator;
