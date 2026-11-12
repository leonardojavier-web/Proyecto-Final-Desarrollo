import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import InicioStack from '../stack/InicioStack';
import MapaScreen from '../../screens/MapaScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#123B66',
        tabBarInactiveTintColor: '#8795A1',

        tabBarIcon: ({ color, size }) => {
          const icono =
            route.name === 'Inicio' ? 'home' : 'map';

          return (
            <Ionicons
              name={icono}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
      />

      <Tab.Screen
        name="Mapa"
        component={MapaScreen}
      />
    </Tab.Navigator>
  );
}
