# MFE Calendario - Brief

## Información General

| Campo | Valor |
|-------|-------|
| **Nombre** | mfe-calendar |
| **Puerto** | 3001 |
| **Estrategia** | Module Federation |
| **Responsable** | Ingeniero 1 |

---

## Objetivo

Crear un widget de calendario que muestre el mes actual en formato grid, permita navegación entre meses y selección de días. El widget debe ser independiente y comunicarse con otros microfrontends via eventos.

---

## Funcionalidad

- Mostrar mes actual en grid (7 columnas x 6 filas)
- Botones para navegar al mes anterior/siguiente
- Highlight del día actual
- Selección de día (click)
- Emitir evento cuando se selecciona un día

---

## Componentes UI Kit a Usar

- `Button` - navegación entre meses
- `Badge` - indicador de día actual o seleccionado
- `Divider` - separación visual

---

## Evento a Emitir

```typescript
// Cuando el usuario selecciona un día
window.dispatchEvent(new CustomEvent('calendar:date-selected', {
  detail: { date: '2026-01-30' }  // formato ISO
}));
```

---

## Configuración Module Federation

```typescript
// vite.config.ts
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfeCalendar',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.tsx'
      },
      shared: ['react', 'react-dom', 'siesa-ui-kit']
    })
  ],
  build: {
    target: 'esnext',
    minify: false
  },
  server: {
    port: 3001,
    cors: true
  }
});
```

---

## Estructura de Archivos

```
mfe-calendar/
├── src/
│   ├── Widget.tsx        # Componente principal exportado
│   ├── components/
│   │   ├── CalendarGrid.tsx
│   │   └── CalendarHeader.tsx
│   ├── hooks/
│   │   └── useCalendar.ts
│   └── main.tsx          # Para desarrollo standalone
├── vite.config.ts
└── package.json
```

---

## Criterios de Aceptación

- [ ] El calendario muestra correctamente el mes actual
- [ ] La navegación entre meses funciona
- [ ] El día actual está visualmente destacado
- [ ] Al hacer click en un día, se emite el evento `calendar:date-selected`
- [ ] El widget corre standalone en `localhost:3001`
- [ ] El widget se expone correctamente via Module Federation
