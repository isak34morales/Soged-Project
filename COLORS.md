# Esquema de Colores - Soged Project

## Colores Principales

### 🟢 Verde Principal (#28A745)
- **Uso**: Color principal del logo y elementos destacados
- **Variable CSS**: `--primary-color`
- **Aplicación**: Botones principales, enlaces activos, elementos de navegación

### 🟠 Naranja (#FF6B35)
- **Uso**: Color secundario para elementos de acción
- **Variable CSS**: `--secondary-color`
- **Aplicación**: Botones secundarios, elementos de alerta, destacados

### 🟡 Amarillo (#FFD600)
- **Uso**: Color de acento para elementos especiales
- **Variable CSS**: `--accent-color`
- **Aplicación**: Badges, iconos especiales, elementos decorativos

### 🔵 Azul Celeste (#00A3E0)
- **Uso**: Color informativo y de enlaces
- **Variable CSS**: `--info-color`
- **Aplicación**: Enlaces, información, elementos de ayuda

## Gradientes

### Gradiente Principal
```css
--gradient-primary: linear-gradient(135deg, #28A745 0%, #20C997 100%);
```

### Gradiente Secundario
```css
--gradient-secondary: linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%);
```

### Gradiente de Acento
```css
--gradient-accent: linear-gradient(135deg, #FFD600 0%, #FFA726 100%);
```

### Gradiente Informativo
```css
--gradient-info: linear-gradient(135deg, #00A3E0 0%, #4FC3F7 100%);
```

## Clases de Utilidad

### Colores de Texto
- `.text-primary` - Verde principal
- `.text-secondary` - Naranja
- `.text-accent` - Amarillo
- `.text-info` - Azul celeste
- `.text-success` - Verde éxito
- `.text-warning` - Naranja advertencia
- `.text-danger` - Rojo

### Fondos de Color
- `.bg-primary` - Fondo verde principal
- `.bg-secondary` - Fondo naranja
- `.bg-accent` - Fondo amarillo
- `.bg-info` - Fondo azul celeste
- `.bg-success` - Fondo verde éxito
- `.bg-warning` - Fondo naranja advertencia
- `.bg-danger` - Fondo rojo

### Gradientes
- `.gradient-primary` - Gradiente verde
- `.gradient-secondary` - Gradiente naranja
- `.gradient-accent` - Gradiente amarillo
- `.gradient-info` - Gradiente azul celeste
- `.gradient-success` - Gradiente verde éxito
- `.gradient-warning` - Gradiente naranja advertencia

### Colores Específicos del Logo
- `.text-logo-green` - Verde del logo
- `.text-logo-orange` - Naranja del logo
- `.text-logo-yellow` - Amarillo del logo
- `.text-logo-blue` - Azul del logo
- `.bg-logo-green` - Fondo verde del logo
- `.bg-logo-orange` - Fondo naranja del logo
- `.bg-logo-yellow` - Fondo amarillo del logo
- `.bg-logo-blue` - Fondo azul del logo

## Modo Oscuro

Todos los colores principales se mantienen en modo oscuro, solo cambian los fondos y textos para adaptarse al tema oscuro.

## Uso en Componentes

### Header
- Logo: Verde principal
- Navegación activa: Verde principal
- Botones: Gradiente verde

### Footer
- Enlaces: Verde principal
- Iconos sociales: Verde principal

### Páginas
- Títulos principales: Verde principal
- Botones de acción: Verde principal
- Elementos destacados: Naranja o amarillo según contexto

## Consistencia

Este esquema de colores asegura:
- ✅ Consistencia visual en todo el sitio
- ✅ Accesibilidad y contraste adecuado
- ✅ Identidad de marca clara
- ✅ Fácil mantenimiento con variables CSS
- ✅ Adaptación automática a modo oscuro 