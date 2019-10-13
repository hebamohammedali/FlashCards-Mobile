import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Deck from './Deck';
import { initDataHandling } from '../actions/index';
import { gray, green, white, red, darkGray } from '../utils/colors';

export class ListOfDecks extends Component {
  static propTypes = {
    decksList: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    initDataHandling: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.initDataHandling();
  }
  render() {
    const { decksList, navigation } = this.props;

    return (
      <ScrollView>
        <Text style={styles.appTitle}>Mobile Flashcards Application</Text>
        {Object.values(decksList).map(deck => {
          return (
            <TouchableOpacity key={deck.title}
              onPress={() => navigation.navigate('DetailsOfDeck', { title: deck.title })}>
              <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        {/* <View /> */}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ decksList: state });
const styles = StyleSheet.create({
  appTitle: {
    color: darkGray,
    fontSize: 20,
    margin: 5
  }
});

export default connect(mapStateToProps, { initDataHandling } )(ListOfDecks);
