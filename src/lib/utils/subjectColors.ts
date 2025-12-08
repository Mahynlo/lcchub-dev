/**
 * Utilidades para colores y estilos de materias según su eje/rama
 */

export type SubjectBranch = 
  | "Basico" 
  | "Comun" 
  | "Profesional" 
  | "Especializante" 
  | "Selectiva" 
  | "Vocacional" 
  | "Integrador";

/**
 * Colores disponibles para los ejes
 */
export const BRANCH_COLORS = {
  Basico: {
    card: "bg-[#e8eef7]",
    flow: "bg-[#9EC0DB]",
    hex: "#9EC0DB",
  },
  Comun: {
    card: "bg-[#ffff66]",
    flow: "bg-[#ffff66]",
    hex: "#ffff66",
  },
  Profesional: {
    card: "bg-[#ff9966]",
    flow: "bg-[#ff9966]",
    hex: "#ff9966",
  },
  Especializante: {
    card: "bg-[#99ff66]",
    flow: "bg-[#99ff66]",
    hex: "#99ff66",
  },
  Selectiva: {
    card: "bg-[#99ff66]",
    flow: "bg-[#99ff66]",
    hex: "#99ff66",
  },
  Vocacional: {
    card: "bg-[#99ff66]",
    flow: "bg-[#99ff66]",
    hex: "#99ff66",
  },
  Integrador: {
    card: "bg-[#9966ff]",
    flow: "bg-[#9966ff]",
    hex: "#9966ff",
  },
} as const;

/**
 * Retorna la clase de color de fondo según el eje de la materia
 * Para usar en componentes de tarjetas (más claro)
 */
export function getSubjectCardColor(branch: string | undefined): string {
  if (!branch) return BRANCH_COLORS.Basico.card;
  
  const branchKey = branch as keyof typeof BRANCH_COLORS;
  return BRANCH_COLORS[branchKey]?.card || BRANCH_COLORS.Basico.card;
}

/**
 * Retorna la clase de color de fondo según el eje de la materia
 * Para usar en ReactFlow (más saturado)
 */
export function getSubjectFlowColor(branch: string | undefined): string {
  if (!branch) return BRANCH_COLORS.Basico.flow;
  
  const branchKey = branch as keyof typeof BRANCH_COLORS;
  return BRANCH_COLORS[branchKey]?.flow || BRANCH_COLORS.Basico.flow;
}

/**
 * Retorna el color hexadecimal para minimap de ReactFlow
 */
export function getSubjectMinimapColor(branch: string | undefined): string {
  if (!branch) return BRANCH_COLORS.Basico.hex;
  
  const branchKey = branch as keyof typeof BRANCH_COLORS;
  return BRANCH_COLORS[branchKey]?.hex || BRANCH_COLORS.Basico.hex;
}
