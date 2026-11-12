import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import BotonPersonalizado from '../components/BotonPersonalizado';
import TarjetaDestino from '../components/TarjetaDestino';

const paises = [
  {
    id: '1',
    nombre: 'Argentina 🇦🇷',
    ciudades: ['Buenos Aires', 'Córdoba', 'Bariloche'],
  },
  {
    id: '2',
    nombre: 'España 🇪🇸',
    ciudades: ['Madrid', 'Barcelona', 'Sevilla'],
  },
  {
    id: '3',
    nombre: 'Brasil 🇧🇷',
    ciudades: ['Río de Janeiro', 'São Paulo', 'Florianópolis'],
  },
];

export default function InicioScreen({ navigation }) {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>
        ¡Hola, {usuario?.email}!
      </Text>

      <Text style={styles.subtitulo}>
        ¿A dónde viajamos hoy?
      </Text>

      {/* ACCESO A MIS VUELOS */}
      <View style={styles.espacioBoton}>
        <BotonPersonalizado
          titulo="✈️ Mis vuelos"
          onPress={() => navigation.navigate('MisVuelos')}
        />
      </View>

      <Text style={styles.seccion}>
        Países disponibles
      </Text>

      <FlatList
        data={paises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaDestino
            destino={item.nombre}
            pais="Explorar destinos"
            onPress={() =>
              navigation.navigate('Destinos', {
                pais: item.nombre,
                ciudades: item.ciudades,
              })
            }
          />
        )}
      />

      <BotonPersonalizado
        titulo="Cerrar sesión"
        onPress={logout}
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
    fontSize: 23,
    fontWeight: 'bold',
    color: '#123B66',
    marginTop: 15,
  },
  subtitulo: {
    fontSize: 16,
    color: '#687786',
    marginVertical: 12,
  },
  espacioBoton: {
    marginBottom: 8,
  },
  seccion: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#123B66',
  },
});