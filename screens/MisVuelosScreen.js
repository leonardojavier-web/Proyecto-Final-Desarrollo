import React, { useState, useCallback, useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext';
import { obtenerVuelos, eliminarVuelo } from '../services/vuelosStorage';

export default function MisVuelosScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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

  const salir = () => {
    navigation.navigate('Inicio');
  };

  return (
    <View style={styles.contenedor}>
      {/* BARRA SUPERIOR CON FLECHA */}
      <View style={[styles.barra, { paddingTop: insets.top + 10 }]}>
        <Pressable
          style={styles.botonFlecha}
          onPress={salir}
          hitSlop={12}
        >
          <Text style={styles.flecha}>←</Text>
        </Pressable>

        <Text style={styles.tituloBarra}>Mis vuelos</Text>
      </View>

      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
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
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#123B66',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  botonFlecha: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  flecha: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
  tituloBarra: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  lista: { padding: 20, paddingBottom: 35 },
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