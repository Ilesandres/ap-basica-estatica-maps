// data/donaciones.js

const donaciones = [
    {
        id: 1,
        nombre: "Albergue Sol Naciente",
        descripcion: "Donación de alimentos no perecederos.",
        coordenadas: {
            lat: 4.5981,  // Latitud
            lng: -74.0760 // Longitud (Ejemplo: Bogotá)
        },
        tipo: "Comida",
        // Reportes / puntos por los que pasó la donación (ruta)
        reportes: [
            { id: 'r1-1', nombre: 'Recepción', descripcion: 'Punto de recepción inicial', coordenadas: { lat: 4.5981, lng: -74.0760 } },
            { id: 'r1-2', nombre: 'Centro de acopio', descripcion: 'Centro de acopio intermedio', coordenadas: { lat: 4.6000, lng: -74.0700 } },
            { id: 'r1-3', nombre: 'Ruta 3', descripcion: 'Transporte en camino', coordenadas: { lat: 4.6050, lng: -74.0600 } },
            { id: 'r1-4', nombre: 'Punto de entrega', descripcion: 'Entrega parcial en comunidad', coordenadas: { lat: 4.6100, lng: -74.0550 } },
            { id: 'r1-5', nombre: 'Destino final', descripcion: 'Destino final de la donación', coordenadas: { lat: 4.6150, lng: -74.0500 } }
        ]
    },
    {
        id: 2,
        nombre: "Centro Comunitario Esperanza",
        descripcion: "Recolección de ropa de invierno.",
        coordenadas: {
            lat: 3.4516,  // Latitud
            lng: -76.5320 // Longitud (Ejemplo: Cali)
        },
        tipo: "Ropa",
        reportes: [
            { id: 'r2-1', nombre: 'Punto A', descripcion: 'Recolección en punto A', coordenadas: { lat: 3.4516, lng: -76.5320 } },
            { id: 'r2-2', nombre: 'Punto B', descripcion: 'Traslado al centro', coordenadas: { lat: 3.4550, lng: -76.5300 } },
            { id: 'r2-3', nombre: 'Destino', descripcion: 'Entregado en el centro', coordenadas: { lat: 3.4580, lng: -76.5280 } }
        ]
    },
    {
        id: 3,
        nombre: "Escuela Rural El Pensamiento",
        descripcion: "Entrega de útiles escolares.",
        coordenadas: {
            lat: 6.2442,  // Latitud
            lng: -75.5812 // Longitud (Ejemplo: Medellín)
        },
        tipo: "Educación",
        // Este ejemplo no tiene una ruta larga, solo el punto final
        reportes: [
            { id: 'r3-1', nombre: 'Llegada', descripcion: 'Llegada a la escuela', coordenadas: { lat: 6.2442, lng: -75.5812 } }
        ]
    }
];

module.exports = donaciones;