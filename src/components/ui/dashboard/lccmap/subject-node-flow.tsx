"use client";

import { memo, useContext } from "react";
import { Handle, Position } from "reactflow";
import { Subject, SubjectShowContext } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSubjectFlowColor } from "@/lib/utils/subjectColors";
import {
  SubjectDialogContent,
  getSubjectDialogTitle
} from "./SubjectDialogContent";
import {
  useSubjectInteraction,
  shouldShowDialog
} from "@/hooks/useSubjectInteraction";

interface SubjectNodeProps {
  data: {
    subject: Subject;
    subjectKey: string;
    subjectCache: Map<string, Subject>;
    isVisible: boolean;
  };
}

function SubjectNodeComponent({ data }: SubjectNodeProps) {
  const { subject, subjectKey, subjectCache, isVisible } = data;
  const { selectedSubject } = useContext(SubjectShowContext)!;

  // Hook personalizado para manejar la interacción
  const { isHovered, handleClick, handleMouseEnter, handleMouseLeave } =
    useSubjectInteraction(subjectKey, subject);

  const isSelected = selectedSubject === subjectKey;
  // Calcular la opacidad final
  const finalOpacity = isHovered ? 1 : (isVisible ? 1 : 0.3);

  return (
    <Dialog>
      <div
        className={`
          ${getSubjectFlowColor(subject?.branch)} 
          rounded-lg p-4
          w-[160px] h-[120px]
          flex flex-col items-center justify-center
          transition-all duration-200
          hover:scale-105 hover:shadow-lg
          cursor-pointer
          border-2
          ${isSelected ? "border-blue-500" : "border-gray-200"}
        `}
        style={{
          opacity: finalOpacity,
          boxShadow: isSelected
            ? "0 0 0 3px rgba(59,130,246,0.35), 0 4px 16px rgba(59,130,246,0.25)"
            : undefined,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />

        {shouldShowDialog(subject?.subjectKey) ? (
          <DialogTrigger asChild>
            <button className="text-sm font-semibold text-center hover:underline">
              {subject?.abbr || subject?.subjectName.trim()}
            </button>
          </DialogTrigger>
        ) : (
          <h3 className="text-sm font-semibold text-center">
            {subject?.abbr || subject?.subjectName.trim()}
          </h3>
        )}
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getSubjectDialogTitle(subjectKey, subject)}
          </DialogTitle>
        </DialogHeader>
        <SubjectDialogContent
          subject={subject}
          subjectKey={subjectKey}
          subjectCache={subjectCache}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(SubjectNodeComponent);
