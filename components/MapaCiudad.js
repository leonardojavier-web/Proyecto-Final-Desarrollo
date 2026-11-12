import React from 'react';
import { View, Text, Image, Platform, StyleSheet } from 'react-native';

// react-native-maps no existe en web, así que solo lo cargamos en celular.
let MapView = null;
let Marker = null;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function MapaCiudad({ ciudad, lat, lon }) {
  if (lat === undefined || lon === undefined) {
    return (
      <View style={[styles.contenedor, styles.centrado]}>
        <Text style={styles.aviso}>
          Esta ciudad todavía no tiene coordenadas cargadas.
        </Text>
      </View>
    );
  }

  // Respaldo para la versión web: imagen estática.
  if (Platform.OS === 'web') {
    const urlMapa =
      `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=12&size=600x300&markers=${lat},${lon},red-pushpin`;

    return (
      <View style={styles.contenedor}>
        <Image
          source={{ uri: urlMapa }}
          style={styles.imagen}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Mapa real en Android / iOS.
  return (
    <View style={styles.contenedor}>
      <MapView
        key={`${lat},${lon}`}
        style={styles.mapa}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          title={ciudad}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    height: 250,
    marginTop: 20,
    marginBottom: 15,
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: '#DCEAF4',
  },
  centrado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  aviso: {
    color: '#526273',
    textAlign: 'center',
    padding: 16,
  },
});