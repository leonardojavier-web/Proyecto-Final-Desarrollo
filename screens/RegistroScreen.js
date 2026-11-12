import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import InputPersonalizado from '../components/InputPersonalizado';
import BotonPersonalizado from '../components/BotonPersonalizado';

export default function RegistroScreen({ navigation }) {
  const { registrar } = useContext(AuthContext);

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const crearCuenta = async () => {
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }

    try {
      const resultado = await registrar(
        correo.trim(),
        contraseña
      );

      if (resultado.error) {
        Alert.alert('Error', resultado.error);
      } else {
        Alert.alert(
          '¡Registro exitoso!',
          'Tu cuenta fue creada correctamente.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>AeroGo ✈️</Text>
      <Text style={styles.titulo}>Crear cuenta</Text>
      <Text style={styles.subtitulo}>
        Comenzá tu próximo viaje
      </Text>

      <InputPersonalizado
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />

      <InputPersonalizado
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />

      <BotonPersonalizado
        titulo="Registrarme"
        onPress={crearCuenta}
      />

      <Text
        style={styles.enlace}
        onPress={() => navigation.navigate('Login')}
      >
        ¿Ya tenés cuenta? Iniciá sesión
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
    textAlign: 'center',
    color: '#687786',
    marginBottom: 20,
  },
  enlace: {
    textAlign: 'center',
    color: '#123B66',
    marginTop: 15,
  },
});
