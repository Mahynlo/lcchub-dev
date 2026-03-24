"use client";

import { useCallback, useEffect, useState, useContext, useRef } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowInstance,
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
} from "reactflow";
import "reactflow/dist/style.css";
import { Subject, SubjectShowContext } from "@/lib/types";
import SubjectNode from "./subject-node-flow";
import { getSubjectMinimapColor } from "@/lib/utils/subjectColors";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";
import { SmartRoutingEdge } from "./smart-routing-edge";

interface CurriculumFlowProps {
  semesters: string[];
  subjectCache: Map<string, Subject>;
}

const nodeTypes = {
  subjectNode: SubjectNode,
};

const edgeTypes = {
  smart: SmartRoutingEdge,
};

// Función para convertir números a romanos
function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

export default function CurriculumFlow({
  semesters,
  subjectCache,
}: CurriculumFlowProps) {
  const { showAll, showSubject, selectedSubject, filterOption } = useContext(SubjectShowContext)!;
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Detectar si es móvil para optimizaciones
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onInit = (instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  };

  // Hacer zoom al nodo seleccionado o resetear vista
  useEffect(() => {
    if (!reactFlowInstance.current) return;

    if (selectedSubject && filterOption === "search") {
      const node = nodes.find(n => n.id === selectedSubject);
      if (node) {
        // Esperar un poco para que los nodos se actualicen
        setTimeout(() => {
          reactFlowInstance.current?.setCenter(
            node.position.x + 80, // Centrar en el medio del nodo (160px/2)
            node.position.y + 60, // Centrar en el medio del nodo (120px/2)
            { zoom: 1.2, duration: 800 } // Zoom de 1.2 con animación de 800ms
          );
        }, 100);
      }
    } else if (!selectedSubject && filterOption === "all") {
      // Regresar a la vista completa cuando se limpia la búsqueda
      setTimeout(() => {
        reactFlowInstance.current?.fitView({ duration: 800, padding: 0.1 });
      }, 100);
    }
  }, [selectedSubject, nodes, filterOption]);

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Espaciado entre nodos ajustado al CSS real de las tarjetas
    const nodeWidth = 160;
    const nodeHeight = 120;
    const horizontalGap = 80; // (160 + 80 = 240px de tamaño de celda grid horizontal)
    const verticalGap = 60;   // (120 + 60 = 180px de tamaño de celda grid vertical)

    // Mapa para almacenar las posiciones de los nodos para cálculo de rutas de flechas
    const nodePositions = new Map<string, { x: number; y: number }>();

    // Crear nodos organizados por semestre
    semesters.forEach((semester, semesterIndex) => {
      const subjects = semester.split("-").filter(key => key.trim() !== "");
      const xPosition = semesterIndex * (nodeWidth + horizontalGap);

      // Agregar nodo de etiqueta de semestre
      newNodes.push({
        id: `semester-${semesterIndex}`,
        type: "default",
        position: { x: xPosition, y: -60 },
        data: {
          label: `Semestre ${toRoman(semesterIndex + 1)}`
        },
        draggable: false,
        selectable: false,
        style: {
          background: 'transparent',
          border: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#1f2937',
          padding: '4px 8px',
          pointerEvents: 'none',
        },
      });

      subjects.forEach((subjectKey, subjectIndex) => {
        let subject = subjectCache.get(subjectKey);

        if (!subject && subjectKey === "OPT") {
          subject = {
            subjectKey: "OPT",
            subjectName: "Optativa",
            branch: "Vocacional",
            requirements: "",
            releases: "",
            credits: "0",
            academicDivision: "",
            department: "",
            labHours: "0",
            theoryHours: "0",
            workshopHours: "0",
            tracklistSubject: [],
            abbr: "Optativa",
          };
        }

        if (!subject) return;

        const yPosition = subjectIndex * (nodeHeight + verticalGap);

        // Determinar opacidad basada en filtros
        const isVisible = showAll || showSubject.get(subjectKey);

        // Usar ID único para placeholders OPT
        const nodeId = subjectKey === "OPT"
          ? `OPT-${semesterIndex}-${subjectIndex}`
          : subjectKey;

        // Guardar posición para el cálculo de aristas
        nodePositions.set(nodeId, { x: xPosition, y: yPosition });

        newNodes.push({
          id: nodeId,
          type: "subjectNode",
          position: { x: xPosition, y: yPosition },
          data: {
            subject,
            subjectKey,
            subjectCache,
            isVisible,
          },
          draggable: false,
          style: {
            opacity: isVisible ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
          },
        });
      });
    });

    // Tracking de pasillos usados para evitar que las líneas se encimen
    const usedCorridors = new Map<string, number>();

    const getCorridorOffset = (baseId: string, maxLimit = 25) => {
      const count = usedCorridors.get(baseId) || 0;
      usedCorridors.set(baseId, count + 1);

      if (count === 0) return 0;
      const step = 8;
      const multiplier = Math.ceil(count / 2);
      const sign = count % 2 === 0 ? 1 : -1;
      const offset = step * multiplier * sign;
      // Clamp para evitar que un super-carril colisionado atraviese tarjetas vecinas
      return Math.max(-maxLimit, Math.min(maxLimit, offset));
    };

    // Tracking de puertos usados (Fan-Out) para que no todas salgan del mismo pixel
    const usedPorts = new Map<string, number>();

    const getFanOutOffset = (nodeId: string, side: string, type: 'source' | 'target') => {
      const key = `${nodeId}-${type}-${side}`;
      const count = usedPorts.get(key) || 0;
      usedPorts.set(key, count + 1);

      if (count === 0) return 0;
      const step = 15; // 15px de separación física entre nacimientos contiguos de línea
      const multiplier = Math.ceil(count / 2);
      const sign = count % 2 === 0 ? 1 : -1;
      return step * multiplier * sign;
    };

    // Función auxiliar estrátegica: decide la cara de salida y su puerto natural
    const getOptimalHandles = (sourceId: string, targetId: string) => {
      const sourcePos = nodePositions.get(sourceId);
      const targetPos = nodePositions.get(targetId);

      if (!sourcePos || !targetPos) {
        return { sourceHandle: "s-right", targetHandle: "t-left", strategy: "default", corridorX: 0, corridorY: 0, sOffset: 0, tOffset: 0 };
      }

      const distCol = Math.round((targetPos.x - sourcePos.x) / (nodeWidth + horizontalGap));
      const distRow = Math.round((targetPos.y - sourcePos.y) / (nodeHeight + verticalGap));

      let strategy = "default";
      let corridorX = 0;
      let corridorY = 0;
      let sSide: 'left' | 'right' | 'top' | 'bottom' = 'right';
      let tSide: 'left' | 'right' | 'top' | 'bottom' = 'left';

      const hGapHalf = horizontalGap / 2; // 40px base del centro
      const vGapHalf = verticalGap / 2;   // 30px base del centro

      // 1. MISMA COLUMNA (Conexiones verticales)
      if (distCol === 0) {
        if (distRow > 0) { // Destino abajo
          if (distRow > 1) { // Salta una materia intermedia (Ruta por Carril Derecho Lateral)
            strategy = "bridge-lateral"; sSide = "right"; tSide = "right";
            corridorX = sourcePos.x + nodeWidth + hGapHalf + getCorridorOffset(`col-bridge-${sourcePos.x}`, hGapHalf - 10);
          } else { // Materia inmediata inferior
            strategy = "default"; sSide = "bottom"; tSide = "top";
            corridorY = sourcePos.y + nodeHeight + vGapHalf + getCorridorOffset(`row-adj-${sourcePos.y}`, vGapHalf - 10);
          }
        } else { // Destino arriba
          if (distRow < -1) { // Salta hacia arriba (Ruta por Carril Izquierdo Lateral)
            strategy = "bridge-lateral"; sSide = "left"; tSide = "left";
            corridorX = sourcePos.x - hGapHalf + getCorridorOffset(`col-bridge-l-${sourcePos.x}`, hGapHalf - 10);
          } else { // Materia inmediata superior
            strategy = "default"; sSide = "top"; tSide = "bottom";
            corridorY = sourcePos.y - vGapHalf + getCorridorOffset(`row-adj-up-${sourcePos.y}`, vGapHalf - 10);
          }
        }
      }
      // 2. HACIA ADELANTE (Hacia Semestres Futuros)
      else if (distCol > 0) {
        if (distCol > 1) { // Salto muy largo (Requiere un Bridge Seguro Central)
          strategy = "bridge";
          tSide = "left";
          corridorX = targetPos.x - hGapHalf + getCorridorOffset(`col-bridge-t-${targetPos.x}`, hGapHalf - 10);

          if (distRow === 0) { // Mismo nivel Y
            sSide = "top";
            corridorY = sourcePos.y - vGapHalf + getCorridorOffset(`row-bridge-${sourcePos.y}`, vGapHalf - 10);
          } else if (distRow > 0) { // Destino más Abajo
            sSide = "bottom";
            corridorY = sourcePos.y + nodeHeight + vGapHalf + getCorridorOffset(`row-bridge-d-${sourcePos.y}`, vGapHalf - 10);
          } else { // Destino más Arriba
            sSide = "top";
            corridorY = sourcePos.y - vGapHalf + getCorridorOffset(`row-bridge-u-${sourcePos.y}`, vGapHalf - 10);
          }
        } else { // Semestre inmediato a la derecha (Conexión Simple con offset central antidesborde)
          strategy = "default"; sSide = "right"; tSide = "left";
          corridorX = sourcePos.x + nodeWidth + hGapHalf + getCorridorOffset(`col-adj-${sourcePos.x}`, hGapHalf - 10);
        }
      }
      // 3. HACIA ATRÁS (Requisito invertido cruzando linealmente)
      else {
        strategy = "default"; sSide = "left"; tSide = "right";
        corridorX = sourcePos.x - hGapHalf + getCorridorOffset(`col-rev-${sourcePos.x}`, hGapHalf - 10);
      }

      const sOffset = getFanOutOffset(sourceId, sSide, 'source');
      const tOffset = getFanOutOffset(targetId, tSide, 'target');

      return {
        sourceHandle: `s-${sSide}`,
        targetHandle: `t-${tSide}`,
        strategy, corridorX, corridorY, sOffset, tOffset
      };
    };

    // Crear edges (conexiones) solo si hay un subject seleccionado
    if (selectedSubject) {
      // Sets INDEPENDIENTES para evitar que uno bloquee al otro
      const processedRequirements = new Set<string>();
      const processedReleases = new Set<string>();

      // Función recursiva para procesar requisitos (hacia atrás)
      const processRequirements = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedRequirements.has(subjectKey)) return;
        visited.add(subjectKey);
        processedRequirements.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.requirements || subj.requirements.trim() === "") return;

        const requirements = subj.requirements
          .split("-")
          .map(r => normalizeSubjectKey(r))
          .filter((req) => req.trim() !== "" && !req.toLowerCase().includes("creditos"));

        requirements.forEach((reqKey) => {
          if (subjectCache.has(reqKey) || nodePositions.has(reqKey)) {
            // Nota: reqKey es el source (la materia requerida), subjectKey es el target
            const handles = getOptimalHandles(reqKey, subjectKey);

            newEdges.push({
              id: `req-${reqKey}-${subjectKey}`,
              source: reqKey,
              target: subjectKey,
              sourceHandle: handles.sourceHandle,
              targetHandle: handles.targetHandle,
              type: "smart",
              animated: !isMobile,
              selected: true,
              zIndex: 1000,
              data: { 
                strategy: handles.strategy, 
                corridorX: handles.corridorX, 
                corridorY: handles.corridorY,
                sOffset: handles.sOffset,
                tOffset: handles.tOffset
              },
              style: {
                stroke: "#3b82f6",
                strokeWidth: isMobile ? 1.5 : 2,
                strokeDasharray: "5,5",
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#3b82f6",
                width: isMobile ? 16 : 20,
                height: isMobile ? 16 : 20,
              },
            });

            processRequirements(reqKey, new Set(visited));
          }
        });
      };

      // Función recursiva para procesar liberaciones (hacia adelante)
      const processReleases = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedReleases.has(subjectKey)) return;
        visited.add(subjectKey);
        processedReleases.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.releases || subj.releases.trim() === "") return;

        const releases = subj.releases
          .split("-")
          .map(r => normalizeSubjectKey(r))
          .filter((rel) => rel.trim() !== "");

        releases.forEach((relKey) => {
          if (subjectCache.has(relKey) || nodePositions.has(relKey)) {
            // Nota: subjectKey es el source, relKey es el target (la materia liberada)
            const handles = getOptimalHandles(subjectKey, relKey);

            newEdges.push({
              id: `rel-${subjectKey}-${relKey}`,
              source: subjectKey,
              target: relKey,
              sourceHandle: handles.sourceHandle,
              targetHandle: handles.targetHandle,
              type: "smart",
              animated: !isMobile,
              selected: true,
              zIndex: 1000,
              data: { 
                strategy: handles.strategy, 
                corridorX: handles.corridorX, 
                corridorY: handles.corridorY,
                sOffset: handles.sOffset,
                tOffset: handles.tOffset
              },
              style: {
                stroke: "#22c55e",
                strokeWidth: isMobile ? 1.5 : 2,
                strokeDasharray: "5,5",
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#22c55e",
                width: isMobile ? 16 : 20,
                height: isMobile ? 16 : 20,
              },
            });

            processReleases(relKey, new Set(visited));
          }
        });
      };

      // Procesar ambas direcciones de forma independiente
      processRequirements(selectedSubject);
      processReleases(selectedSubject);
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [semesters, subjectCache, showAll, showSubject, selectedSubject, setNodes, setEdges, isMobile]);

  return (
    <div className="w-full h-[600px] md:h-[800px] rounded-lg overflow-hidden border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        elevateEdgesOnSelect
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: isMobile ? 0.5 : 0.8 }}
        // Optimizaciones de rendimiento para móvil
        panOnScroll={!isMobile} // Desactivar pan con scroll en móvil
        zoomOnScroll={!isMobile} // Desactivar zoom con scroll en móvil
        zoomOnPinch={true} // Mantener pinch-to-zoom en móvil
        preventScrolling={isMobile} // Prevenir conflictos de scroll en móvil
      >
        <Background gap={isMobile ? 20 : 16} />
        <Controls className="hidden md:flex" />
        <MiniMap
          className="hidden lg:block"
          nodeColor={(node) => getSubjectMinimapColor(subjectCache.get(node.id)?.branch)}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
