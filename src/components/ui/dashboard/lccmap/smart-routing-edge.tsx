import React from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "reactflow";

// Función para dibujar trazados ortogonales con esquinas redondeadas
function getRoundedPolyline(rawPoints: { x: number, y: number }[], radius = 16) {
  // Remover puntos consecutivos idénticos para evitar divisiones por cero (rigen 90 grados rotos)
  const points = rawPoints.filter((p, i, arr) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    return Math.abs(p.x - prev.x) > 0.5 || Math.abs(p.y - prev.y) > 0.5;
  });

  if (points.length < 2) return "";
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const p1 = points[i - 1]; // Previous
    const p2 = points[i];     // Corner
    const p3 = points[i + 1]; // Next

    const dx1 = p1.x - p2.x;
    const dy1 = p1.y - p2.y;
    const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    const dx2 = p3.x - p2.x;
    const dy2 = p3.y - p2.y;
    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    if (dist1 === 0 || dist2 === 0) continue;

    const r = Math.min(radius, dist1 / 2, dist2 / 2);

    const startX = p2.x + (dx1 / dist1) * r;
    const startY = p2.y + (dy1 / dist1) * r;

    const endX = p2.x + (dx2 / dist2) * r;
    const endY = p2.y + (dy2 / dist2) * r;

    // Linea recta hasta el inicio de la curva
    path += ` L ${startX} ${startY}`;
    // Curva bezier cuadrática para doblar la esquina limpiamente
    path += ` Q ${p2.x} ${p2.y} ${endX} ${endY}`;
  }

  const last = points[points.length - 1];
  path += ` L ${last.x} ${last.y}`;
  return path;
}

export const SmartRoutingEdge = ({
  id,
  sourceX: originalSourceX,
  sourceY: originalSourceY,
  targetX: originalTargetX,
  targetY: originalTargetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  let edgePath = "";

  // Determinar en qué eje se aplica el Offset "Fan Out" en los puertos
  const isLeftRightS = sourcePosition === "left" || sourcePosition === "right";
  const isLeftRightT = targetPosition === "left" || targetPosition === "right";

  const sourceX = originalSourceX + (isLeftRightS ? 0 : (data?.sOffset || 0));
  const sourceY = originalSourceY + (isLeftRightS ? (data?.sOffset || 0) : 0);
  const targetX = originalTargetX + (isLeftRightT ? 0 : (data?.tOffset || 0));
  const targetY = originalTargetY + (isLeftRightT ? (data?.tOffset || 0) : 0);

  if (data?.strategy === 'bridge') {
    const cy = data.corridorY;
    const cx = data.corridorX || (targetX - 30);
    const waypoints = [
      { x: sourceX, y: sourceY },
      { x: sourceX, y: cy },
      { x: cx, y: cy },
      { x: cx, y: targetY },
      { x: targetX, y: targetY }
    ];
    edgePath = getRoundedPolyline(waypoints, 16);
  } else if (data?.strategy === 'bridge-lateral') {
    const cx = data.corridorX;
    const waypoints = [
      { x: sourceX, y: sourceY },
      { x: cx, y: sourceY },
      { x: cx, y: targetY },
      { x: targetX, y: targetY }
    ];
    edgePath = getRoundedPolyline(waypoints, 16);
  } else {
    // Fallback al router por defecto de ReactFlow con offsets dinámicos para evitar encimamientos
    [edgePath] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      centerX: data?.corridorX || undefined,
      centerY: data?.corridorY || undefined,
      borderRadius: 16,
    });
  }

  // Reducir opacidad ligeramente para edges traseros
  return <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />;
};
