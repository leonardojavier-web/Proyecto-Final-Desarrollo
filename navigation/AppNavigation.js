import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../context/AuthContext';
import AuthStack from './stack/AuthStack';
import AppTabs from './tab/AppTabs';

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const { usuario, cargando, logout } = useContext(AuthContext);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#123B66" />
      </View>
    );
  }

  if (!usuario) {
    return <AuthStack />;
  }

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AeroGo"
        component={AppTabs}
      />

      <Drawer.Screen
        name="Cerrar sesión"
        component={CerrarSesion}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

function CerrarSesion() {
  const { logout } = useContext(AuthContext);

  React.useEffect(() => {
    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cerrando sesión...</Text>
    </View>
  );
}
