// server.js
require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const path = require('path');
const donaciones = require('./data/donaciones'); // Importa los datos estáticos

const app = express();
const PORT = process.env.PORT || 3000;
const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// --- Middlewares ---
// Esto es crucial para que el front-end pueda acceder desde otro origen (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Sirve archivos estáticos (como el HTML y JS del front-end)
// Cambiado a la carpeta `view` para usar la vista proporcionada por el proyecto.
app.use(express.static(path.join(__dirname, 'view')));


// --- Endpoints de la API (Backend) ---

// 1. Endpoint para obtener las coordenadas de las donaciones
app.get('/api/donaciones', (req, res) => {
    console.log('Solicitud recibida para /api/donaciones');
    // Envía los datos estáticos como JSON
    res.json({
        total: donaciones.length,
        data: donaciones
    });
});

// 2. Endpoint para obtener la Clave de API de Google Maps
// *OJO*: Aunque se sirve, deberías restringir tu API Key de Google Maps
// solo a tu dominio para mayor seguridad.
app.get('/api/config', (req, res) => {
    res.json({
        mapsApiKey: MAPS_API_KEY
    });
});


// --- Vista de Carga (Front-end Básico) ---

// La vista principal (simplemente sirve un archivo HTML básico)
app.get('/', (req, res) => {
    // Servimos el index.html desde la carpeta 'view'.
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});


// --- Inicialización del Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`Donaciones disponibles en: http://localhost:${PORT}/api/donaciones`);
});