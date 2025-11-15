# ❓ Preguntas Frecuentes - Migración a Ionic

## General

### ¿Por qué migrar a Ionic?

**Ventajas principales:**
- 📱 Crea apps iOS, Android y Web con el mismo código
- 🎨 Componentes modernos y consistentes
- 🚀 Capacitor permite acceso a APIs nativas
- 📦 PWA ready (Progressive Web App)
- 🎭 Tema visual pulido y profesional
- 📱 Mobile-first design
- 🔋 Optimización de batería para apps nativas

### ¿Puedo volver a la versión anterior?

Sí, usando Git:
```bash
git checkout HEAD~1
# O restaura desde backup
```

---

## Instalación y Setup

### ¿Qué debo instalar?

Solo ejecuta:
```bash
npm install
```

Esto instala:
- Ionic React (componentes)
- Ionic React Router (navegación)
- Ionicons (iconos)
- React Router DOM (routing)
- PWA elements (soporte PWA)

### ¿Por qué usa `--legacy-peer-deps`?

Porque:
- Ionic pide `react-router-dom@^5`
- Tu proyecto usa `react@19`
- `--legacy-peer-deps` permite la compatibilidad

Es seguro, Ionic v8 funciona bien con React 19.

### ¿Necesito Node.js específico?

Recomendado: Node.js 18+
```bash
node --version
# Debe ser v18.x o superior
```

---

## Desarrollo

### ¿Cómo inicio el servidor?

```bash
npm run dev
```

Luego abre: http://localhost:3000

### ¿Los cambios se reflejan automáticamente?

Sí, Vite tiene Hot Module Replacement (HMR).

Si no, actualiza el navegador (F5).

### ¿Dónde veo los logs?

En la consola del navegador (F12 → Console).

También en la terminal donde ejecutas `npm run dev`.

### ¿Cómo cambio el puerto (3000)?

```bash
npm run dev -- --port 5173
```

---

## Componentes y Styling

### ¿Cómo agrego un nuevo componente Ionic?

Ejemplo - Agregar un loading spinner:

```tsx
import { IonSpinner } from '@ionic/react';

export default function MyComponent() {
  return <IonSpinner name="circles" color="primary" />;
}
```

### ¿Cómo personalizo los colores?

En `index.css`, modifica las variables CSS:

```css
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc9c3;
  /* ... más colores */
}
```

### ¿Puedo usar Tailwind CSS con Ionic?

No es recomendado (conflictos de estilos).

Usa CSS puro o CSS Modules:
```tsx
import styles from './MyComponent.module.css';
<div className={styles.container}>...</div>
```

### ¿Cómo agrego estilos globales?

Edita `index.css` (se importa en `index.tsx`).

Para estilos específicos, crea archivos `.css` por componente.

---

## Navegación y Routing

### ¿Cómo navego entre páginas?

```tsx
import { useHistory } from 'react-router-dom';

export default function MyPage() {
  const history = useHistory();
  
  const navigate = () => {
    history.push('/another-page');
  };
  
  return <button onClick={navigate}>Ir</button>;
}
```

### ¿Cómo paso parámetros en la URL?

```tsx
// Navegar
history.push(`/attendance/${courseId}`);

// Recibir
import { useParams } from 'react-router-dom';

export default function AttendancePage() {
  const { courseId } = useParams<{ courseId: string }>();
  // courseId está disponible aquí
}
```

### ¿Cómo hago el botón "atrás" funcionar?

```tsx
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

export default function MyPage() {
  const history = useHistory();
  
  return (
    <IonButton onClick={() => history.goBack()}>
      Atrás
    </IonButton>
  );
}
```

---

## Compilación y Deployment

### ¿Cómo compilo para producción?

```bash
npm run build
```

Genera carpeta `dist/` lista para publicar.

### ¿Dónde puedo publicar la app web?

Opciones:
- **Vercel:** `vercel deploy`
- **Netlify:** `netlify deploy`
- **Firebase:** `firebase deploy`
- **GitHub Pages:** Push a `gh-pages` branch
- **Tu servidor:** Sube contenido de `dist/`

### ¿Cómo creo la versión iOS?

