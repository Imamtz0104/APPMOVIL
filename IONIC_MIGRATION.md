# Migración a Ionic - Guía de Instalación

## ¿Qué cambió?

Tu proyecto ha sido migrado de **React + Vite + Tailwind CSS** a **Ionic Framework + React + Vite**.

### Cambios Principales:

1. **Dependencias actualizadas**: Se agregaron `@ionic/react`, `@ionic/pwa-elements`, `react-router-dom` e `ionicons`
2. **Estructura de carpetas**: Se creó la carpeta `pages/` para las páginas Ionic
3. **Componentes**: Se migraron los componentes a usar componentes Ionic (`IonCard`, `IonButton`, `IonHeader`, etc.)
4. **Estilos**: Se mantienen los CSS originales pero se actualizaron para Ionic
5. **Routing**: Ahora usa `react-router-dom` con `IonReactRouter`

## Instalación

### Paso 1: Instalar dependencias

```bash
npm install
```

O si usas yarn:

```bash
yarn install
```

### Paso 2: Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`

### Paso 3: Compilar para producción

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── App.tsx                 # Componente principal con routing
├── index.tsx              # Entry point con Ionic setup
├── index.html             # HTML base
├── index.css              # Estilos globales
├── types.ts               # TypeScript interfaces
├── components/
│   ├── CourseCard.tsx     # Tarjeta de curso
│   ├── StudentRow.tsx     # Fila de estudiante
│   └── ...otros componentes
├── pages/
│   ├── LoginPage.tsx      # Página de login (NUEVA)
│   ├── DashboardPage.tsx  # Página del dashboard (NUEVA)
│   └── AttendancePage.tsx # Página de asistencia (NUEVA)
├── services/
│   ├── geminiService.ts
│   └── mockData.ts
└── styles/
    ├── LoginPage.css
    ├── DashboardPage.css
    ├── AttendancePage.css
    ├── StudentRow.css
    ├── CourseCard.css
    └── index.css
```

## Características de Ionic

### Componentes Ionic utilizados:

- **IonApp**: Contenedor principal de la aplicación
- **IonHeader**: Encabezado con toolbar
- **IonContent**: Contenedor de contenido con scroll
- **IonButton**: Botones interactivos
- **IonCard**: Tarjetas
- **IonInput**: Inputs de formulario
- **IonIcon**: Iconos (ionicons)
- **IonItem**: Items de lista
- **IonList**: Listas
- **IonBadge**: Insignias
- **IonAvatar**: Avatares de usuario

### Routing:

El routing ahora se maneja con `react-router-dom` y `IonReactRouter`:

```tsx
<IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance/:courseId" element={<AttendancePage />} />
      </Routes>
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
```

## Credenciales de prueba

- **Email**: `teacher@school.edu`
- **Contraseña**: `password`

## Próximos pasos

1. **Instalar Capacitor** (para compilar a iOS/Android):
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   npx cap init
   ```

2. **Construir la aplicación native**:
   ```bash
   npm run build
   npx cap add ios
   npx cap add android
   npx cap open ios
   npx cap open android
   ```

3. **Configurar PWA** (Progressive Web App):
   - Ya está parcialmente configurada con `@ionic/pwa-elements`
   - Se recomienda agregar un manifest.json

## Notas importantes

- Los estilos Ionic se cargan automáticamente en `index.tsx`
- Los iconos provienen de `ionicons` y se importan como componentes
- El tema de colores está definido en `index.css` con variables CSS de Ionic
- La aplicación es totalmente responsive y mobile-first

## Troubleshooting

Si tienes errores de módulos no encontrados:

```bash
npm install
npm run dev
```

Si los estilos no se cargan correctamente, asegúrate de que en `index.tsx` estén todos los imports de CSS de Ionic.

## Recursos

- [Documentación de Ionic React](https://ionicframework.com/docs/react)
- [Ionicons](https://ionicons.com/)
- [React Router](https://reactrouter.com/)
- [Capacitor Documentation](https://capacitorjs.com/)
