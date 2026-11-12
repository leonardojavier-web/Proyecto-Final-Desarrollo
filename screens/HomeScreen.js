import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
  const { usuario } = route.params;

  const cerrarSesion = async () => {
    // Solo borramos la sesión. NO usar AsyncStorage.clear(),
    // porque eliminaría también los vuelos reservados.
    await AsyncStorage.removeItem('sesion');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Hola, {usuario} 👋</Text>

      {/* NUEVO */}
      <Pressable
        style={styles.boton}
        onPress={() => navigation.navigate('MisVuelos', { usuario })}
      >
        <Text style={styles.textoBoton}>✈️ Mis vuelos</Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={cerrarSesion}>
        <Text style={styles.textoSecundario}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F1F6FA', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#123B66', marginBottom: 24 },
  boton: {
    backgroundColor: '#123B66',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: { color: '#FFFFFF', fontWeight: 'bold' },
  botonSecundario: { padding: 14, alignItems: 'center', marginTop: 12 },
  textoSecundario: { color: '#C62828', fontWeight: 'bold' },
});