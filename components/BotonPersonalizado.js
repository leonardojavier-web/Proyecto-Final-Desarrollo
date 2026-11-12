import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function BotonPersonalizado({ titulo, onPress }) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#123B66',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  texto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
