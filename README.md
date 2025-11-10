# Donaciones Maps App

Servicio simple con Node.js + Express que expone coordenadas de donaciones y sirve una vista que muestra marcadores en Google Maps.

## Estructura del proyecto

```
donaciones-maps-app/
├── .env                # (no subir) variables de entorno
├── .env.example        # ejemplo de variables de entorno
├── .gitignore
├── package.json
├── server.js
├── README.md
├── data/
│   └── donaciones.js   # datos estáticos de donaciones
└── view/
    └── index.html      # front-end que carga Google Maps y consume la API
```

## Resumen

- El backend sirve:
  - `GET /api/donaciones` → devuelve la lista de donaciones (JSON)
  - `GET /api/config` → devuelve la `mapsApiKey` tomada de las variables de entorno
- La carpeta `view/` contiene el `index.html` que consume los endpoints y muestra los marcadores.

## Requisitos

- Node.js 16+ (o LTS estable)
- Una API Key de Google Maps (Maps JavaScript API habilitada)

## Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes variables (no subir al repo):

```
GOOGLE_MAPS_API_KEY=TU_CLAVE_DE_API_AQUI
PORT=3000
```

Hay un archivo de ejemplo llamado `.env.example` en la raíz.

## Instalación y uso (PowerShell)

1. Instala dependencias:

```powershell
cd 'C:\Users\Andres\Documents\itp\2025-2\diplomado\google-maps-api-node-express'
npm install
```

2. Crea `.env` usando `.env.example` y pega tu clave.

3. Inicia el servidor:

```powershell
npm start
```

4. Abre en el navegador:

- Vista principal: `http://localhost:3000/` (o el puerto que configures)
- API donaciones: `http://localhost:3000/api/donaciones`
- API config (key): `http://localhost:3000/api/config`

## Obtener una API Key en Google Cloud (paso a paso)

Sigue estos pasos para crear y restringir una API Key segura para usar con la Maps JavaScript API:

1. Accede a Google Cloud Console
  - Ve a https://console.cloud.google.com/ e inicia sesión con tu cuenta de Google.

2. Crea o selecciona un proyecto
  - En la parte superior, selecciona un proyecto existente o crea uno nuevo (Botón "Crear proyecto").

3. Habilita facturación
  - Google Maps Platform requiere que el proyecto tenga facturación habilitada.
  - Ve a `Facturación` y añade una cuenta de facturación (puedes usar el crédito gratuito si aplica).

4. Habilita la API necesaria
  - Ve a `APIs y servicios` → `Biblioteca`.
  - Busca "Maps JavaScript API" y haz clic en "Habilitar".

5. Crea las credenciales (API Key)
  - Ve a `APIs y servicios` → `Credenciales` → `+ CREAR CREDENCIALES` → `Clave de API`.
  - Copia la clave generada.

6. Restringe la clave (MUY IMPORTANTE)
  - Edita la clave y en "Restricciones de aplicación" selecciona "Referentes HTTP (sitios web)".
    - Añade por ejemplo: `http://localhost:3000/*` para desarrollo local.
    - Añade la URL de producción cuando despliegues (por ejemplo `https://misitio.com/*`).
  - En "Restricciones de API" selecciona "Restringir clave" y marca **Maps JavaScript API** (y otras APIs necesarias).
  - Guarda los cambios.

7. Usa la clave en tu proyecto
  - Añade la clave en tu archivo `.env` local:

```
GOOGLE_MAPS_API_KEY=TU_CLAVE_DE_API_AQUI
PORT=3000
```

Notas de seguridad
 - No subas el `.env` ni la clave a repositorios públicos.
 - Para mayor seguridad, restringe la clave a orígenes y APIs específicas en la consola.
 - Si necesitas exponer funcionalidades sensibles desde el backend (p. ej. geocoding server-side), considera crear claves separadas para cada uso y restringirlas apropiadamente.

## Endpoints

- `GET /api/donaciones` → { total, data: [ { id, nombre, descripcion, coordenadas: { lat, lng }, tipo } ] }
- `GET /api/config` → { mapsApiKey }

## Desarrollo y mejoras sugeridas

- Agregar `nodemon` como devDependency y un script `dev` para reinicio automático:
  `npm i -D nodemon` y en `package.json` agregar `"dev": "nodemon server.js"`.
- Reemplazar datos estáticos por una pequeña DB (SQLite o JSON file persistente) si se requiere CRUD.
- Agregar validaciones y manejo de errores más robusto en el backend.
- Implementar rutas para crear/editar/eliminar donaciones y protección por autenticación.

---

Si querés, puedo:
- Cambiar el nombre del package en `package.json` a `donaciones-maps-app`.
- Añadir un script `dev` con `nodemon` y un `.env.example` (ya creado junto a este README).
- Añadir tests o endpoints adicionales (p. ej. filtro por tipo o bounding box).

Dime qué prefieres y lo añado.
