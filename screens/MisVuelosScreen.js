import React, { useState, useCallback, useContext } from 'react'; // NUEVO: useContext
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // NUEVO
import { obtenerVuelos, eliminarVuelo } from '../services/vuelosStorange';

export default function MisVuelosScreen() { // NUEVO: sin route
  // NUEVO: el usuario sale del contexto, no de route.params
  const { usuario } = useContext(AuthContext);
  const idUsuario = typeof usuario === 'object' ? usuario?.email : usuario;

  const [vuelos, setVuelos] = useState([]);

  // Se recarga cada vez que entrás a esta pantalla.
  useFocusEffect(
    useCallback(() => {
      let activo = true;

      if (idUsuario) {
        obtenerVuelos(idUsuario).then((datos) => {
          if (activo) setVuelos(datos);
        });
      }

      return () => {
        activo = false;
      };
    }, [idUsuario])
  );

  const cancelar = async (id) => {
    const restantes = await eliminarVuelo(idUsuario, id);
    if (restantes) setVuelos(restantes);
  };

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <Text style={styles.titulo}>✈️ Mis vuelos reservados</Text>
        }
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Todavía no reservaste ningún vuelo.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.ruta}>
              {item.origen} → {item.destino}
            </Text>

            {item.fecha ? (
              <Text style={styles.detalle}>📅 {item.fecha}</Text>
            ) : null}

            {item.aerolinea ? (
              <Text style={styles.detalle}>🛫 {item.aerolinea}</Text>
            ) : null}

            {item.precio ? (
              <Text style={styles.detalle}>💲 {item.precio}</Text>
            ) : null}

            <Pressable
              style={styles.botonCancelar}
              onPress={() => cancelar(item.id)}
            >
              <Text style={styles.textoCancelar}>Cancelar reserva</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F1F6FA' },
  lista: { padding: 20, paddingBottom: 35 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#123B66',
    marginBottom: 18,
    marginTop: 10,
  },
  vacio: {
    color: '#687786',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  ruta: { fontSize: 18, fontWeight: 'bold', color: '#123B66', marginBottom: 6 },
  detalle: { color: '#526273', fontSize: 15, marginTop: 3 },
  botonCancelar: { marginTop: 12, paddingVertical: 8 },
  textoCancelar: { color: '#C62828', fontWeight: 'bold' },
});