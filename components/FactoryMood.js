import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import PropTypes from 'prop-types';
import TouchingButton from './TouchingButton';
import { backToFactoryMood } from '../utils/api.js';
import { resetData } from '../actions/index';

export class FactoryMood extends Component {
  static propTypes = {
    resetData: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  reset = () => {
    const { resetData, navigation } = this.props;
    backToFactoryMood();
    resetData();
    navigation.goBack();
  };
  render() {
    return (
      <View>
        <Text style={styles.pageTitle}> Factory Mood </Text>
        <View>
          <View style={styles.container}>
            <Text>
              You are about you RESET all your data to the Factory Mood.
            </Text>
            <Text>
              if you want to contiune please click on the below button.
            </Text>
            <View />
            <TouchingButton onPress={this.reset}
              btnStyle={{ backgroundColor: red, borderColor: red }}>
              Reset All Data
            </TouchingButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: "#ccc",
    textAlign: "center"
  },
  pageTitle: {
    fontSize: 20,
    color: red,
    marginBottom: 20,
  },
});

export default connect(null,{ resetData })(FactoryMood);
