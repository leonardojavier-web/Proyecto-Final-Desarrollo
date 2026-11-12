import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from '../../screens/InicioScreen';
import DestinosScreen from '../../screens/DestinosScreen';
import MapaCiudadScreen from '../../screens/MapaCiudadScreen';

const Stack = createNativeStackNavigator();

export default function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InicioPrincipal"
        component={InicioScreen}
        options={{ title: 'AeroGo' }}
      />

      <Stack.Screen
        name="Destinos"
        component={DestinosScreen}
        options={{ title: 'Destinos' }}
      />

      <Stack.Screen
        name="MapaCiudad"
        component={MapaCiudadScreen}
        options={{ title: 'Mapa del destino' }}
      />
    </Stack.Navigator>
  );
}
