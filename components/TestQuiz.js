import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPagerAndroid } from 'react-native';
import CustomButton from './CustomButton';
import TouchingButton from './TouchingButton';
import { gray, green, red, textGray, darkGray, white } from '../utils/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const views = { QUESTION: 'question', ANSWER: 'answer', RESULT: 'result' };
const answer = { CORRECT: 'correct', INCORRECT: 'incorrect'};

export class TestQuiz extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  state = {
    show: views.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };

  ans = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        // console.log('this.state.answered', this.state.answered);
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: views.RESULT });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: views.QUESTION
          }));
        }
      }
    );
  };

  changePage = evt => { this.setState({ show: views.QUESTION }); };

  reset = () => {
    this.setState(prevState => ({ show: views.QUESTION, correct: 0, incorrect: 0,
    answered: Array(prevState.questionCount).fill(0)
    }));
  };
  
  render() {
    const { show } = this.state;
    const { questions } = this.props.deck;

    if (questions.length === 0) {
      return (
        <View  style={{ textAlign: 'center' }}>
            <Text>
              OMG! There is no Cards in this DECK, So you can't take this QUIZ. 
              But, You can add some cards and try again later.
            </Text>
        </View>
      );
    }

    if (this.state.show === views.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);

      return (
        <View style={ { textAlign: 'center' }}>
            <Text> Congrats! Quiz Completed !!!! </Text>
            <Text>{correct} / {questionCount} correct </Text>
            <Text> Percentage for the correct Answers : {percent}% </Text>
            <TouchingButton  onPress={this.reset}
              btnStyle={{ borderColor: textGray, backgroundColor: gray }}>
              Retake Quiz
            </TouchingButton>
            <TouchingButton onPress={() => { this.reset(); this.props.navigation.goBack(); }}
              btnStyle={{ borderColor: textGray, backgroundColor: gray }}>
              Back To Deck
            </TouchingButton>
            <TouchingButton onPress={() => {this.reset();this.props.navigation.navigate('Home');}}
              btnStyle={{ borderColor: textGray, backgroundColor: gray }}
              styleForText={{ color: textGray }}>
              Back to Home
            </TouchingButton>
        </View>
      );
    }

    return (
      <ViewPagerAndroid
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.changePage}
        ref={viewPager => {this.viewPager = viewPager;}}>
        {questions.map((question, idx) => (
          <View style={styles.pageContainer} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === views.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === views.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === views.QUESTION ? (
              <CustomButton
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: views.ANSWER })}>
                Show Answer
              </CustomButton>
            ) : (
              <CustomButton
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: views.QUESTION })}
              >
                Show Question
              </CustomButton>
            )}
            <TouchingButton
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.ans(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}>
                Incorrect
              </TouchingButton>
              <TouchingButton
                btnStyle={{ backgroundColor: green, borderColor: white }}
                onPress={() => this.ans(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}>
                Correct
              </TouchingButton>
          </View>
        ))}
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageContainer: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },

  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },

});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(TestQuiz));
