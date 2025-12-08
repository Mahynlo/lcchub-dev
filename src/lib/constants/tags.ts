/**
 * Constantes relacionadas con el blog
 * Centraliza colores de tags y etiquetas para evitar duplicación
 */

export const tagColors: Record<string, string> = {
  evento: "bg-red-700",
  convocatoria: "bg-blue-500",
  noticia: "bg-green-500",
  general: "bg-gray-500",
  platicas: "bg-purple-600",
  taller: "bg-orange-500",
};

export const tagLabels: Record<string, string> = {
  evento: "Evento",
  convocatoria: "Convocatoria",
  noticia: "Noticia",
  general: "General",
  platicas: "Plática",
  taller: "Taller",
};

export const tags = [
  { value: "todos", label: "Todos" },
  { value: "evento", label: "Evento" },
  { value: "convocatoria", label: "Convocatoria" },
  { value: "noticia", label: "Noticia" },
  { value: "general", label: "General" },
  { value: "platicas", label: "Pláticas" },
  { value: "taller", label: "Taller" },
];
