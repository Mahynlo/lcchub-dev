# Arquitectura y Diseño Algorítmico del Mapa Curricular (LCC Map)

Este documento detalla el funcionamiento interno del módulo `lccmap`, diseñado para renderizar la malla curricular interactiva de la carrera. Se enfoca particularmente en la lógica matemática empleada para eludir los límites del enrutador de ReactFlow y lograr conexiones (edges) visualmente limpias, sin encimamientos, y que esquiven los nodos (tarjetas de materias) inteligentemente.

---

## 1. Arquitectura General y Archivos Clave

El módulo está estructurado en torno a la librería **ReactFlow**, pero fuertemente personalizado para cumplir requisitos visuales estrictos.

### Componentes Principales:
- `curriculum-flow.tsx`: Es el **Director (Core)** del mapa. Monta la instancia de `<ReactFlow />`, calcula las coordenadas de cada materia basándose en su semestre (columna) y su orden (fila), y enruta las conexiones.
- `smart-routing-edge.tsx`: El **Renderizador SVG**. Componente matemático extraído y dedicado exclusivamente a trazar las polilíneas suavizadas (Bézier curves) que conectan las tarjetas en rutas complejas, aliviando de carga al Core.
- `subject-node-flow.tsx`: El **Nodo Visual**. Representa una tarjeta de materia en el mapa. Esconde **24 puntos de conexión (Handles)** invisibles en sus 4 bordes (arriba, abajo, izquierda, derecha) para permitir que las flechas salgan y entren desde diferentes alturas sin agruparse en un solo punto central.
- `SubjectDialogContent.tsx` / `subject-card.tsx`: Componentes de UI responsables de mostrar la información detallada de una materia (modal flotante) y su estado interactivo.
- `electives-list.tsx`: El **Catálogo de Opciones**. Componente ubicado bajo el mapa que lista las materias optativas, selectivas o especializantes disponibles dinámicamente según el plan de estudios del alumno.
- `curriculum-map.tsx`: El **Contenedor Wrapper**. Proporciona el contexto global (`SubjectShowContext`) para que todos los componentes sepan qué materia está seleccionada actualmente y maneja el estado global de la visualización.

---

## 2. El Desafío del Enrutamiento (Edge Routing)

Por defecto, cuando ReactFlow conecta dos puntos (A → B), intenta usar el algoritmo `smoothstep` (líneas ortogonales) encontrando el camino más corto. 

**Problema Original:**
Dado que ReactFlow ignora la existencia física de los nodos intermedios, una flecha viajando del Semestre II al Semestre V cruzaba diagonalmente destruyendo visualmente el mapa y pasando por encima del texto de las tarjetas del Semestre III y IV. Además, 4 flechas saliendo de "Programación I" se fusionaban en una sola línea gruesa (efecto *Edge Bundling*).

---

## 3. La Solución: El Ecosistema "Smart Routing Edge"

Para solucionar esto, se creó un ecosistema compuesto por 3 componentes lógicos dentro de `curriculum-flow.tsx`:

### A. Los 24 Puertos (Handles) Dinámicos
En `subject-node-flow.tsx`, cada lado de la tarjeta tiene 3 emisores (`source`) y 3 receptores (`target`):
- Alto (`high` / `left`)
- Medio (`mid` / `mid`)
- Bajo (`low` / `right`)

### B. El Administrador de Carriles Paralelos (Lanes & Ports)
El script de `curriculum-flow.tsx` utiliza dos mapas en memoria: `usedPorts` y `usedCorridors`.
- Durante el ciclo de renderizado, si 3 materias requieren salir por el borde derecho de la misma tarjeta, la función `getPortVariant()` le asignará secuencialmente a la primera el puerto `mid`, a la segunda el puerto `high`, y a la tercera el `low`. **(Evita agrupamiento en el origen)**.
- Función `getCorridorOffset()`: Si dos flechas necesitan viajar horizontalmente a través del mismo espacio vacío entre semestres (el "pasillo"), este gestor les suma un **offset dinámico paralelo de 10px**: (+0px, -10px, +10px, -20px, +20px). **(Evita amontonamiento durante la trayectoria)**.

### C. El Motor Geométrico Analítico (`getOptimalHandles`)
Esta es la obra maestra del mapa. Antes de trazar una conexión, esta función calcula la distancia en filas (`distRow`) y columnas (`distCol`) del Origen al Destino dentro de la matriz virtual.

Basándose en esa distancia, elige una de las siguientes Estrategias de Navegación:

#### Estrategia 1: `default` (Adyacentes y Distancias Cortas)
- Se activa cuando las materias están relativamente cerca o en columnas continuas.
- Selecciona dinámicamente el `sourceHandle` (por ejemplo, salida derecha `s-right`) y el `targetHandle` (entrada izquierda `t-left`).
- Define un carril `corridorX` central exacto (`horizontalGap / 2`) con su respectivo Offset.
- **Renderizado:** Permite volver a usar el `getSmoothStepPath` nativo de ReactFlow, pero inyectándole nuestro `centerX` forzado para evitar que la curva tome el camino diagonal perezoso.