```bash
npm run build
npx cap add ios
npx cap open ios
```

Se abre Xcode. Haz build ahí (⌘B) y ejecuta en simulador.

### ¿Cómo creo la versión Android?

```bash
npm run build
npx cap add android
npx cap open android
```

Se abre Android Studio. Haz build y ejecuta en emulador.

### ¿Qué es el archivo `dist/`?

Es tu app compilada lista para producción:
- `dist/index.html` - Archivo principal
- `dist/assets/` - JS y CSS minificados
- Puedes servir estos archivos en cualquier servidor web

---

## Problemas Comunes

### Error: "Cannot find module '@ionic/react'"

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### Los estilos Ionic no se cargan

**Verifica que en `index.tsx` estén los imports:**
```tsx
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
// ... más imports
```

### App se ve rota en mobile

**Asegúrate que `index.html` tenga:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Botones no responden

**Verifica que estés usando `IonButton` y no `<button>`:**
```tsx
// ❌ Incorrecto
<button onClick={handleClick}>Click</button>

// ✅ Correcto
<IonButton onClick={handleClick}>Click</IonButton>
```

### Rutas no funcionan

**Confirma la estructura:**
```tsx
<IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/" component={HomePage} />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
```

### Hot reload no funciona

**Reinicia el servidor:**
```bash
# Ctrl+C en terminal
npm run dev
```

---

## Performance

### ¿Cómo hago la app más rápida?

1. **Code splitting:**
   ```tsx
   const Page = lazy(() => import('./Page'));
   ```

2. **Lazy load imágenes:**
   ```tsx
   <img loading="lazy" src="..." />
   ```

3. **Memoizar componentes:**
   ```tsx
   export default memo(MyComponent);
   ```

4. **Usar `useMemo`:**
   ```tsx
   const data = useMemo(() => expensiveOperation(), [deps]);
   ```

### ¿Cuál es el tamaño de la app?

Después de `npm run build`:
- JS: ~232 KB (gzip: ~73 KB)
- CSS: ~45 KB (gzip: ~7 KB)
- Total: ~277 KB (antes de gzip)

---

## Seguridad

### ¿Es seguro guardar datos en localStorage?

No para datos sensibles. Mejor opción:
- Base de datos en backend
- Cookies seguras (HTTPOnly)
- Sesiones del servidor

### ¿Cómo protejo las rutas?

```tsx
function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
```

---

## Integración con APIs

### ¿Cómo llamo a una API?

```tsx
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Cargando...'}</div>;
}
```

### ¿Cómo uso Axios?

```bash
npm install axios
```

```tsx
import axios from 'axios';

const data = await axios.get('/api/data');
```

---

## Estado Global

### ¿Cómo manejo estado global?

Opciones:
1. **Context API** (recomendado para apps pequeñas)
2. **Redux** (para apps grandes)
3. **Zustand** (alternativa ligera)
4. **Recoil** (experimental)

---

## Capacitor (Acceso a APIs Nativas)

### ¿Cómo acceso a la cámara?

```bash
npm install @capacitor/camera
```

```tsx
import { Camera } from '@capacitor/camera';

const photo = await Camera.getPhoto({
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Uri,
});
```

### ¿Cómo leo archivos?

```bash
npm install @capacitor/filesystem
```

```tsx
import { Filesystem } from '@capacitor/filesystem';

const contents = await Filesystem.readFile({
  path: 'file.txt',
  directory: Directory.Documents,
  encoding: 'UTF8',
});
```

---

## Soporte

### ¿Dónde puedo obtener ayuda?

- 📖 [Docs Ionic](https://ionicframework.com/docs/react)
- 🐛 [Issues en GitHub](https://github.com/ionic-team/ionic-framework)
- 💬 [Ionic Community Forum](https://forum.ionicframework.com/)
- 🆘 [Stack Overflow](https://stackoverflow.com/questions/tagged/ionic)

### ¿Hay comunidad en español?

Sí:
- 🇪🇸 [Ionic España](https://forum.ionicframework.com/)
- 💬 Comunidades en Discord, Slack, etc.

---

**¿Pregunta no resuelta?** Consulta la documentación oficial de Ionic.
