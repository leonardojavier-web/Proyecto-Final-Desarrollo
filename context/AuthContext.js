import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Comprobar si existe una sesión
  useEffect(() => {
    const obtenerSesion = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log('Error al recuperar sesión:', error.message);
      }

      setUsuario(data?.session?.user ?? null);
      setCargando(false);
    };

    obtenerSesion();

    // Escuchar cambios en la autenticación
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Registrar usuario
  const registrar = async (correo, contraseña) => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contraseña,
    });

    if (error) {
      return { error: error.message };
    }

    return { data, error: null };
  };

  // Iniciar sesión
  const login = async (correo, contraseña) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: correo,
        password: contraseña,
      });

    if (error) {
      return { error: error.message };
    }

    return { data, error: null };
  };

  // Cerrar sesión
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        registrar,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
