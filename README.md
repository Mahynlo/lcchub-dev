# LCCHub-Frontend
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/enriquegiottonini/lcchub-dev/blob/main/README-EN.MD)

Como parte de un proyecto de Servicio Social en la unidad de Ciencias de la Computación (LCC) de la Universidad de Sonora, se propuso desarrollar un portal web innovador. El objetivo principal era proporcionar a los estudiantes de LCC información relevante del programa y
un seguimiento personalizado de su trayectoria académica.

## Funcionalidades

- **Plataforma web dinámica**: La plataforma proporciona un centro de información relevante para los estudiantes de LCC, con contenido actualizable a través de un Sistema de Gestión de Contenido (CMS).
- **Sección de eventos**: Ofrece detalles sobre eventos próximos y pasados, incluyendo un calendario y una clasificación de eventos oficiales y comunitarios.
- **'SoyLCC'**: Una galería de videos de egresados que comparten sus experiencias y logros después de graduarse, inspirando a los estudiantes actuales.
- **Bolsa de Proyectos**: Un espacio dedicado a compartir oportunidades de trabajo, prácticas y otros eventos relevantes para la experiencia profesional de los estudiantes.
- **Portal de alumnos**: Integrado con Azure AD, el portal ofrece a los estudiantes acceso seguro a su información académica, incluyendo su progreso, materias aprobadas, créditos acumulados y más (por definir).
- **Mapa interactivo de progreso académico**: Esta herramienta visualiza la seriación de las materias, mostrando las aprobadas, reprobadas e inscritas nuevamente, ayudando a los estudiantes a planificar su trayectoria académica.

## Requisitos
- `node v22.1.0`
- `npm 10.7.0`
- Credenciales de Firebase para una base de datos con Firestore con tablas para Estudiantes, Materias, y Mapas Curriculares definidos en [`src/types.ts`](https://github.com/enriquegiottonini/lcchub-dev/blob/main/src/lib/types.ts)
- Servidor web en `http://localhost:1337` con GET endpoints para Eventos, Videos de Soy LCC, y Oportunidades de Proyectos como está definido en [`src/types.ts`](https://github.com/enriquegiottonini/lcchub-dev/blob/main/src/lib/types.ts)
- Credenciales de AZURE AD de una SPA para dar acceso a usuarios de tu organización
- Un archivo `.env` con los siguientes datos:
```.env
NEXT_PUBLIC_AZURE_CLIENT_ID=xxxx-xx-x
NEXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/xxxx-xx-x
NEXT_PUBLIC_AZURE_REDIRECT_URI=http://localhost:62213/ or https://your-web-domain/dashboard/auth
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxxx-xx-x
```

## Uso
`npm run dev` para desarrollo local
`npm run build` para construír la versión optimizada de producción
`npm run start` correr versión de producción

