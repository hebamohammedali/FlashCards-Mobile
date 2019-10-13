import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity,  } from 'react-native';

CustomButton.propTypes = {
  styleForText: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
  },
});

export default function CustomButton({ styleForText = {}, children, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styleForText, styles.btnText]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

