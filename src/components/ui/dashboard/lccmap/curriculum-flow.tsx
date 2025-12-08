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
} from "reactflow";
import "reactflow/dist/style.css";
import { Subject, SubjectShowContext } from "@/lib/types";
import SubjectNode from "./subject-node-flow";
import { getSubjectMinimapColor } from "@/lib/utils/subjectColors";

interface CurriculumFlowProps {
  semesters: string[];
  subjectCache: Map<string, Subject>;
}

const nodeTypes = {
  subjectNode: SubjectNode,
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
  const [updateTrigger, setUpdateTrigger] = useState(0);
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

  // Actualizar cuando cambian los filtros
  useEffect(() => {
    setUpdateTrigger(prev => prev + 1);
  }, [showAll, filterOption]);

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
    
    // Espaciado entre nodos
    const nodeWidth = 180;
    const nodeHeight = 140;
    const horizontalGap = 60;
    const verticalGap = 40;
    
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
        const subject = subjectCache.get(subjectKey);
        if (!subject) return;
        
        const yPosition = subjectIndex * (nodeHeight + verticalGap);
        
        // Determinar opacidad basada en filtros
        const isVisible = showAll || showSubject.get(subjectKey);
        
        newNodes.push({
          id: subjectKey,
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
    
    // Crear edges (conexiones) solo si hay un subject seleccionado
    if (selectedSubject) {
      const processedSubjects = new Set<string>();
      
      // Función recursiva para procesar requisitos
      const processRequirements = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedSubjects.has(subjectKey)) return;
        visited.add(subjectKey);
        processedSubjects.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.requirements || subj.requirements.trim() === "") return;

        const requirements = subj.requirements
          .split("-")
          .filter((req) => req.trim() !== "" && !req.toLowerCase().includes("creditos"));

        requirements.forEach((reqKey) => {
          if (subjectCache.has(reqKey)) {
            // Agregar edge
            newEdges.push({
              id: `${reqKey}-${subjectKey}`,
              source: reqKey,
              target: subjectKey,
              type: "smoothstep",
              animated: !isMobile, // Desactivar animación en móvil para mejor rendimiento
              style: { 
                stroke: "#3b82f6",
                strokeWidth: isMobile ? 1.5 : 2, // Líneas más delgadas en móvil
                strokeDasharray: "5,5",
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#3b82f6",
                width: isMobile ? 16 : 20, // Flechas más pequeñas en móvil
                height: isMobile ? 16 : 20,
              },
            });
            
            // Procesar recursivamente los requisitos de este requisito
            processRequirements(reqKey, new Set(visited));
          }
        });
      };
      
      // Función recursiva para procesar liberaciones
      const processReleases = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedSubjects.has(subjectKey)) return;
        visited.add(subjectKey);
        processedSubjects.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.releases || subj.releases.trim() === "") return;

        const releases = subj.releases.split("-").filter((rel) => rel.trim() !== "");

        releases.forEach((relKey) => {
          if (subjectCache.has(relKey)) {
            // Agregar edge
            newEdges.push({
              id: `${subjectKey}-${relKey}`,
              source: subjectKey,
              target: relKey,
              type: "smoothstep",
              animated: !isMobile, // Desactivar animación en móvil para mejor rendimiento
              style: { 
                stroke: "#22c55e",
                strokeWidth: isMobile ? 1.5 : 2, // Líneas más delgadas en móvil
                strokeDasharray: "5,5",
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#22c55e",
                width: isMobile ? 16 : 20, // Flechas más pequeñas en móvil
                height: isMobile ? 16 : 20,
              },
            });
            
            // Procesar recursivamente las liberaciones de esta liberación
            processReleases(relKey, new Set(visited));
          }
        });
      };
      
      // Iniciar procesamiento recursivo desde la materia seleccionada
      processRequirements(selectedSubject);
      processReleases(selectedSubject);
    }
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, [semesters, subjectCache, showAll, showSubject, selectedSubject, updateTrigger, setNodes, setEdges, isMobile]);

  return (
    <div className="w-full h-[600px] md:h-[800px] rounded-lg overflow-hidden border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
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
