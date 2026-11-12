import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { guardarVuelo } from '../services/vuelosStorange'; // NUEVO

export default function ReservaScreen({ route, navigation }) {
  // Estos datos tienen que llegar desde la pantalla anterior.
  const {
    usuario,
    origen = 'Córdoba',
    destino = 'Madrid',
    fecha = '15/12/2026',
    aerolinea = 'Iberia',
    precio = 'USD 850',
  } = route.params;

  // NUEVO
  const confirmarReserva = async () => {
    const guardado = await guardarVuelo(usuario, {
      origen,
      destino,
      fecha,
      aerolinea,
      precio,
    });

    if (!guardado) {
      Alert.alert('Error', 'No se pudo guardar la reserva. Probá de nuevo.');
      return;
    }

    navigation.navigate('MisVuelos', { usuario });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Confirmar reserva</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.ruta}>{origen} → {destino}</Text>
        <Text style={styles.detalle}>📅 {fecha}</Text>
        <Text style={styles.detalle}>🛫 {aerolinea}</Text>
        <Text style={styles.detalle}>💲 {precio}</Text>
      </View>

      <Pressable style={styles.boton} onPress={confirmarReserva}>
        <Text style={styles.textoBoton}>Confirmar reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F1F6FA', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#123B66', marginBottom: 18 },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 12,
    elevation: 2,
  },
  ruta: { fontSize: 18, fontWeight: 'bold', color: '#123B66', marginBottom: 6 },
  detalle: { color: '#526273', fontSize: 15, marginTop: 3 },
  boton: {
    backgroundColor: '#123B66',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  textoBoton: { color: '#FFFFFF', fontWeight: 'bold' },
});