import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import TouchingButton from './TouchingButton';
import { gray, green } from '../utils/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAS } from '../utils/api';

export class AddCard extends Component {
  static propTypes = {
    addCardToDeck: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  state = {
    answer: '',
    question: '',
  };

  changeA = answer => {
    this.setState({ answer });
  };

  changeQ = question => {
    this.setState({ question });
  };

  submit = () => {
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      answer: this.state.answer,
      question: this.state.question,
    };

    addCardToDeckAS(title, card);
    addCardToDeck(title, card);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };
  render() {
    return (
      <View>
            <Text>Add New Question ..</Text>
            <TextInput style={styles.input} placeholder="Enter your question"
              value={this.state.question}
              onChangeText={this.changeQ}
              onSubmitEditing={() => this.answerTextInput.focus()}/>

            <TextInput style={styles.input} placeholder="Enter your Answer"
              value={this.state.answer}
              onChangeText={this.changeA}
              ref={input => {this.answerTextInput = input;}}
              onSubmitEditing={this.submit}/>
          <TouchingButton
            btnStyle={{ backgroundColor: green, borderColor: '#fff' }}
            onPress={this.submit}
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit your new Card
          </TouchingButton>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  }
});

export default connect(mapStateToProps,{ addCardToDeck })(AddCard);
