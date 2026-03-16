# 🎬 **FilmRank** - Aplicación Web de Películas y Series

FilmRank es una SPA (Single Page Application) desarrollada en **React** que permite explorar, buscar y calificar películas y series utilizando la API de **TMDB (The Movie Database)**. El proyecto fue realizado como parte del trabajo práctico final del ciclo Front-End en UTN.

---

## 🌐 **Demo del Proyecto**
👀 **Explora la aplicación en vivo:**

🔗 [**Ver Sitio Web en Netlify**](https://film-rank.netlify.app/)

---

## 📁 **Estructura del Proyecto**
```

FilmRank-App/
├── node_modules/               # Dependencias instaladas por npm
├── public/                     # Archivos públicos (logo, _redirects)
├── src/ 
|    ├── assets/                # Recursos estáticos (placeholder)
|    ├── components/            # Componentes reutilizables (Navbar, Footer, Card, etc.)
|    ├── context/               # Contextos globales (Tema, Ranking)
|    ├── hooks/                 # Hooks personalizados (useTheme, useDebounce, usePageTitle, etc.)
|    ├── layouts/               # Componente Layout generales (estructura común de la app)
|    ├── pages/                 # Vistas principales (Home, Movies, Series, Detalle, etc.)
|    ├── routes/                # Definición de las rutas de la aplicación
|    ├── services/              # Funciones para interactuar con la API de TMDB
|    ├── styles/                # Archivos de estilos globales (globals, variables)
|    ├── utils/                 # Funciones auxiliares y utilitarias
|    ├── App.jsx                # Componente raíz de la aplicación
|    └── main.jsx               # Punto de entrada de la aplicación (renderizado inicial)
├── index.html                  # Plantilla HTML principal
├── package.json                # Dependencias y scripts del proyecto
├── package-lock.json           # Versiones fijas de las dependencias instaladas
├── vite.config.js              # Configuración de Vite (herramienta de construcción)
├── .env                        # Variables de entorno (incluye API Key)
├── .gitignore                  # Archivos y directorios ignorados por Git
└── README.md                   # Documentación del proyecto

```

---

## ⚙️ **Funcionalidades principales**

- 💾 **Lista personalizada** de contenido visto con calificación y almacenamiento local (no se guarda entre dispositivos)
- ⭐ **Sistema de calificación** de 1 a 5 estrellas editable
- 🛎️ **Notificaciones en tiempo real con Toastify** para acciones como calificar o eliminar
- 🔍 **Búsqueda por nombre** de películas o series (con manejo de query en la URL)
- 📃 **Scroll infinito** en listados (películas, series, búsqueda)
- 🗂️ **Secciones dinámicas**: Películas, Series, Inicio (con Swiper), Detalle, Mi Ranking
- 🌗 **Modo oscuro / claro** con persistencia en localStorage
- 📱 **Diseño responsive** para celular y desktop
- 🔃 **Loader** global, y navegación fluida
- 📦 **PropTypes** y código modular
- 🧠 **React Context API** y hooks personalizados
- ✅ SEO básico con títulos dinámicos por página

> 🛠️ Algunas funcionalidades se encuentran en proceso de implementación y serán completadas próximamente.

---

## 🔑 **API Utilizada**

- [TMDB API (The Movie Database)](https://www.themoviedb.org/documentation/api)
  - Requiere clave personal gratuita.
  - Guardar en archivo `.env`:

    ```env
    VITE_TMDB_API_KEY=TU_API_KEY_AQUI
    ```

---

## ❗ **Requisitos**

- Node.js 18+
- npm o yarn
- Clave API válida de TMDB

---

## 🔧 **Instalación y uso local**

1. **Clonar el repositorio**

```bash
git clone https://github.com/GaitanTomas/Proyecto-UTN-2_FilmRank.git
cd Proyecto-UTN-2_FilmRank
```

2. **Instalar las dependencias**

```bash
npm install
```

3. **Agregar la API Key de TMDB**

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_TMDB_API_KEY=TU_API_KEY_AQUI
```

4. **Iniciar la app en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ **Tecnologías Utilizadas**

- React + Vite
- JavaScript
- React Router DOM
- Swiper.js (para sliders en inicio)
- React Infinite Scroll Component
- PropTypes
- Lucide React (íconos SVG)
- Context API y Custom Hooks
- CSS Modules + Variables CSS
- LocalStorage (para persistencia de datos como el ranking o el modo de tema)
- React Toastify

---

## 🖥️ **Scripts disponibles**

- `npm run dev` — Iniciar entorno de desarrollo.
- `npm run build` — Crear build de producción.
- `npm run preview` — Previsualizar build.
- `npm run lint` — Linting del código.

---

## 📝 **Notas importantes**

- Proyecto 100% **frontend**, sin backend.
- No requiere base de datos.
- **Requiere conexión a Internet** para interactuar con la API de TMDB.
- La **API Key** debe estar en el archivo `.env` (¡no la subas a GitHub!).

---

## 🙋‍♂️ Autor

**[Tomás Gaitán]** - [GitHub](https://github.com/GaitanTomas)

---

## 📄 Licencia

Proyecto de uso educativo para UTN - Diplomatura Fullstack Front-End.