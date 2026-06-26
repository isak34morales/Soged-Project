# Componentes de Cursos - Soged

Este directorio contiene los componentes reutilizables para las páginas de cursos de la plataforma Soged.

## 📁 Estructura

```
components/
├── course-header.js      # Componente header para páginas de cursos
├── course-footer.js      # Componente footer para páginas de cursos
└── README.md            # Esta documentación
```

## 🎯 Componentes Disponibles

### 1. Course Header (`course-header.js`)

Componente de encabezado reutilizable para todas las páginas de cursos.

#### Características:
- ✅ Información del curso (nombre, descripción, icono)
- ✅ Estadísticas dinámicas (streak, nivel, XP)
- ✅ Botón de regreso al dashboard
- ✅ Dropdown de usuario con navegación
- ✅ Diseño responsive
- ✅ Estilos encapsulados con Shadow DOM

#### Uso:

```html
<!-- Header Component -->
<course-header 
    course-name="Ngäbe"
    course-description="Lengua indígena de Panamá"
    course-icon="fas fa-leaf"
    streak="7"
    level="3"
    xp="750">
</course-header>

<!-- Scripts -->
<script src="components/course-header.js"></script>
```

#### Atributos:
- `course-name`: Nombre del curso
- `course-description`: Descripción del curso
- `course-icon`: Clase CSS del icono (Font Awesome)
- `streak`: Días de racha de aprendizaje
- `level`: Nivel actual del usuario
- `xp`: Puntos de experiencia

#### Métodos Públicos:
```javascript
// Actualizar estadísticas
header.updateStats(streak, level, xp);

// Actualizar información del curso
header.updateCourseInfo(name, description, icon);
```

### 2. Course Footer (`course-footer.js`)

Componente de pie de página reutilizable para todas las páginas de cursos.

#### Características:
- ✅ Información de la plataforma Soged
- ✅ Enlaces rápidos a páginas principales
- ✅ Navegación entre idiomas con estado activo
- ✅ Enlaces de redes sociales
- ✅ Diseño responsive
- ✅ Estilos encapsulados con Shadow DOM

#### Uso:

```html
<!-- Footer Component -->
<course-footer current-course="ngabe"></course-footer>

<!-- Scripts -->
<script src="components/course-footer.js"></script>
```

#### Atributos:
- `current-course`: ID del curso actual (ngabe, embera, kuna, naso)

#### Métodos Públicos:
```javascript
// Cambiar curso activo
footer.setCurrentCourse('embera');

// Actualizar enlaces de redes sociales
footer.updateSocialLinks(['facebook', 'twitter', 'instagram', 'youtube']);
```

## 🎨 Estilos y Diseño

### Características de Diseño:
- **Glassmorphism**: Efectos de vidrio esmerilado
- **Gradientes**: Colores vibrantes y modernos
- **Animaciones**: Transiciones suaves y efectos hover
- **Responsive**: Adaptable a todos los dispositivos
- **Consistencia**: Mismo estilo que el dashboard

### Paleta de Colores:
- **Primario**: `#4A90E2` (Azul)
- **Secundario**: `#7B68EE` (Púrpura)
- **Acentos**: Gradientes personalizados por curso
- **Texto**: `#2c3e50` (Gris oscuro)
- **Fondo**: `rgba(255, 255, 255, 0.95)` (Blanco translúcido)

## 🔧 Implementación en Páginas

### Página de Curso Típica:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso Ngäbe - Soged</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/course.css">
</head>
<body>
    <!-- Header Component -->
    <course-header 
        course-name="Ngäbe"
        course-description="Lengua indígena de Panamá"
        course-icon="fas fa-leaf"
        streak="7"
        level="3"
        xp="750">
    </course-header>

    <!-- Contenido del curso -->
    <main>
        <!-- Tu contenido aquí -->
    </main>

    <!-- Footer Component -->
    <course-footer current-course="ngabe"></course-footer>

    <!-- Scripts -->
    <script src="js/course.js"></script>
    <script src="components/course-header.js"></script>
    <script src="components/course-footer.js"></script>
</body>
</html>
```

## 🧪 Testing

### Página de Prueba:
- **Archivo**: `test-components.html`
- **Funcionalidades**: Prueba interactiva de todos los componentes
- **Métodos**: Botones para actualizar stats, cambiar cursos, etc.

### Comandos de Prueba:
```javascript
// Actualizar estadísticas del header
updateHeaderStats();

// Cambiar información del curso
updateCourseInfo();

// Cambiar curso activo en footer
updateFooterCourse();
```

## 📱 Responsive Design

### Breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

### Adaptaciones:
- Header: Layout vertical en móvil
- Footer: Grid de una columna en móvil
- Estadísticas: Apiladas en pantallas pequeñas
- Navegación: Optimizada para touch

## 🔄 Mantenimiento

### Actualizaciones:
1. Modificar el componente JavaScript
2. Los cambios se aplican automáticamente a todas las páginas
3. No es necesario actualizar cada página individualmente

### Agregar Nuevos Cursos:
1. Actualizar el array de cursos en el footer
2. Agregar el nuevo curso al dashboard
3. Crear la página del curso usando los componentes

## 🚀 Ventajas

### Para Desarrolladores:
- ✅ **Reutilización**: Un solo componente para todas las páginas
- ✅ **Consistencia**: Mismo diseño y comportamiento
- ✅ **Mantenimiento**: Cambios centralizados
- ✅ **Escalabilidad**: Fácil agregar nuevos cursos

### Para Usuarios:
- ✅ **Experiencia consistente**: Navegación familiar
- ✅ **Funcionalidades completas**: Todas las opciones del dashboard
- ✅ **Rendimiento**: Componentes optimizados
- ✅ **Accesibilidad**: Diseño inclusivo

## 📋 Checklist de Implementación

Para agregar un nuevo curso:

- [ ] Crear página HTML del curso
- [ ] Incluir componentes header y footer
- [ ] Configurar atributos específicos del curso
- [ ] Agregar enlaces en el dashboard
- [ ] Actualizar navegación del footer
- [ ] Probar en diferentes dispositivos
- [ ] Verificar funcionalidades del header/footer

## 🎯 Próximas Mejoras

- [ ] Agregar animaciones más avanzadas
- [ ] Implementar modo oscuro
- [ ] Agregar más opciones de personalización
- [ ] Optimizar para mejor rendimiento
- [ ] Agregar soporte para más idiomas 