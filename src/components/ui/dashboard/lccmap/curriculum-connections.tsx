"use client";

import { useEffect, useState, useContext } from "react";
import { Subject, SubjectShowContext } from "@/lib/types";

interface CurriculumConnectionsProps {
  semesters: string[];
  subjectCache: Map<string, Subject>;
  selectedSubject: string | null;
}

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: "requirement" | "release";
}

export default function CurriculumConnections({
  semesters,
  subjectCache,
  selectedSubject,
}: CurriculumConnectionsProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { showSubject } = useContext(SubjectShowContext)!;

  useEffect(() => {
    if (!selectedSubject) {
      setConnections([]);
      return;
    }

    const subject = subjectCache.get(selectedSubject);
    if (!subject) {
      setConnections([]);
      return;
    }

    setTimeout(() => {
      const selectedCard = document.querySelector(`[data-subject-key="${selectedSubject}"]`);
      if (!selectedCard) return;

      const selectedRect = selectedCard.getBoundingClientRect();
      const containerRect = selectedCard.closest(".md\\:grid")?.getBoundingClientRect();
      if (!containerRect) return;

      const newConnections: Connection[] = [];

      // Sets INDEPENDIENTES para evitar que uno bloquee al otro
      const processedRequirements = new Set<string>();
      const processedReleases = new Set<string>();

      const processRequirements = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedRequirements.has(subjectKey)) return;
        visited.add(subjectKey);
        processedRequirements.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.requirements || subj.requirements.trim() === "") return;

        const requirements = subj.requirements
          .split("-")
          .filter((req) => req.trim() !== "" && !req.toLowerCase().includes("creditos"));

        const toCard = document.querySelector(`[data-subject-key="${subjectKey}"]`);
        if (!toCard) return;

        const toRect = toCard.getBoundingClientRect();

        requirements.forEach((reqKey) => {
          const fromCard = document.querySelector(`[data-subject-key="${reqKey}"]`);
          if (!fromCard) return;

          const fromRect = fromCard.getBoundingClientRect();

          const fromCenterX = fromRect.left - containerRect.left + fromRect.width / 2;
          const fromCenterY = fromRect.top - containerRect.top + fromRect.height / 2;
          const toCenterX = toRect.left - containerRect.left + toRect.width / 2;
          const toCenterY = toRect.top - containerRect.top + toRect.height / 2;

          const dx = toCenterX - fromCenterX;
          const dy = toCenterY - fromCenterY;

          const spacing = 8;
          let fromCenter, toCenter;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
              fromCenter = { x: fromRect.left - containerRect.left + fromRect.width + spacing, y: fromCenterY };
              toCenter = { x: toRect.left - containerRect.left - spacing, y: toCenterY };
            } else {
              fromCenter = { x: fromRect.left - containerRect.left - spacing, y: fromCenterY };
              toCenter = { x: toRect.left - containerRect.left + toRect.width + spacing, y: toCenterY };
            }
          } else {
            if (dy > 0) {
              fromCenter = { x: fromCenterX, y: fromRect.top - containerRect.top + fromRect.height + spacing };
              toCenter = { x: toCenterX, y: toRect.top - containerRect.top - spacing };
            } else {
              fromCenter = { x: fromCenterX, y: fromRect.top - containerRect.top - spacing };
              toCenter = { x: toCenterX, y: toRect.top - containerRect.top + toRect.height + spacing };
            }
          }

          newConnections.push({ from: fromCenter, to: toCenter, type: "requirement" });

          processRequirements(reqKey, new Set(visited));
        });
      };

      const processReleases = (subjectKey: string, visited: Set<string> = new Set()) => {
        if (visited.has(subjectKey) || processedReleases.has(subjectKey)) return;
        visited.add(subjectKey);
        processedReleases.add(subjectKey);

        const subj = subjectCache.get(subjectKey);
        if (!subj || !subj.releases || subj.releases.trim() === "") return;

        const releases = subj.releases.split("-").filter((rel) => rel.trim() !== "");

        const fromCard = document.querySelector(`[data-subject-key="${subjectKey}"]`);
        if (!fromCard) return;

        const fromRect = fromCard.getBoundingClientRect();

        releases.forEach((relKey) => {
          const toCard = document.querySelector(`[data-subject-key="${relKey}"]`);
          if (!toCard) return;

          const toRect = toCard.getBoundingClientRect();

          const fromCenterX = fromRect.left - containerRect.left + fromRect.width / 2;
          const fromCenterY = fromRect.top - containerRect.top + fromRect.height / 2;
          const toCenterX = toRect.left - containerRect.left + toRect.width / 2;
          const toCenterY = toRect.top - containerRect.top + toRect.height / 2;

          const dx = toCenterX - fromCenterX;
          const dy = toCenterY - fromCenterY;

          const spacing = 8;
          let fromCenter, toCenter;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
              fromCenter = { x: fromRect.left - containerRect.left + fromRect.width + spacing, y: fromCenterY };
              toCenter = { x: toRect.left - containerRect.left - spacing, y: toCenterY };
            } else {
              fromCenter = { x: fromRect.left - containerRect.left - spacing, y: fromCenterY };
              toCenter = { x: toRect.left - containerRect.left + toRect.width + spacing, y: toCenterY };
            }
          } else {
            if (dy > 0) {
              fromCenter = { x: fromCenterX, y: fromRect.top - containerRect.top + fromRect.height + spacing };
              toCenter = { x: toCenterX, y: toRect.top - containerRect.top - spacing };
            } else {
              fromCenter = { x: fromCenterX, y: fromRect.top - containerRect.top - spacing };
              toCenter = { x: toCenterX, y: toRect.top - containerRect.top + toRect.height + spacing };
            }
          }

          newConnections.push({ from: fromCenter, to: toCenter, type: "release" });

          processReleases(relKey, new Set(visited));
        });
      };

      processRequirements(selectedSubject);
      processReleases(selectedSubject);

      setConnections(newConnections);
    }, 50);
  }, [selectedSubject, subjectCache, showSubject, semesters]);

  if (connections.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <marker
          id="arrowhead-blue"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill="#3b82f6" />
        </marker>
        <marker
          id="arrowhead-green"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill="#22c55e" />
        </marker>
      </defs>
      {connections.map((conn, index) => {
        const dx = conn.to.x - conn.from.x;
        const dy = conn.to.y - conn.from.y;

        const strokeColor = conn.type === "requirement" ? "#3b82f6" : "#22c55e";
        const glowColor = conn.type === "requirement" ? "#3b82f680" : "#22c55e80";
        const markerUrl = conn.type === "requirement" ? "url(#arrowhead-blue)" : "url(#arrowhead-green)";

        // Crear una ruta en forma de escalera
        let pathD;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Conexión principalmente horizontal
          const midX = conn.from.x + dx / 2;
          // Salir horizontal, girar vertical, entrar horizontal a la tarjeta
          pathD = `M ${conn.from.x} ${conn.from.y} L ${midX} ${conn.from.y} L ${midX} ${conn.to.y} L ${conn.to.x} ${conn.to.y}`;
        } else {
          // Conexión principalmente vertical
          const midY = conn.from.y + dy / 2;
          // Salir vertical, girar horizontal, entrar vertical a la tarjeta
          pathD = `M ${conn.from.x} ${conn.from.y} L ${conn.from.x} ${midY} L ${conn.to.x} ${midY} L ${conn.to.x} ${conn.to.y}`;
        }

        return (
          <path
            key={index}
            d={pathD}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="4,3"
            fill="none"
            markerEnd={markerUrl}
            style={{
              filter: `drop-shadow(0 0 1px ${glowColor})`,
            }}
          />
        );
      })}
    </svg>
  );
}
