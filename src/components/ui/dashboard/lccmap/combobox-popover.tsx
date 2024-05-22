import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { SubjectShowContext } from "@/lib/types";
import { StudentInfoContext } from "@/app/dashboard/auth/profile/layout";
import { setOptionSubjects, all2false } from "./subject-card";

interface showStatus {
  value: string;
  label: string;
}

export const showStatusList: showStatus[] = [
  { value: "all", label: "Todas" },
  { value: "credited", label: "Aprobadas" },
  { value: "dropped", label: "Bajas" },
  { value: "enrolled", label: "Inscrítas" },
  { value: "failed", label: "Reprobadas" },
  { value: "third enrolled", label: "3ra inscripción" },
];

export function ComboboxPopover() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<showStatus | null>(null);
  const { showAll, showSubject, setShowAll, filterOption, setFilterOption } =
    useContext(SubjectShowContext)!;
  const student = useContext(StudentInfoContext);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Mostrar</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ opciones</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Cambiar opción..." />
            <CommandList>
              <CommandEmpty>No hay resultados.</CommandEmpty>
              <CommandGroup>
                {showStatusList.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value: string) => {
                      setSelectedStatus(
                        showStatusList.find(
                          (priority) => priority.value === value,
                        ) || null,
                      );
                      setOpen(false);
                      setFilterOption(value);
                      if (value == "all") setShowAll && setShowAll(true);
                      else {
                        setShowAll && setShowAll(false);
                        all2false(showSubject);
                        setOptionSubjects(student, value, showSubject);
                      }
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
