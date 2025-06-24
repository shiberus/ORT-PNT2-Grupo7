# ORT-PNT2-Grupo7

## 🗓️ Turnera Médica - Documentación

### 📦 Requisitos previos

* Node.js 18+
* NPM
* Cuenta en [Supabase](https://supabase.com/)
* Acceso a las variables de entorno del proyecto

---

### 🔧 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/shiberus/ORT-PNT2-Grupo7.git
   cd TuTurno
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env.local` en la raíz con tus credenciales de Supabase:

   ```
   VITE_SUPABASE_URL=tu-url
   VITE_SUPABASE_ANON_KEY=tu-clave
   ```

---

### 🚀 Cómo levantar el entorno

```bash
npm run dev
```

Esto levanta la app en modo desarrollo en:
`http://localhost:5173`

---

### 🧩 Principales tecnologías usadas

| Tecnología   | Uso principal                       |
| ------------ | ------------------------------------|
| React        | Interfaz de usuario (SPA)           |
| Supabase     | Autenticación + Base de datos       |
| Zustand      | Manejo de estado global             |
| React Router | Ruteo de páginas                    |
| TailwindCSS  | Estilos                             |
| PWA          | Instalación en dispositivos móviles |
| Netlify      | Plataforma de deploy                |

---

### 👩‍⚕️ Funcionalidades principales

* Registro e inicio de sesión de usuarios
* Solicitud de turnos por especialidad, día y hora
* Visualización de turnos reservados
* Cancelación de turnos
* Manejo de sesión persistente (estado guardado con Zustand)

---

### ⚙️ Estructura del proyecto (resumen)

```
src/
├── auth/                  # Lógica de autenticación (Supabase)
│   ├── auth.service.js
│   └── supabaseAuth.js
│
├── components/            # Componentes visuales reutilizables
│   ├── Calendario/
│   ├── EspecialidadesSelector/
│   ├── Home/
│   ├── NavBar/
│   ├── SignIn/
│   ├── SignUp/
│   └── PageTitleHandler.jsx
│
├── constants/             # Constantes globales 
│
├── features/              # Lógica por funcionalidad
│   ├── turnos/
│   │   ├── pages/         # Páginas relacionadas a turnos
│   │   └── service/       # Servicios de Supabase para turnos
│   │
│   └── user/
│       ├── pages/         # Página de perfil
│       └── service/       # Servicios para usuario
│
├── hooks/                 # Custom hooks 
│
├── stores/                # Estado global con Zustand
│   └── useUserStore.js
│
├── main.jsx               # Punto de entrada principal
└── index.css              # Estilos globales

```

---


