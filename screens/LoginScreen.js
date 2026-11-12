import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import InputPersonalizado from '../components/InputPersonalizado';
import BotonPersonalizado from '../components/BotonPersonalizado';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

 
const iniciarSesion = async () => {
  if (!usuario.trim() || !contraseña.trim()) {
    Alert.alert('Atención', 'Completá todos los campos');
    return;
  }

  try {
    const resultado = await login(
      usuario.trim(),
      contraseña
    );

    if (resultado.error) {
      Alert.alert('Error', resultado.error);
    }
  } catch (error) {
    Alert.alert('Error', 'No se pudo iniciar sesión');
  }
};


  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>AeroGo ✈️</Text>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.subtitulo}>Tu próximo destino te espera</Text>

      <InputPersonalizado
        placeholder="Correo electrónico"
        value={usuario}
        onChangeText={setUsuario}
      />

      <InputPersonalizado
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />

      <BotonPersonalizado
        titulo="Iniciar sesión"
        onPress={iniciarSesion}
      />

      <Text
        style={styles.enlace}
        onPress={() => navigation.navigate('Registro')}
      >
        ¿No tenés cuenta? Registrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F1F6FA',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#123B66',
    textAlign: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
  },
  subtitulo: {
    color: '#687786',
    textAlign: 'center',
    marginBottom: 20,
  },
  enlace: {
    textAlign: 'center',
    color: '#123B66',
    marginTop: 15,
  },
});
