import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';

import { setNotification } from './utils/helpers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers/index';


const store = createStore(
  reducer /* preloadedState, */,
  applyMiddleware(thunk, logger)
);

function StateBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StateBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
StateBar.propTypes = { backgroundColor: PropTypes.string.isRequire};

export default class App extends React.Component {
  componentDidMount() { setNotification();}

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="green"/>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    marginTop: 30,
  }
});
