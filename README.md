# 🌌 Star Wars App

Aplicación web construida en **React 19 + Vite + TypeScript**, que consume la API de **[swapi.info](https://swapi.info/)** y la API de imágenes de **[akabab Star Wars API](https://akabab.github.io/starwars-api/)**.  

Permite explorar personajes de Star Wars, ver sus detalles, especies y películas en las que aparecen, con un diseño inspirado en la temática de la saga.

---

## 🚀 Demo en producción

👉 [Ver la aplicación en GitHub Pages](https://jesusdavid31.github.io/star-wars-reborn/#/home-page)

---

## ✨ Características

- ⚛️ **React 19 + Vite** → stack moderno y rápido para desarrollo web.
- 🎨 **SCSS Modules** → estilos personalizados, con animaciones temáticas (Sol, Tierra, Estrella de la Muerte).
- 🔄 **Custom Hook (`useCharacters`)** → carga de personajes con:
  - Paginación en memoria.
  - Enriquecimiento de datos (imágenes, especies y films).
  - Uso de `AbortController` para cancelar peticiones.
  - Manejo de `loading` y `error`.
- 📱 **Responsive** → diseño adaptado para desktop y móvil.
- 🌓 **Modal de información (InfoModal)** → muestra detalles de personajes y películas.
- 🚀 **Galaxy Background** → animación espacial con `ogl` (OpenGL).
- 🛠️ **Helpers** → funciones utilitarias como `normalizeValue` para normalizar datos (`n/a`, `unknown`, etc.).

---

## 🗂️ Estructura del proyecto

```
src/
 ├─ assets/              # Recursos estáticos (svg, imágenes, etc.)
 ├─ components/          # Componentes compartidos
 │   ├─ galaxy/          # Componente Galaxy (fondo animado con OGL)
 │   ├─ loadable/        # Lazy loaders / wrappers
 │   ├─ shared/          # Otros componentes reutilizables
 │   └─ spinner/         # Loader solar animado
 ├─ helpers/             # Funciones utilitarias (e.g. normalizeValue.ts)
 ├─ layouts/blank/       # Layouts base (BlankLayout)
 ├─ pages/home-page/     # Página principal
 │   ├─ components/      # Componentes específicos (InfoModal)
 │   ├─ hooks/           # Hooks propios (useCharacters)
 │   ├─ HomePage.tsx     # Página principal
 │   └─ HomePage.scss    # Estilos de la página
 ├─ routes/              # Definición de rutas con React Router
 ├─ App.tsx              # Punto de entrada de la app
 ├─ index.tsx            # Render de ReactDOM
 └─ index.css            # Estilos globales
```

---

## ⚙️ Tecnologías

- **Frontend:**
  - [React 19](https://react.dev/) + [React DOM](https://react.dev/)
  - [React Router v7](https://reactrouter.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [SCSS](https://sass-lang.com/)

- **Animaciones/Gráficos:**
  - [OGL](https://github.com/oframe/ogl) → para el efecto Galaxy.

- **Herramientas:**
  - [Vite](https://vitejs.dev/) → bundler ultra rápido.
  - [ESLint](https://eslint.org/) + [TypeScript ESLint](https://typescript-eslint.io/) → linting.
  - [gh-pages](https://github.com/tschaub/gh-pages) → despliegue en GitHub Pages.

---

## 🚀 Scripts disponibles

En la raíz del proyecto puedes usar:

```bash
# Iniciar en modo desarrollo
pnpm dev

# Compilar build de producción
pnpm build

# Previsualizar build
pnpm preview

# Linting
pnpm lint

# Deploy en GitHub Pages
pnpm gh-deploy
```

---

## 📦 Instalación

1. Clona el repo:
   ```bash
   git clone https://github.com/jesusdavid31/star-wars-reborn.git
   cd star-wars-app
   ```

2. Instala dependencias:
   ```bash
   pnpm install
   ```

3. Corre en modo desarrollo:
   ```bash
   pnpm dev
   ```

4. Abre en tu navegador:
   ```
   http://localhost:5173
   ```

---

## 🖼️ Preview

![Star Wars App Screenshot](./src/assets/Screenshot%202025-09-03%20at%2015-40-43%20Star%20Wars%20Reborn.png)  

---

## 📱 Performance en móvil

Las animaciones de Sol/Tierra/Galaxy pueden ser pesadas en móviles.  
Se implementaron optimizaciones:
- Menos densidad de partículas en Galaxy en pantallas pequeñas.
- Apagado de animaciones costosas (`box-shadow`, `background-position`) con media queries.
- Soporte para `prefers-reduced-motion`.

---

## 🛠️ Helpers disponibles

### `normalizeValue(value: string)`
Convierte valores de la API en algo más legible:
- `"n/a"` → `"Not Applicable"`
- `"unknown"` → `"Unknown"`
- Otro → capitaliza primera letra.

Ejemplo:
```tsx
<span>{normalizeValue(species.language)}</span>
```

---

## 🌟 Futuras mejoras

- Añadir skeletons en tarjetas mientras cargan species/films.
- Implementar `React.lazy` y `Suspense` para carga diferida de modales.
- Mejorar accesibilidad (focus trap en modales).
- Pre-caching de imágenes para scroll más fluido.

---

## 📄 Licencia

Este proyecto es solo con fines educativos y no tiene afiliación con **Lucasfilm** ni **Star Wars**.  
La información y personajes provienen de APIs públicas de la comunidad.