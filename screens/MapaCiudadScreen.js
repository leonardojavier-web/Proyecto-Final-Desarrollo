import MapaCiudad from '../components/MapaCiudad';
import React, { useState, useContext } from 'react'; // NUEVO: useContext
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  Linking,
  Alert, // NUEVO
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../context/AuthContext'; // NUEVO
import { guardarVuelo } from '../services/vuelosStorange'; // NUEVO

// INFORMACIÓN DE LAS CIUDADES
const ciudades = {
  'Buenos Aires': {
    lat: -34.6037,
    lon: -58.3816,
    aeropuerto: 'Aeroparque Jorge Newbery (AEP) y Ezeiza (EZE)',
    lugares: [
      { id: '1', nombre: 'Obelisco', descripcion: 'Monumento histórico ubicado en la Avenida 9 de Julio, uno de los símbolos de Buenos Aires.', lat: -34.6037, lon: -58.3816 },
      { id: '2', nombre: 'Plaza de Mayo', descripcion: 'Lugar histórico donde se encuentran la Casa Rosada y otros edificios importantes.', lat: -34.6083, lon: -58.3701 },
      { id: '3', nombre: 'Caminito', descripcion: 'Calle museo del barrio de La Boca, conocida por sus casas coloridas.', lat: -34.6392, lon: -58.3631 },
    ],
    aerolineas: [
      'Aerolíneas Argentinas', 'JetSMART', 'Flybondi', 'LATAM', 'GOL',
      'Air France', 'American Airlines', 'Iberia', 'Lufthansa', 'Copa Airlines',
      'Avianca', 'Emirates'
    ],
  },

  'Córdoba': {
    lat: -31.4201,
    lon: -64.1888,
    aeropuerto: 'Aeropuerto Internacional Ingeniero Ambrosio Taravella (COR)',
    lugares: [
      { id: '1', nombre: 'Plaza San Martín', descripcion: 'Plaza central de la ciudad, rodeada de edificios históricos.', lat: -31.4167, lon: -64.1833 },
      { id: '2', nombre: 'Catedral de Córdoba', descripcion: 'Importante edificio religioso ubicado frente a Plaza San Martín.', lat: -31.4165, lon: -64.1833 },
      { id: '3', nombre: 'Parque Sarmiento', descripcion: 'Uno de los espacios verdes más importantes de la ciudad.', lat: -31.4265, lon: -64.1811 },
      { id: '4', nombre: 'Ciudad Universitaria', descripcion: 'Complejo educativo donde funciona la Universidad Nacional de Córdoba.', lat: -31.4395, lon: -64.1935 },
    ],
    aerolineas: ['Aerolíneas Argentinas', 'JetSMART', 'Flybondi'],
  },

  'Bariloche': {
    lat: -41.1335,
    lon: -71.3103,
    aeropuerto: 'Aeropuerto Internacional Teniente Luis Candelaria (BRC)',
    lugares: [
      { id: '1', nombre: 'Centro Cívico', descripcion: 'Conjunto arquitectónico emblemático de San Carlos de Bariloche.', lat: -41.1335, lon: -71.3103 },
      { id: '2', nombre: 'Cerro Campanario', descripcion: 'Lugar turístico famoso por sus vistas panorámicas de los lagos y montañas.', lat: -41.0888, lon: -71.5201 },
      { id: '3', nombre: 'Catedral Nuestra Señora del Nahuel Huapi', descripcion: 'Iglesia de arquitectura neogótica ubicada junto al lago Nahuel Huapi.', lat: -41.1351, lon: -71.3032 },
    ],
    aerolineas: [
      'Aerolíneas Argentinas', 'JetSMART', 'Flybondi', 'LADE',
      'SKY Airline (vuelos estacionales)', 'GOL (vuelos estacionales)'
    ],
  },

  'Madrid': {
    lat: 40.4168,
    lon: -3.7038,
    aeropuerto: 'Aeropuerto Adolfo Suárez Madrid-Barajas (MAD)',
    lugares: [
      { id: '1', nombre: 'Puerta del Sol', descripcion: 'Una de las plazas más conocidas y concurridas de Madrid.', lat: 40.4169, lon: -3.7035 },
      { id: '2', nombre: 'Palacio Real', descripcion: 'Residencia oficial de la familia real española para ceremonias de Estado.', lat: 40.4179, lon: -3.7143 },
      { id: '3', nombre: 'Museo del Prado', descripcion: 'Uno de los museos de arte más importantes del mundo.', lat: 40.4138, lon: -3.6921 },
    ],
    aerolineas: [
      'Iberia', 'Air Europa', 'Aerolíneas Argentinas', 'LATAM', 'Air France',
      'Lufthansa', 'Ryanair', 'Vueling', 'Emirates', 'American Airlines',
      'Avianca', 'Qatar Airways'
    ],
  },

  'Barcelona': {
    lat: 41.3874,
    lon: 2.1686,
    aeropuerto: 'Aeropuerto Josep Tarradellas Barcelona-El Prat (BCN)',
    lugares: [
      { id: '1', nombre: 'Sagrada Familia', descripcion: 'Famosa basílica diseñada por el arquitecto Antoni Gaudí.', lat: 41.4036, lon: 2.1744 },
      { id: '2', nombre: 'Parque Güell', descripcion: 'Parque con obras arquitectónicas de Antoni Gaudí.', lat: 41.4145, lon: 2.1527 },
      { id: '3', nombre: 'Barrio Gótico', descripcion: 'Barrio histórico con calles medievales y edificios antiguos.', lat: 41.3839, lon: 2.1762 },
    ],
    aerolineas: [
      'Vueling', 'Iberia', 'Ryanair', 'Air Europa', 'Lufthansa', 'Air France',
      'LATAM', 'Avianca', 'American Airlines', 'Emirates', 'Qatar Airways',
      'British Airways'
    ],
  },

  'Sevilla': {
    lat: 37.3891,
    lon: -5.9845,
    aeropuerto: 'Aeropuerto de Sevilla (SVQ)',
    lugares: [
      { id: '1', nombre: 'Plaza de España', descripcion: 'Monumental plaza construida para la Exposición Iberoamericana de 1929.', lat: 37.3772, lon: -5.9869 },
      { id: '2', nombre: 'Real Alcázar', descripcion: 'Palacio real histórico con jardines y arquitectura de distintas épocas.', lat: 37.3830, lon: -5.9900 },
      { id: '3', nombre: 'Catedral de Sevilla', descripcion: 'Una de las catedrales góticas más grandes del mundo.', lat: 37.3861, lon: -5.9926 },
    ],
    aerolineas: [
      'Iberia', 'Ryanair', 'Vueling', 'Air Europa', 'Air France', 'EasyJet',
      'Lufthansa', 'TAP Air Portugal', 'Turkish Airlines', 'Wizz Air'
    ],
  },

  'Río de Janeiro': {
    lat: -22.9068,
    lon: -43.1729,
    aeropuerto: 'Galeão (GIG) y Santos Dumont (SDU)',
    lugares: [
      { id: '1', nombre: 'Cristo Redentor', descripcion: 'Monumento emblemático ubicado en la cima del cerro del Corcovado.', lat: -22.9519, lon: -43.2105 },
      { id: '2', nombre: 'Playa de Copacabana', descripcion: 'Una de las playas más famosas de Brasil.', lat: -22.9711, lon: -43.1822 },
      { id: '3', nombre: 'Pan de Azúcar', descripcion: 'Montaña famosa por sus vistas panorámicas y teleférico.', lat: -22.9486, lon: -43.1566 },
    ],
    aerolineas: [
      'GOL', 'LATAM', 'Azul', 'Aerolíneas Argentinas', 'American Airlines',
      'Air France', 'Copa Airlines', 'Emirates', 'Iberia', 'KLM', 'Lufthansa',
      'TAP Air Portugal', 'United Airlines'
    ],
  },

  'São Paulo': {
    lat: -23.5505,
    lon: -46.6333,
    aeropuerto: 'Guarulhos (GRU) y Congonhas (CGH)',
    lugares: [
      { id: '1', nombre: 'Avenida Paulista', descripcion: 'Una de las avenidas más importantes de São Paulo.', lat: -23.5614, lon: -46.6559 },
      { id: '2', nombre: 'Parque Ibirapuera', descripcion: 'Gran parque urbano con espacios verdes y culturales.', lat: -23.5874, lon: -46.6576 },
      { id: '3', nombre: 'Catedral da Sé', descripcion: 'Importante catedral ubicada en el centro histórico de la ciudad.', lat: -23.5514, lon: -46.6339 },
    ],
    aerolineas: [
      'LATAM', 'GOL', 'Azul', 'Aerolíneas Argentinas', 'American Airlines',
      'Air France', 'Emirates', 'Iberia', 'Lufthansa', 'Qatar Airways',
      'TAP Air Portugal', 'United Airlines', 'Copa Airlines'
    ],
  },

  'Florianópolis': {
    lat: -27.5954,
    lon: -48.5480,
    aeropuerto: 'Aeropuerto Internacional Hercílio Luz (FLN)',
    lugares: [
      { id: '1', nombre: 'Puente Hercílio Luz', descripcion: 'Puente colgante histórico, uno de los símbolos de Florianópolis.', lat: -27.5931, lon: -48.5664 },
      { id: '2', nombre: 'Playa Joaquina', descripcion: 'Playa conocida por sus dunas y condiciones para practicar surf.', lat: -27.6298, lon: -48.4523 },
      { id: '3', nombre: 'Santo Antônio de Lisboa', descripcion: 'Barrio tradicional conocido por su arquitectura y gastronomía.', lat: -27.5110, lon: -48.5180 },
    ],
    aerolineas: [
      'LATAM', 'GOL', 'Azul', 'Copa Airlines',
      'Flybondi (según temporada)', 'JetSMART (según temporada)',
      'SKY Airline (según temporada)'
    ],
  },
};

