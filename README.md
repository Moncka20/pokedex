# Pokédex App

Aplicación React construida con Vite para consumir PokéAPI, filtrar Pokémon en tiempo real y desplegarse como sitio estático.

## Desarrollo local

```bash
npm install
npm run dev
```

La URL base se configura en `.env` con `VITE_POKEAPI_URL`.

## Compilación y despliegue

```bash
npm run build
```

El resultado se genera en `dist/`. En Vercel o Netlify se debe configurar `VITE_POKEAPI_URL=https://pokeapi.co/api/v2`, usar `npm run build` como comando de compilación y `dist` como directorio publicado. El archivo `public/_redirects` permite resolver las rutas de una SPA en Netlify.
