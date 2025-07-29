# Sistema de Tipografía - Soged Project

## Descripción General

Este documento describe el sistema de tipografía centralizado implementado en el proyecto Soged. Todas las variables de tipografía están definidas en `css/variables.css` para mantener consistencia en todo el sitio web.

## Variables de Tipografía

### Familias de Fuente

```css
--font-primary: 'Fredoka', sans-serif;     /* Para títulos principales */
--font-secondary: 'Nunito', sans-serif;    /* Para subtítulos y texto general */
--font-body: 'Quicksand', sans-serif;      /* Para párrafos y texto del cuerpo */
```

### Tamaños de Fuente para Títulos

```css
--font-size-hero-title: 3.5rem;      /* Título principal del banner */
--font-size-section-title: 3rem;      /* Títulos de sección */
--font-size-h1: 3rem;
--font-size-h2: 2.5rem;
--font-size-h3: 2rem;
--font-size-h4: 1.75rem;
--font-size-h5: 1.5rem;
--font-size-h6: 1.25rem;
```

### Tamaños de Fuente para Texto

```css
--font-size-large: 1.3rem;    /* Descripción del hero */
--font-size-medium: 1.1rem;   /* Texto de botones y elementos importantes */
--font-size-normal: 1rem;     /* Texto normal de párrafos */
--font-size-small: 0.9rem;    /* Texto pequeño */
--font-size-xs: 0.8rem;       /* Texto muy pequeño */
```

### Pesos de Fuente

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Altura de Línea

```css
--line-height-tight: 1.2;
--line-height-normal: 1.4;
--line-height-relaxed: 1.6;
--line-height-loose: 1.8;
```

### Espaciado de Letras

```css
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

## Clases de Utilidad

### Familias de Fuente
```css
.font-primary { font-family: var(--font-primary) !important; }
.font-secondary { font-family: var(--font-secondary) !important; }
.font-body { font-family: var(--font-body) !important; }
```

### Tamaños de Fuente
```css
.text-hero-title { font-size: var(--font-size-hero-title) !important; }
.text-section-title { font-size: var(--font-size-section-title) !important; }
.text-h1 { font-size: var(--font-size-h1) !important; }
.text-large { font-size: var(--font-size-large) !important; }
.text-medium { font-size: var(--font-size-medium) !important; }
.text-normal { font-size: var(--font-size-normal) !important; }
.text-small { font-size: var(--font-size-small) !important; }
.text-xs { font-size: var(--font-size-xs) !important; }
```

### Pesos de Fuente
```css
.font-light { font-weight: var(--font-weight-light) !important; }
.font-normal { font-weight: var(--font-weight-normal) !important; }
.font-medium { font-weight: var(--font-weight-medium) !important; }
.font-semibold { font-weight: var(--font-weight-semibold) !important; }
.font-bold { font-weight: var(--font-weight-bold) !important; }
.font-extrabold { font-weight: var(--font-weight-extrabold) !important; }
```

### Altura de Línea
```css
.leading-tight { line-height: var(--line-height-tight) !important; }
.leading-normal { line-height: var(--line-height-normal) !important; }
.leading-relaxed { line-height: var(--line-height-relaxed) !important; }
.leading-loose { line-height: var(--line-height-loose) !important; }
```

### Espaciado de Letras
```css
.tracking-tight { letter-spacing: var(--letter-spacing-tight) !important; }
.tracking-normal { letter-spacing: var(--letter-spacing-normal) !important; }
.tracking-wide { letter-spacing: var(--letter-spacing-wide) !important; }
.tracking-wider { letter-spacing: var(--letter-spacing-wider) !important; }
.tracking-widest { letter-spacing: var(--letter-spacing-widest) !important; }
```

## Combinaciones Predefinidas

### Estilos para Elementos Comunes

```css
.hero-title-style {
    font-family: var(--font-primary);
    font-size: var(--font-size-hero-title);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-wide);
}

.section-title-style {
    font-family: var(--font-primary);
    font-size: var(--font-size-section-title);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-wide);
}

.body-text-style {
    font-family: var(--font-body);
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-relaxed);
    letter-spacing: var(--letter-spacing-normal);
}

.button-text-style {
    font-family: var(--font-secondary);
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-normal);
    letter-spacing: var(--letter-spacing-normal);
}
```

## Uso en el Proyecto

### Ejemplos de Implementación

1. **Títulos de Sección**: Usar `var(--font-size-section-title)` para títulos como "Why Choose Soged?"
2. **Título Principal**: Usar `var(--font-size-hero-title)` para el título del banner
3. **Descripciones**: Usar `var(--font-size-large)` para descripciones importantes
4. **Texto Normal**: Usar `var(--font-size-normal)` para párrafos regulares
5. **Botones**: Usar `var(--font-size-medium)` para texto de botones

### Ventajas del Sistema

- **Consistencia**: Todos los tamaños de fuente están centralizados
- **Mantenibilidad**: Cambios globales desde un solo archivo
- **Escalabilidad**: Fácil agregar nuevos tamaños o modificar existentes
- **Responsive**: Las variables se adaptan automáticamente a diferentes breakpoints
- **Modo Oscuro**: Las variables funcionan tanto en modo claro como oscuro

## Responsive Design

Las variables de tipografía se adaptan automáticamente a diferentes tamaños de pantalla:

- **Desktop (≥992px)**: Tamaños completos
- **Tablet (768px-991px)**: Tamaños reducidos proporcionalmente
- **Mobile (≤576px)**: Tamaños optimizados para móviles

## Modo Oscuro

Todas las variables de tipografía están duplicadas en el bloque `[data-theme="dark"]` para mantener consistencia en el modo oscuro. 