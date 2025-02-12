import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4173, // Usar el puerto de Render, si está disponible
    host: '0.0.0.0', // Permite que la aplicación sea accesible desde fuera del contenedor
  },
});
