import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet
} from 'react-native';

export default function TarjetaDestino({
  destino,
  pais,
  onPress
}) {
  return (
    <Pressable
      style={styles.tarjeta}
      onPress={onPress}
    >
      <Text style={styles.destino}>{destino}</Text>
      <Text style={styles.pais}>{pais}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginVertical: 8,
    elevation: 3,
  },
  destino: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#123B66',
  },
  pais: {
    color: '#687786',
    marginTop: 6,
  },
});
