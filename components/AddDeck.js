import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import TouchingButton from './TouchingButton';
import { gray, green, white, textGray, darkGray } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitleAS } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';

export class AddDeck extends Component {
  static propTypes = {
    addDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  state = {
    text: ''
  };

  submit = () => {
    const { navigation, addDeck } = this.props;
    const { text } = this.state;

    saveDeckTitleAS(text);
    addDeck(text);

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DetailsOfDeck',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };

  change = text => {
    this.setState({ text });
  };
  
  render() {
    return (
      <View>
        <View>
          <Text style={styles.title}>Congrats, you are about to create a new deck.
            What's the name of your new deck ?? </Text>
        </View>
         
          <TextInput style={styles.input} placeholder="Enter Deck Name"
            onChangeText={this.change}
            value={this.state.text}
            onSubmitEditing={this.submit}
          />
        <TouchingButton onPress={this.submit} disabled={this.state.text === ''} > Create New Deck </TouchingButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: darkGray,
    fontSize: 24,
    height: 40,
    backgroundColor: white,
    marginBottom: 20
  },

  title: {
    marginTop: 20,
    fontSize: 24
  },
});

export default connect(null, { addDeck })(AddDeck);
