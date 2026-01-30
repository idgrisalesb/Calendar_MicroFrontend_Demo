# Vite Config - Estándar Microfrontends

Guía de configuración estándar para exponer e importar microfrontends usando Module Federation y Single-SPA.

---

## Dependencias Requeridas

```bash
# Module Federation
npm install @module-federation/vite --save-dev

# Single-SPA (si aplica)
npm install vite-plugin-single-spa --save-dev

# TanStack Router
npm install @tanstack/react-router

# Común
npm install @vitejs/plugin-react --save-dev
```

---

## 1. Module Federation

### 1.1 Exponer un MFE (Remote)

Ejemplo: Módulo de **Finanzas** (`mfe-finance`)

```typescript
// modules/finance/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'finance',                     // Nombre único del MFE
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx'           // Componente principal con rutas
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'siesa-ui-kit': { singleton: true }
      }
    })
  ],
  server: {
    port: 3001,
    strictPort: true,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 3001,
    strictPort: true,
    cors: true
  },
  base: '/finance/'                        // ⚠️ IMPORTANTE: Prefijo de rutas
});
```

### 1.2 Importar MFE en App Shell (Host)

```typescript
// app-shell/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'appShell',
      remotes: {
        finance: {
          type: 'module',
          name: 'finance',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'finance'
        },
        inventory: {
          type: 'module',
          name: 'inventory',
          entry: 'http://localhost:3002/remoteEntry.js',
          entryGlobalName: 'inventory'
        },
        hr: {
          type: 'module',
          name: 'hr',
          entry: 'http://localhost:3003/remoteEntry.js',
          entryGlobalName: 'hr'
        }
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'siesa-ui-kit': { singleton: true }
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false
  },
  server: {
    port: 3000
  }
});
```

---

## 2. Routing con TanStack Router

### 2.1 Router del MFE (Remote)

> ⚠️ **IMPORTANTE:** Todas las rutas del MFE deben tener un prefijo único que coincida con `base` en vite.config.ts

```typescript
// modules/finance/src/router.tsx
import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect
} from '@tanstack/react-router';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './routes/dashboard';
import AccountsIndex from './routes/accounts.index';
import AccountDetail from './routes/accounts.$id';
import JournalEntriesPage from './routes/journal-entries';

// Root route con layout
const rootRoute = createRootRoute({
  component: MainLayout
});

// Ruta índice - redirige al dashboard
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/finance/dashboard' });    // Prefijo: /finance
  }
});

// Ruta índice del módulo finance
const financeIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance',                                   // Prefijo: /finance
  beforeLoad: () => {
    throw redirect({ to: '/finance/dashboard' });
  }
});

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/dashboard',                         // Prefijo: /finance
  component: Dashboard
});

// Cuentas - listado
const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/accounts',                          // Prefijo: /finance
  component: AccountsIndex
});

// Cuentas - detalle
const accountDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/accounts/$id',                      // Prefijo: /finance
  component: AccountDetail
});

// Asientos contables
const journalEntriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/journal-entries',                   // Prefijo: /finance
  component: JournalEntriesPage
});

// Crear router
const routeTree = rootRoute.addChildren([
  indexRoute,
  financeIndexRoute,
  dashboardRoute,
  accountsRoute,
  accountDetailRoute,
  journalEntriesRoute
]);

export const router = createRouter({ routeTree });

// Tipos para TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

### 2.2 App del MFE

```typescript
// modules/finance/src/App.tsx
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

export default function App() {
  return <RouterProvider router={router} />;
}
```

### 2.3 Consumir en App Shell

```typescript
// app-shell/src/App.tsx
import { lazy, Suspense } from 'react';

// Importar módulos remotos
const FinanceApp = lazy(() => import('finance/App'));
const InventoryApp = lazy(() => import('inventory/App'));
const HRApp = lazy(() => import('hr/App'));

