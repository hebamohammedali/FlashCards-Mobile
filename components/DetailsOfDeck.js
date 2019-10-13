import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import TouchingButton from './TouchingButton';
import CustomButton from './CustomButton';
import { gray, textGray, green, white, red, pink, darkGray, blue } from '../utils/colors';
import { connect } from 'react-redux';
import { removeCertainDeck } from '../actions/index';
import { removeDeckAS } from '../utils/api';

export class DetailsOfDeck extends Component {
  static propTypes = {
    removeCertainDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  delete = id => {
    const { removeCertainDeck, navigation } = this.props;

    removeCertainDeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { certainDeck } = this.props;

    return (
      <View>
        <Deck id={certainDeck.title} />
        <View>
          <TouchingButton
                onPress={() => this.props.navigation.navigate('Quiz', { title: certainDeck.title })}
                btnStyle={{ backgroundColor: blue }} >
                Take this Quiz 
          </TouchingButton>
        </View>
        <View>
          <TouchingButton onPress={() => this.props.navigation.navigate('AddCard', { title: certainDeck.title }) }>
            Add New Card
          </TouchingButton>
        </View>
          <CustomButton onPress={() => this.delete(certainDeck.title)} styleForText={{ color: pink }} >
            Delete this Deck
          </CustomButton>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const certainDeck = state[title];
  return { certainDeck };
};
export default connect( mapStateToProps, { removeCertainDeck })(DetailsOfDeck);
