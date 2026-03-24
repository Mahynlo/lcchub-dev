/**
 * Normaliza las claves de materias para garantizar consistencia en comparaciones.
 * 
 * Convierte claves numéricas a formato de 4 dígitos con padding de ceros a la izquierda.
 * Las claves no numéricas se devuelven sin modificar.
 * 
 * @param key - La clave de materia a normalizar (ej: "120", "0120", "MAT")
 * @returns La clave normalizada (ej: "0120", "0120", "MAT")
 * 
 * @example
 * normalizeSubjectKey("120")   // → "0120"
 * normalizeSubjectKey("0120")  // → "0120"
 * normalizeSubjectKey("1234")  // → "1234"
 * normalizeSubjectKey("MAT")   // → "MAT"
 * normalizeSubjectKey(" 120 ") // → "0120"
 */
export function normalizeSubjectKey(key: string): string {
  const cleaned = key.trim();

  // Si es un número, asegurarse que tenga 4 dígitos con padding de ceros
  if (/^\d+$/.test(cleaned)) {
    return cleaned.padStart(4, '0');
  }

  return cleaned;
}

/**
 * Valida si una clave de materia tiene el formato correcto.
 * 
 * Formatos válidos:
 * - 4 dígitos: "0120", "1234"
 * - Letras mayúsculas: "MAT", "FIS"
 * - Palabras especiales: "Selec", "Intg", "Esp", "Avi"
 * 
 * @param key - La clave a validar
 * @returns true si el formato es válido
 * 
 * @example
 * isValidSubjectKey("0120")  // → true
 * isValidSubjectKey("MAT")   // → true
 * isValidSubjectKey("Selec") // → true
 * isValidSubjectKey("12")    // → false (solo 2 dígitos)
 */
export function isValidSubjectKey(key: string): boolean {
  const cleaned = key.trim();

  // Formato: 4 dígitos o palabras especiales o letras mayúsculas
  return /^\d{4,}$/.test(cleaned) ||
    /^[A-Z]+$/.test(cleaned) ||
    ['Selec', 'Intg', 'Esp', 'Avi', 'OPT'].includes(cleaned);
}
