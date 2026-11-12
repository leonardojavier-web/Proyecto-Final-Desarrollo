export const validarRegistro = (usuario, contraseña) => {
  if (!usuario.trim() || !contraseña.trim()) {
    return 'Todos los campos son obligatorios';
  }

  if (usuario.length < 3) {
    return 'El usuario debe tener al menos 3 caracteres';
  }

  if (contraseña.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }

  return null;
};
