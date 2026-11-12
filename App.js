import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import InicioScreen from './screens/InicioScreen';
import DestinosScreen from './screens/DestinosScreen';
import MapaScreen from './screens/MapaScreen';
import MapaCiudadScreen from './screens/MapaCiudadScreen';
import MisVuelosScreen from './screens/MisVuelosScreen';

const Stack = createNativeStackNavigator();

function Navegacion() {
  const { usuario } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <>
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="Destinos" component={DestinosScreen} />
            <Stack.Screen name="Mapa" component={MapaScreen} />
            <Stack.Screen name="MapaCiudad" component={MapaCiudadScreen} />
            <Stack.Screen
              name="MisVuelos"
              component={MisVuelosScreen}
              options={{ title: 'Mis vuelos' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navegacion />
    </AuthProvider>
  );
}