import AsyncStorage from '@react-native-async-storage/async-storage';

// Cada usuario tiene su propia lista de vuelos.
const clave = (usuario) => `vuelos_${String(usuario).toLowerCase()}`;

export async function obtenerVuelos(usuario) {
  try {
    const guardado = await AsyncStorage.getItem(clave(usuario));
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.log('Error al leer vuelos:', error);
    return [];
  }
}

export async function guardarVuelo(usuario, vuelo) {
  try {
    const vuelos = await obtenerVuelos(usuario);

    const nuevoVuelo = {
      ...vuelo,
      id: Date.now().toString(),
      fechaReserva: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      clave(usuario),
      JSON.stringify([nuevoVuelo, ...vuelos])
    );

    return nuevoVuelo;
  } catch (error) {
    console.log('Error al guardar vuelo:', error);
    return null;
  }
}

export async function eliminarVuelo(usuario, idVuelo) {
  try {
    const vuelos = await obtenerVuelos(usuario);
    const restantes = vuelos.filter((v) => v.id !== idVuelo);

    await AsyncStorage.setItem(clave(usuario), JSON.stringify(restantes));
    return restantes;
  } catch (error) {
    console.log('Error al eliminar vuelo:', error);
    return null;
  }
}