#### Estrategia 2: `bridge` y `bridge-lateral` (Saltos Largos Anti-Colisión)
- Se activa al detectar un salto temporal grande (`distCol > 1`, es decir, brincarse un semestre intermedio completo).
- Si usara una salida X (izquierda/derecha), atropellaría las tarjetas intermedias.
- El algoritmo fuerza a la flecha a **salir por el eje Y (Arriba o Abajo de la tarjeta)**.
- Traza una Bounding Box envolvente devolviendo unas coordenadas duras (`corridorX`, `corridorY`).
- **Renderizado:** Delega la construcción de la flecha al Dibujante Poligonal, esquivando a ReactFlow por completo.

### D. El Dibujante Poligonal SVG Animado (`smart-routing-edge.tsx`)
ReactFlow delega el dibujado de los *Bridges* a nuestro componente gráfico modular `SmartRoutingEdge`.
Este componente recibe las coordenadas crudas de salida, las coordenadas crudas de llegada, y la posición X/Y del pasillo seguro (corredor central).

Aplica la función matemática `getRoundedPolyline(waypoints, radius=16)`:
1. Recibe un arreglo de 5 puntos clave (Vértices) que componen el paso de la flecha por el pasillo vacío.
2. Itera usando geometría analítica de triángulos (`Math.sqrt()`, teorema de Pitágoras) para detectar en qué punto X/Y una línea recta se convierte en una esquina dura.
3. 16 pixeles antes de la colisión de la esquina, corta la línea recta (`SVG Path: L`) e inyecta dinámicamente una Curva Bézier Cuadrática (`SVG Path: Q`) generando un codo perfectamente suave.

---

## 4. Guía de Mantenimiento Rápido

Si necesitas modificar este código en el futuro:

- **Modificar Espaciado entre Tarjetas:**
  Busca `nodeWidth = 180`, `nodeHeight = 140`, `horizontalGap = 60`, y `verticalGap = 40` en `curriculum-flow.tsx`. Si el mapa se ve amontonado en pantallas nuevas, incrementa los gaps y el algoritmo de pasillos se ajustará automáticamente por el centro.

- **Flechas se vuelven a encimar (Corridors fallan):**
  Abre la función `getCorridorOffset()` en `curriculum-flow.tsx`. Verifica el valor de incremento (`const step = 10;`). Si las flechas parecen muy pegadas, súbelo a `15`. 

- **Una flecha no dobla correctamente o atraviesa un nodo vertical en misma columna (`distCol === 0`):**
  Busca el bloque `if (distCol === 0)` dentro de `getOptimalHandles()`. Revisa la matemática del `bridge-lateral`. El `corridorX` para esquivar la columna vertical usa el ancho del elemento `sourcePos.x + 180 + 30`. Si las tarjetas cambian de ancho, debes actualizar este `180`.

- **Se desajusta la posición física de los puertos (Handles):**
  En `subject-node-flow.tsx`, los estilos `top: '25%'`, `top: '50%'` determinan dónde nace la flecha físicamente en la UI. Si agregas más espacio al nodo de la tarjeta visualmente, estos porcentajes reaccionarán de forma asilada y responsiva.

---

## 5. Arquitectura de Datos y Caché (Firebase)

Dado que un plan de estudios completo puede solicitar la lectura simultánea de más de 40 a 60 fichas de materias desde Firestore, la capa de datos (`curriculumMap-by-key.ts` + `CurriculumContext.tsx`) implementa estrategias clave de optimización:

1. **Paralelismo Inteligente (`Promise.allSettled`)**:
   - En lugar de esperar recursivamente en un ciclo *Waterfall* (`for...await`), el algoritmo extrae todas las materias y dependencias faltantes y despacha **peticiones en bloque (batching)** simultáneamente. Esto disminuye dramáticamente el TTFB (Time To First Byte) de pintado de las tarjetas en ReactFlow.
2. **Sistema Anti-Ciclos Infinitos (`visited Set()`)**:
   - La red cursa de forma autónoma una Búsqueda en Anchura (BFS) para descargar requisitos de los requisitos. El `visited` bloquea que el sistema colapse la memoria RAM si alguna vez un administrador introduce un bucle sin fin de pre-requisitos en Firebase.
3. **Inyección Dinámica (Ej. Servicio Social)**:
   - Materias que no existen formalmente en las mallas reticulares strictas (como el *Servicio Social* ID `22118`) se inyectan localmente dentro del arreglo del plan justo al lado de variables como Prácticas Profesionales **antes de que se solicite el primer caché**, logrando que Firebase las reconozca junto con el lote original usando solo 1 petición master de Red.

---
*Este documento sirvió de base para cimentar la arquitectura sin colisiones del ReactFlow Dashboard local 2026, actualizada tras las refactorizaciones de eficiencia y modularidad.*