// INFORMACIÓN DE LAS AEROLÍNEAS
const informacionAerolineas = {
  'Aerolíneas Argentinas': {
    origen: 'Argentina 🇦🇷',
    descripcion: 'Aerolínea de bandera argentina. Realiza vuelos nacionales e internacionales.',
    web: 'https://www.aerolineas.com.ar/',
  },
  'JetSMART': {
    origen: 'Chile 🇨🇱',
    descripcion: 'Aerolínea de bajo costo que conecta distintos destinos de América.',
    web: 'https://www.jetsmart.com/',
  },
  'Flybondi': {
    origen: 'Argentina 🇦🇷',
    descripcion: 'Aerolínea argentina de bajo costo que ofrece vuelos nacionales e internacionales.',
    web: 'https://flybondi.com/',
  },
  'LATAM': {
    origen: 'Chile / Brasil 🇨🇱🇧🇷',
    descripcion: 'Grupo de aerolíneas que conecta destinos de América, Europa y otros continentes.',
    web: 'https://www.latamairlines.com/',
  },
  'GOL': {
    origen: 'Brasil 🇧🇷',
    descripcion: 'Aerolínea brasileña que ofrece vuelos nacionales e internacionales.',
    web: 'https://www.voegol.com.br/',
  },
  'Azul': {
    origen: 'Brasil 🇧🇷',
    descripcion: 'Aerolínea brasileña con conexiones nacionales e internacionales.',
    web: 'https://www.voeazul.com.br/',
  },
  'Iberia': {
    origen: 'España 🇪🇸',
    descripcion: 'Aerolínea española con conexiones entre Europa, América y otros destinos.',
    web: 'https://www.iberia.com/',
  },
  'Air Europa': {
    origen: 'España 🇪🇸',
    descripcion: 'Aerolínea española que conecta Europa con América y otros destinos.',
    web: 'https://www.aireuropa.com/',
  },
  'Ryanair': {
    origen: 'Irlanda 🇮🇪',
    descripcion: 'Aerolínea europea de bajo costo con una amplia red de destinos.',
    web: 'https://www.ryanair.com/',
  },
  'Vueling': {
    origen: 'España 🇪🇸',
    descripcion: 'Aerolínea española de bajo costo que conecta numerosas ciudades europeas.',
    web: 'https://www.vueling.com/',
  },
  'Lufthansa': {
    origen: 'Alemania 🇩🇪',
    descripcion: 'Una de las principales aerolíneas alemanas, con conexiones internacionales.',
    web: 'https://www.lufthansa.com/',
  },
  'Air France': {
    origen: 'Francia 🇫🇷',
    descripcion: 'Aerolínea francesa que conecta París con destinos de todo el mundo.',
    web: 'https://www.airfrance.com/',
  },
  'Emirates': {
    origen: 'Emiratos Árabes Unidos 🇦🇪',
    descripcion: 'Aerolínea internacional con base en Dubái y una extensa red de rutas.',
    web: 'https://www.emirates.com/',
  },
  'Copa Airlines': {
    origen: 'Panamá 🇵🇦',
    descripcion: 'Aerolínea panameña que conecta América a través de Panamá.',
    web: 'https://www.copaair.com/',
  },
  'Avianca': {
    origen: 'Colombia 🇨🇴',
    descripcion: 'Aerolínea colombiana con conexiones en América y otros destinos.',
    web: 'https://www.avianca.com/',
  },
  'American Airlines': {
    origen: 'Estados Unidos 🇺🇸',
    descripcion: 'Una de las principales aerolíneas estadounidenses, con rutas internacionales.',
    web: 'https://www.aa.com/',
  },
  'LADE': {
    origen: 'Argentina 🇦🇷',
    descripcion: 'Líneas Aéreas del Estado, dedicada a conectar distintas localidades argentinas.',
    web: 'https://www.lade.com.ar/',
  },
  'SKY Airline': {
    origen: 'Chile 🇨🇱',
    descripcion: 'Aerolínea chilena de bajo costo con rutas nacionales e internacionales.',
    web: 'https://www.skyairline.com/',
  },
  'KLM': {
    origen: 'Países Bajos 🇳🇱',
    descripcion: 'Aerolínea neerlandesa con base en Ámsterdam.',
    web: 'https://www.klm.com/',
  },
  'Qatar Airways': {
    origen: 'Catar 🇶🇦',
    descripcion: 'Aerolínea internacional con base en Doha.',
    web: 'https://www.qatarairways.com/',
  },
  'British Airways': {
    origen: 'Reino Unido 🇬🇧',
    descripcion: 'Aerolínea británica con conexiones internacionales.',
    web: 'https://www.britishairways.com/',
  },
  'United Airlines': {
    origen: 'Estados Unidos 🇺🇸',
    descripcion: 'Aerolínea estadounidense con una amplia red de vuelos internacionales.',
    web: 'https://www.united.com/',
  },
  'TAP Air Portugal': {
    origen: 'Portugal 🇵🇹',
    descripcion: 'Aerolínea portuguesa que conecta Europa, América y África.',
    web: 'https://www.flytap.com/',
  },
  'EasyJet': {
    origen: 'Reino Unido 🇬🇧',
    descripcion: 'Aerolínea europea de bajo costo.',
    web: 'https://www.easyjet.com/',
  },
  'Turkish Airlines': {
    origen: 'Turquía 🇹🇷',
    descripcion: 'Aerolínea turca con conexiones a numerosos destinos internacionales.',
    web: 'https://www.turkishairlines.com/',
  },
  'Wizz Air': {
    origen: 'Hungría 🇭🇺',
    descripcion: 'Aerolínea europea de bajo costo.',
    web: 'https://www.wizzair.com/',
  },
};

