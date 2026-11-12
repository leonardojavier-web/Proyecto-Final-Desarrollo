import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import TarjetaDestino from '../components/TarjetaDestino';

export default function DestinosScreen({ route, navigation }) {
  const { pais, ciudades } = route.params;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{pais}</Text>

      <Text style={styles.subtitulo}>
        Elegí una ciudad para ver el mapa, los lugares de interés y las aerolíneas
      </Text>

      <FlatList
        data={ciudades}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TarjetaDestino
            destino={item}
            pais={pais}
            onPress={() =>
              navigation.navigate('MapaCiudad', {
                ciudad: item,
                pais: pais,
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F6FA',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#123B66',
    marginTop: 15,
  },
  subtitulo: {
    fontSize: 15,
    color: '#687786',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 21,
  },
});