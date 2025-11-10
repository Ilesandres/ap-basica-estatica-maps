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
        tipo: "Comida"
    },
    {
        id: 2,
        nombre: "Centro Comunitario Esperanza",
        descripcion: "Recolección de ropa de invierno.",
        coordenadas: {
            lat: 3.4516,  // Latitud
            lng: -76.5320 // Longitud (Ejemplo: Cali)
        },
        tipo: "Ropa"
    },
    {
        id: 3,
        nombre: "Escuela Rural El Pensamiento",
        descripcion: "Entrega de útiles escolares.",
        coordenadas: {
            lat: 6.2442,  // Latitud
            lng: -75.5812 // Longitud (Ejemplo: Medellín)
        },
        tipo: "Educación"
    }
];

module.exports = donaciones;