export default function MapaCiudadScreen({ route, navigation }) { // NUEVO: navigation
  const { ciudad, pais } = route.params;

  // NUEVO: usuario desde el contexto
  const { usuario } = useContext(AuthContext);
  const idUsuario = typeof usuario === 'object' ? usuario?.email : usuario;

  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [aerolineaSeleccionada, setAerolineaSeleccionada] = useState(null);

  const destino = ciudades[ciudad];

  if (!destino) {
    return (
      <View style={styles.contenedor}>
        <Text>No encontramos información para esta ciudad.</Text>
      </View>
    );
  }

  // Preparamos los elementos para una sola FlatList.
  const contenido = [
    { id: 'titulo-lugares', tipo: 'seccion', nombre: '📍 Lugares de interés' },
  ];

  for (const lugar of destino.lugares) {
    contenido.push({ ...lugar, tipo: 'lugar' });
  }

  contenido.push({
    id: 'titulo-aerolineas',
    tipo: 'seccion',
    nombre: '✈️ Aerolíneas',
  });

  for (let i = 0; i < destino.aerolineas.length; i++) {
    contenido.push({
      id: `aerolinea-${i}`,
      tipo: 'aerolinea',
      nombre: destino.aerolineas[i],
    });
  }

  const abrirMapa = (lat, lon) => {
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
    Linking.openURL(url);
  };

  // NUEVO: guardar la reserva
  const reservarVuelo = async () => {
    if (!idUsuario) {
      Alert.alert('Atención', 'Tenés que iniciar sesión para reservar.');
      return;
    }

    const guardado = await guardarVuelo(idUsuario, {
      origen: 'Córdoba',
      destino: ciudad,
      fecha: '15/12/2026',
      aerolinea: destino.aerolineas[0],
      precio: 'A consultar',
    });

    if (!guardado) {
      Alert.alert('Error', 'No se pudo guardar la reserva.');
      return;
    }

    Alert.alert('¡Listo!', 'Tu vuelo fue reservado.');
    navigation.navigate('MisVuelos');
  };

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={contenido}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <View>
            <Text style={styles.titulo}>{ciudad}</Text>

            <Text style={styles.subtitulo}>{pais}</Text>

            <Text style={styles.aeropuerto}>
              ✈️ {destino.aeropuerto}
            </Text>

            {/* MAPA DE LA CIUDAD */}
            <MapaCiudad
              ciudad={ciudad}
              lat={destino.lat}
              lon={destino.lon}
            />

            {/* NUEVO: BOTÓN DE RESERVA */}
            <Pressable style={styles.boton} onPress={reservarVuelo}>
              <Text style={styles.textoBoton}>
                Reservar vuelo a {ciudad}
              </Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => {
          if (item.tipo === 'seccion') {
            return (
              <Text style={styles.seccion}>
                {item.nombre}
              </Text>
            );
          }

          if (item.tipo === 'lugar') {
            return (
              <Pressable
                style={styles.tarjeta}
                onPress={() => setLugarSeleccionado(item)}
              >
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.accion}>Ver información →</Text>
              </Pressable>
            );
          }

          const nombreBase = item.nombre.replace(/\s*\(.*\)/, '');

          return (
            <Pressable
              style={styles.aerolinea}
              onPress={() =>
                setAerolineaSeleccionada({
                  nombre: item.nombre,
                  ...(informacionAerolineas[nombreBase] || {
                    origen: 'Internacional',
                    descripcion: 'Consultá información sobre esta compañía en su página oficial.',
                    web: null,
                  }),
                })
              }
            >
              <Text style={styles.nombreAerolinea}>
                ✈️ {item.nombre}
              </Text>
              <Text style={styles.accion}>
                Conocer aerolínea →
              </Text>
            </Pressable>
          );
        }}
      />

      {/* MODAL DE LUGARES TURÍSTICOS */}
      <Modal
        visible={lugarSeleccionado !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setLugarSeleccionado(null)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            {lugarSeleccionado && (
              <>
                <Text style={styles.tituloModal}>
                  {lugarSeleccionado.nombre}
                </Text>

                <Text style={styles.descripcion}>
                  {lugarSeleccionado.descripcion}
                </Text>

                <Pressable
                  style={styles.boton}
                  onPress={() =>
                    abrirMapa(lugarSeleccionado.lat, lugarSeleccionado.lon)
                  }
                >
                  <Text style={styles.textoBoton}>
                    Ver ubicación en el mapa
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.botonCerrar}
                  onPress={() => setLugarSeleccionado(null)}
                >
                  <Text style={styles.textoCerrar}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* MODAL DE AEROLÍNEAS */}
      <Modal
        visible={aerolineaSeleccionada !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setAerolineaSeleccionada(null)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            {aerolineaSeleccionada && (
              <>
                <Text style={styles.tituloModal}>
                  ✈️ {aerolineaSeleccionada.nombre}
                </Text>

                <Text style={styles.descripcion}>
                  País de origen: {aerolineaSeleccionada.origen}
                </Text>

                <Text style={styles.descripcion}>
                  {aerolineaSeleccionada.descripcion}
                </Text>

                {aerolineaSeleccionada.web && (
                  <Pressable
                    style={styles.boton}
                    onPress={() =>
                      Linking.openURL(aerolineaSeleccionada.web)
                    }
                  >
                    <Text style={styles.textoBoton}>
                      Visitar página oficial
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  style={styles.botonCerrar}
                  onPress={() => setAerolineaSeleccionada(null)}
                >
                  <Text style={styles.textoCerrar}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F1F6FA',
  },
  lista: {
    padding: 20,
    paddingBottom: 35,
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#123B66',
    marginTop: 15,
  },
  subtitulo: {
    fontSize: 16,
    color: '#687786',
    marginTop: 5,
  },
  aeropuerto: {
    color: '#526273',
    fontSize: 14,
    marginTop: 15,
    lineHeight: 21,
  },
  seccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123B66',
    marginTop: 25,
    marginBottom: 12,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#123B66',
  },
  accion: {
    color: '#1976D2',
    marginTop: 7,
  },
  aerolinea: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  nombreAerolinea: {
    fontSize: 15,
    color: '#123B66',
    fontWeight: '600',
  },
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 22,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },
  tituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#123B66',
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 16,
    color: '#526273',
    lineHeight: 23,
    marginBottom: 8,
  },
  boton: {
    backgroundColor: '#123B66',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botonCerrar: {
    padding: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  textoCerrar: {
    color: '#123B66',
    fontWeight: 'bold',
  },
});