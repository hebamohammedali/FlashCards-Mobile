import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import TestQuiz from './TestQuiz'
import { setNotification, clearNotification } from '../utils/helpers';

export class Quiz extends Component {
  componentDidMount() {
    clearNotification().then(setNotification);
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    if (Constants.platform.android) return <TestQuiz title={title} />;
  }
}
export default Quiz;
