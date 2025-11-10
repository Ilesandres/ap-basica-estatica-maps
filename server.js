// server.js
require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const path = require('path');
const donaciones = require('./data/donaciones'); // Importa los datos estáticos
const fs = require('fs');

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

// Habilitar parseo de JSON en el body
app.use(express.json());

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

// Obtener una donación por id
app.get('/api/donaciones/:id', (req, res) => {
    const id = Number(req.params.id);
    const d = donaciones.find(x => x.id === id);
    if (!d) return res.status(404).json({ error: 'Donación no encontrada' });
    res.json({ data: d });
});

// Crear una nueva donación (en memoria)
app.post('/api/donaciones', (req, res) => {
    const body = req.body;
    if (!body || !body.nombre || !body.coordenadas) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y coordenadas' });
    }

    const nextId = donaciones.reduce((max, it) => Math.max(max, it.id), 0) + 1;
    const nueva = {
        id: nextId,
        nombre: body.nombre,
        descripcion: body.descripcion || '',
        tipo: body.tipo || 'Otro',
        coordenadas: body.coordenadas,
        reportes: body.reportes || []
    };

    donaciones.push(nueva);

    // Nota: persistimos solo en memoria. Para persistencia real, escribir a un archivo o DB.
    return res.status(201).json({ data: nueva });
});

// Agregar un reporte a una donación existente
app.post('/api/donaciones/:id/reportes', (req, res) => {
    // Log incoming request for debugging
    console.log(`POST /api/donaciones/${req.params.id}/reportes - body:`, req.body);
    const id = Number(req.params.id);
    const d = donaciones.find(x => x.id === id);
    if (!d) {
        console.warn(`Donación con id=${id} no encontrada. IDs actuales: [${donaciones.map(x => x.id).join(', ')}]`);
        return res.status(404).json({ error: 'Donación no encontrada' });
    }

    const body = req.body;
    if (!body || !body.coordenadas) return res.status(400).json({ error: 'Faltan coordenadas del reporte' });

    const nextReportIndex = (d.reportes && d.reportes.length) ? d.reportes.length + 1 : 1;
    const reportId = `r${d.id}-${nextReportIndex}`;
    const nuevoReporte = {
        id: reportId,
        nombre: body.nombre || `Reporte ${nextReportIndex}`,
        descripcion: body.descripcion || '',
        coordenadas: body.coordenadas
    };

    d.reportes = d.reportes || [];
    d.reportes.push(nuevoReporte);
    // Log the updated donation with its reportes to the server console
    console.log('Reporte agregado. Donación actualizada:');
    console.log(JSON.stringify(d, null, 2));

    // Si el cliente indicó que este reporte es el final, marcar la donación como finalizada
    if (body.final) {
        d.finalizado = true;
        console.log(`Donación id=${d.id} marcada como finalizada (via reporte final). Coordenadas del destino se mantienen.`);
        console.log(JSON.stringify(d, null, 2));
    }

    return res.status(201).json({ data: nuevoReporte });
});

// Endpoint para finalizar una donación explícitamente: usa el último reporte como destino
app.post('/api/donaciones/:id/finalizar', (req, res) => {
    const id = Number(req.params.id);
    const d = donaciones.find(x => x.id === id);
    if (!d) return res.status(404).json({ error: 'Donación no encontrada' });

    if (!d.reportes || d.reportes.length === 0) {
        // permitir finalizar aunque no haya reportes: marcar finalizado, pero avisar
        d.finalizado = true;
        console.log(`Donación id=${d.id} finalizada vía /finalizar pero no tenía reportes.`);
        console.log(JSON.stringify(d, null, 2));
        return res.json({ data: d });
    }

    // No cambiar las coordenadas: el destino fue definido al crear la donación
    d.finalizado = true;

    console.log(`Donación id=${d.id} finalizada vía /finalizar. Coordenadas del destino se mantienen:`);
    console.log(JSON.stringify(d, null, 2));

    return res.json({ data: d });
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