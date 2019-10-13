import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { white, textGray, darkGray, gray } from '../utils/colors';
import { connect } from 'react-redux';

const Deck = props => {
  const { eachDeck } = props;

  switch (eachDeck) {
    case undefined:
        return <View style={styles.container} />;
  
    default:
      break;
  }
  return (
    <View style={styles.container}>
        <Text style={styles.dectTitle}>{eachDeck.title} ({eachDeck.questions.length} Cards)</Text>
    </View>
  );
};
Deck.propTypes = {
  eachDeck: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: darkGray,
    backgroundColor: gray,
    marginBottom: 20,
    minHeight: 100,
    borderWidth: 2,
    justifyContent: "center"
  },
  deckTitle: {
    fontSize: 20
  },
});

const mapStateToProps = (state, { id }) => {
  const eachDeck = state[id];

  return {
    eachDeck
  };
};

export default connect(mapStateToProps)(Deck);