export default function App() {
  const { t } = useTranslation('dashboard');
  const currentModule = getCurrentModule(); // Lógica para determinar módulo actual

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <Suspense fallback={<div>Cargando módulo...</div>}>
        {currentModule === 'finance' && <FinanceApp />}
        {currentModule === 'inventory' && <InventoryApp />}
        {currentModule === 'hr' && <HRApp />}
      </Suspense>
    </div>
  );
}
```

---

## 3. Convención de Prefijos de Rutas

> ⚠️ **REGLA CRÍTICA:** El prefijo de rutas (`base` en vite.config.ts) debe coincidir con el path en el router.

| Módulo | Puerto | Base (vite.config) | Prefijo Rutas |
|--------|--------|---------------------|---------------|
| app-shell | 3000 | `/` | `/` |
| finance | 3001 | `/finance/` | `/finance/*` |
| inventory | 3002 | `/inventory/` | `/inventory/*` |
| hr | 3003 | `/hr/` | `/hr/*` |

### Ejemplo de rutas por módulo

```
# Finance (localhost:3001)
/finance/dashboard
/finance/accounts
/finance/accounts/:id
/finance/journal-entries

# Inventory (localhost:3002)
/inventory/dashboard
/inventory/products
/inventory/products/:id
/inventory/warehouses

# HR (localhost:3003)
/hr/dashboard
/hr/employees
/hr/employees/:id
/hr/payroll
```

---

## 4. Single-SPA

### 4.1 Exponer un MFE con Single-SPA

```typescript
// modules/inventory/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      serverPort: 3002,
      spaEntryPoints: 'src/spa.tsx',
      cssStrategy: 'singleMife',
      projectId: 'inventory-module'
    }),
    federation({
      name: 'inventory',
      remotes: {
        // Si necesita consumir otros MFEs
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
      }
    })
  ],
  server: {
    port: 3002,
    strictPort: true,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 3002,
    strictPort: true,
    cors: true
  },
  base: '/inventory/'
});
```

### 4.2 Lifecycle Exports

```typescript
// modules/inventory/src/spa.tsx
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';

const lc = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err) {
    return <div>Error en módulo Inventory: {err.message}</div>;
  }
});

export const bootstrap = lc.bootstrap;
export const mount = lc.mount;
export const unmount = lc.unmount;
```

---

## 5. Estructura de Archivos por Módulo
 
Definida ya en los estandarés y patrones de arquitectura. Consultar las siguientes referencias:
1. _bmad\bmm\workflows\3-solutioning\create-architecture\data\company-standards\architecture-patterns.md
2. _bmad\bmm\workflows\3-solutioning\create-architecture\data\company-standards\frontend-standards.md

---

## 6. Tipos para Module Federation

```typescript
// app-shell/src/types/remotes.d.ts

declare module 'finance/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'inventory/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'hr/App' {
  const App: React.ComponentType;
  export default App;
}
```

---

## 7. Shared Dependencies

```typescript
shared: {
  // SIEMPRE singleton para React
  react: { singleton: true, requiredVersion: '^18.3.1' },
  'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  
  // UI Kit compartido
  'siesa-ui-kit': { singleton: true },
  
  // Router y Query
  '@tanstack/react-router': { singleton: true },
  '@tanstack/react-query': { singleton: true },
  
  // State management
  'zustand': { singleton: true },
  
  // i18n
  'react-i18next': { singleton: true },
  'i18next': { singleton: true }
}
```

---

## 8. Convención de Puertos

| Módulo | Puerto | Descripción |
|--------|--------|-------------|
| app-shell | 3000 | Host principal |
| finance | 3001 | Módulo Finanzas |
| inventory | 3002 | Módulo Inventario |
| hr | 3003 | Módulo RRHH |
| crm | 3004 | Módulo CRM |
| pos | 3005 | Módulo POS |

---

## 9. Checklist de Configuración

### Remote (Módulo)
- [ ] `name` único en federation config
- [ ] `filename: 'remoteEntry.js'`
- [ ] `exposes` con `'./App': './src/App.tsx'`
- [ ] `base` configurado con prefijo (ej: `/finance/`)
- [ ] Todas las rutas usan el prefijo
- [ ] `shared` con React y dependencias como singleton
- [ ] Puerto único configurado
- [ ] `cors: true` en server y preview
- [ ] `modulePreload: false` en build
- [ ] `cssCodeSplit: false` en build

### Host (App Shell)
- [ ] `remotes` con URLs de cada MFE
- [ ] Tipos declarados en `remotes.d.ts`
- [ ] Lógica para cargar módulo según ruta
- [ ] Suspense con fallback para cada módulo

---

## 10. Ejemplo Completo: Router de Inventory

```typescript
// modules/inventory/src/router.tsx
import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect
} from '@tanstack/react-router';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './routes/dashboard';
import ProductsIndex from './routes/products.index';
import ProductDetail from './routes/products.$id';
import WarehousesPage from './routes/warehouses';

const rootRoute = createRootRoute({
  component: MainLayout
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/inventory/dashboard' });
  }
});

const inventoryIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory',
  beforeLoad: () => {
    throw redirect({ to: '/inventory/dashboard' });
  }
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory/dashboard',
  component: Dashboard
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory/products',
  component: ProductsIndex
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory/products/$id',
  component: ProductDetail
});

const warehousesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory/warehouses',
  component: WarehousesPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  inventoryIndexRoute,
  dashboardRoute,
  productsRoute,
  productDetailRoute,
  warehousesRoute
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```
