"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { tags } from "@/lib/constants/tags";

interface BlogFiltersProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
  onClearFilters: () => void;
}

export function BlogFilters({
  selectedTag,
  onTagChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}: BlogFiltersProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  const hasFilters = selectedTag !== "todos" || startDate || endDate;
  const selectedTagLabel = tags.find((tag) => tag.value === selectedTag)?.label || "Todos";

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Filtros</h3>
      </div>

      {/* Filtro por etiquetas */}
      <div>
        <h4 className="text-sm md:text-base font-medium mb-2 md:mb-3">Categoría</h4>
        <Popover open={tagOpen} onOpenChange={setTagOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-sm">
              {selectedTagLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[200px]" side="bottom" align="start">
            <Command>
              <CommandInput placeholder="Buscar categoría..." />
              <CommandList>
                <CommandEmpty>No hay resultados.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.value}
                      value={tag.value}
                      onSelect={(value: string) => {
                        onTagChange(value);
                        setTagOpen(false);
                      }}
                    >
                      {tag.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filtro por fecha */}
      <div>
        <h4 className="text-sm md:text-base font-medium mb-2 md:mb-3">Fecha de publicación</h4>
        <div className="flex flex-col gap-2 md:gap-3">
          {/* Fecha inicio */}
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-xs md:text-sm"
              >
                <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                {startDate ? (
                  format(startDate, "PPP", { locale: es })
                ) : (
                  <span>Fecha inicio</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  onStartDateChange(date);
                  setStartOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Fecha fin */}
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal text-xs md:text-sm"
              >
                <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                {endDate ? (
                  format(endDate, "PPP", { locale: es })
                ) : (
                  <span>Fecha fin</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  onEndDateChange(date);
                  setEndOpen(false);
                }}
                initialFocus
                disabled={(date) => startDate ? date < startDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Botón limpiar filtros */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full text-xs md:text-sm justify-center mt-2 md:mt-4 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:text-red-700"
        >
          <X className="mr-1 h-3 w-3 md:h-4 md:w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
