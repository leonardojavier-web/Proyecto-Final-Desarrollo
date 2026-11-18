import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InicioStack from '../stack/InicioStack';
import MapaScreen from '../../screens/MapaScreen';
import MisVuelosScreen from '../../screens/MisVuelosScreen';

const Tab = createBottomTabNavigator();

const iconos = {
  Inicio: '🏠',
  Mapa: '🗺️',
  MisVuelos: '✈️',
};

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#123B66',
        tabBarInactiveTintColor: '#8795A1',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: 6 + insets.bottom,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
            {iconos[route.name]}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{ tabBarLabel: 'Inicio' }}
      />

      <Tab.Screen
        name="Mapa"
        component={MapaScreen}
        options={{ tabBarLabel: 'Mapa' }}
      />

      <Tab.Screen
        name="MisVuelos"
        component={MisVuelosScreen}
        options={{ tabBarLabel: 'Mis vuelos' }}
      />
    </Tab.Navigator>
  );
}