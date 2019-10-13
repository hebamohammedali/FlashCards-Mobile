import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

TouchingButton.propTypes = {
  disabled: PropTypes.bool,
  styleForText: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20
  },
  disable: {
    backgroundColor: "#ccc",
    borderColor: "#eee"
  },
  btn: {
    width: 300,
    height: 60,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 2,
    backgroundColor: 'red',
  },
});

export default function TouchingButton({
  children,
  onPress,
  btnStyle = {},
  styleForText = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.disable : {};
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}
        style={[styles.btn, btnStyle, disabledButton]}>
        <Text style={[styleForText ]}> {children} </Text>
      </TouchableOpacity>
    </View>
  );
}
