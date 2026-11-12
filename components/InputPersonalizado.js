import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputPersonalizado({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#B8C5D1',
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
  },
});
