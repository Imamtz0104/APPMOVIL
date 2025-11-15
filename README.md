# 📱 Control de Asistencia - Aplicación Ionic

Una aplicación moderna para gestionar la asistencia de estudiantes, construida con **Ionic Framework + React + TypeScript**.

## ✨ Características

- ✅ **Interfaz moderna** con componentes Ionic
- 📱 **Responsive design** - Funciona en móvil, tablet y desktop
- 🔐 **Autenticación** - Sistema de login seguro
- 👥 **Gestión de cursos** - Visualiza todos tus cursos
- ✓ **Control de asistencia** - Marca presencia, ausencia o tardanza
- 💾 **Persistencia** - Guarda registros de asistencia
- 🌐 **PWA Ready** - Funciona offline con Progressive Web App
- 📦 **Compilable a iOS/Android** - Con Capacitor
- ⚡ **Rápida** - Compilada con Vite

## 🚀 Quick Start

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### 3. Credenciales de prueba
```
Email:    teacher@school.edu
Password: password
```

## 📁 Estructura del Proyecto

```
src/
├── App.tsx                 # Componente raíz con routing
├── index.tsx              # Entry point
├── index.html             # HTML base
├── index.css              # Estilos globales
├── types.ts               # TypeScript interfaces
│
├── pages/                 # Páginas Ionic
│   ├── LoginPage.tsx      # Página de login
│   ├── DashboardPage.tsx  # Dashboard principal
│   └── AttendancePage.tsx # Página de asistencia
│
├── components/            # Componentes reutilizables
│   ├── CourseCard.tsx     # Tarjeta de curso
│   ├── StudentRow.tsx     # Fila de estudiante
│   └── ...
│
├── services/              # Servicios y datos
│   ├── mockData.ts        # Datos de prueba
│   └── geminiService.ts   # Integración Gemini AI
│
└── styles/                # Estilos CSS
    ├── LoginPage.css
    ├── DashboardPage.css
    └── ...

dist/                      # Build producción (después de npm run build)
```

## 🛠️ Scripts disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Vista previa del build
```

## 🎨 Tecnologías utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Ionic Framework 8** - Componentes mobile
- **Vite** - Build tool rápido
- **React Router v5** - Navegación
- **Ionicons** - Iconos

## 📱 Flujo de la aplicación

```
LOGIN → DASHBOARD → ATTENDANCE → SAVE → LOGOUT
```

## 🔒 Seguridad

- Las credenciales son validadas (en desarrollo con datos mock)
- Para producción, integrar con API backend

## 📚 Documentación

- [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md) - Detalles de la migración
- [FAQ.md](./FAQ.md) - Preguntas frecuentes
- [Ionic React Docs](https://ionicframework.com/docs/react)

## ⚡ Compilar a App Nativa

```bash
npm run build
npx cap add ios
npx cap open ios
```

---

**Hecho con ❤️ usando Ionic Framework**
