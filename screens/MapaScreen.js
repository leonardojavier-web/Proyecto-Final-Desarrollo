import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Linking,
  StyleSheet,
} from 'react-native';

const destinos = [
  { id: '1', ciudad: 'Buenos Aires', pais: 'Argentina 🇦🇷', lat: -34.6037, lon: -58.3816 },
  { id: '2', ciudad: 'Córdoba', pais: 'Argentina 🇦🇷', lat: -31.4201, lon: -64.1888 },
  { id: '3', ciudad: 'Bariloche', pais: 'Argentina 🇦🇷', lat: -41.1335, lon: -71.3103 },

  { id: '4', ciudad: 'Madrid', pais: 'España 🇪🇸', lat: 40.4168, lon: -3.7038 },
  { id: '5', ciudad: 'Barcelona', pais: 'España 🇪🇸', lat: 41.3874, lon: 2.1686 },
  { id: '6', ciudad: 'Sevilla', pais: 'España 🇪🇸', lat: 37.3891, lon: -5.9845 },

  { id: '7', ciudad: 'Río de Janeiro', pais: 'Brasil 🇧🇷', lat: -22.9068, lon: -43.1729 },
  { id: '8', ciudad: 'São Paulo', pais: 'Brasil 🇧🇷', lat: -23.5505, lon: -46.6333 },
  { id: '9', ciudad: 'Florianópolis', pais: 'Brasil 🇧🇷', lat: -27.5954, lon: -48.5480 },
];

export default function MapaScreen() {
  const abrirMapa = (destino) => {
    const url = `https://www.openstreetmap.org/?mlat=${destino.lat}&mlon=${destino.lon}#map=12/${destino.lat}/${destino.lon}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Explorar mapas</Text>

      <Text style={styles.subtitulo}>
        Encontrá la ubicación de nuestros destinos.
      </Text>

      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tarjeta}
            onPress={() => abrirMapa(item)}
          >
            <View style={styles.informacion}>
              <Text style={styles.ciudad}>{item.ciudad}</Text>
              <Text style={styles.pais}>{item.pais}</Text>
            </View>

            <Text style={styles.botonTexto}>Ver mapa →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F1F6FA',
    padding: 20,
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#123B66',
    marginTop: 15,
  },
  subtitulo: {
    fontSize: 15,
    color: '#687786',
    marginTop: 8,
    marginBottom: 18,
  },
  lista: {
    paddingBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  informacion: {
    flex: 1,
  },
  ciudad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123B66',
  },
  pais: {
    fontSize: 14,
    color: '#687786',
    marginTop: 5,
  },
  botonTexto: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
