import { Input } from "@/components/ui/input";
import { useState, useContext, useEffect } from "react";
import { SubjectShowContext, Subject } from "@/lib/types";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { normalizeSubjectKey } from "@/lib/utils/subjectKey";

interface SubjectSearchProps {
  subjectCache: Map<string, Subject>;
}

export function SubjectSearch({ subjectCache }: SubjectSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<Array<{ key: string; subject: Subject }>>([]);
  const [showResults, setShowResults] = useState(false);
  const { showAll, showSubject, setShowSubject, setShowAll, setFilterOption, setSelectedSubject } =
    useContext(SubjectShowContext)!;

  // Filtrar materias basado en la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSubjects([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = Array.from(subjectCache.entries())
      .filter(([key, subject]) => {
        return (
          key.toLowerCase().includes(query) ||
          subject.subjectName.toLowerCase().includes(query)
        );
      })
      .map(([key, subject]) => ({ key, subject }))
      .slice(0, 10); // Limitar a 10 resultados

    setFilteredSubjects(results);
    setShowResults(results.length > 0);
  }, [searchQuery, subjectCache]);

  const handleSelectSubject = (subjectKey: string, subject: Subject) => {
    setSearchQuery(`${subjectKey} - ${subject.subjectName}`);
    setShowResults(false);
    setShowAll && setShowAll(false);

    // Crear un nuevo Map para evitar mutar el estado directamente (buena práctica de React)
    const newShowSubject = new Map<string, boolean>();

    // Limpiar todas las materias visibles antes de procesar la nueva búsqueda
    Array.from(subjectCache.keys()).forEach(key => {
      newShowSubject.set(key, false);
    });

    // Función recursiva para procesar requisitos
    const processRequirements = (key: string, visited: Set<string> = new Set()) => {
      if (visited.has(key)) return;
      visited.add(key);

      const subj = subjectCache.get(key);
      if (!subj) return;

      newShowSubject.set(key, true);

      if (subj.requirements && !subj.requirements.toLowerCase().includes("creditos")) {
        const requirements = subj.requirements
          .split("-")
          .map(r => normalizeSubjectKey(r))
          .filter(req => req.trim() !== "");
        requirements.forEach(reqKey => {
          if (subjectCache.has(reqKey)) {
            processRequirements(reqKey, visited);
          }
        });
      }
    };

    // Función recursiva para procesar liberaciones
    const processReleases = (key: string, visited: Set<string> = new Set()) => {
      if (visited.has(key)) return;
      visited.add(key);

      const subj = subjectCache.get(key);
      if (!subj) return;

      newShowSubject.set(key, true);

      if (subj.releases) {
        const releases = subj.releases
          .split("-")
          .map(r => normalizeSubjectKey(r))
          .filter(rel => rel.trim() !== "");
        releases.forEach(relKey => {
          if (subjectCache.has(relKey)) {
            processReleases(relKey, visited);
          }
        });
      }
    };

    // Procesar toda la cadena de seriación
    processRequirements(subjectKey);
    processReleases(subjectKey);

    // Actualizar el estado de manera inmutable
    setShowSubject && setShowSubject(newShowSubject);

    // Activar la materia seleccionada para mostrar las flechas
    setSelectedSubject && setSelectedSubject(subjectKey);
    setFilterOption && setFilterOption("search");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredSubjects([]);
    setShowResults(false);
    setShowAll && setShowAll(true);
    setSelectedSubject && setSelectedSubject(null);
    setFilterOption && setFilterOption("all");
  };

  return (
    <div className="flex items-center relative flex-1 w-full md:max-w-md">
      <h1 className="text-sm text-muted-foreground pr-3 whitespace-nowrap">Buscar</h1>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por clave o nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() !== "" && setShowResults(true)}
          className="pl-9 pr-9 text-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Resultados de búsqueda */}
        {showResults && filteredSubjects.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[250px] md:max-h-[300px] overflow-y-auto">
            {filteredSubjects.map(({ key, subject }) => (
              <button
                key={key}
                onClick={() => handleSelectSubject(key, subject)}
                className="w-full text-left px-3 md:px-4 py-2 hover:bg-gray-100 flex flex-col border-b last:border-b-0"
              >
                <span className="font-semibold text-sm">{key}</span>
                <span className="text-xs text-gray-600 line-clamp-1">{subject.subjectName}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
