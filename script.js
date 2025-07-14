const niveles = {
  1: "Primer Año",
  2: "Segundo Año",
  3: "Tercer Año",
  4: "Cuarto Año",
  5: "Quinto Año",
  6: "Sexto Año"
};

const materias = [
  { nombre: "Introducción al Conocimiento Científico", anio: 1, correlativas: [] },
  { nombre: "Introducción al Pensamiento Jurídico", anio: 1, correlativas: [] },
  { nombre: "Derecho Romano", anio: 1, correlativas: [] },
  { nombre: "Teoría del Estado", anio: 1, correlativas: [] },
  { nombre: "Sociología Jurídica", anio: 1, correlativas: [] },
  { nombre: "Derechos Humanos y Garantías", anio: 1, correlativas: [] },

  { nombre: "Derecho Constitucional", anio: 2, correlativas: ["Teoría del Estado"] },
  { nombre: "Derecho Político", anio: 2, correlativas: ["Teoría del Estado"] },
  { nombre: "Derecho Penal I", anio: 2, correlativas: ["Derecho Romano"] },
  { nombre: "Derecho Civil I (Parte General)", anio: 2, correlativas: ["Derecho Romano"] },
  { nombre: "Derecho Internacional Público", anio: 2, correlativas: ["Derechos Humanos y Garantías"] },
  { nombre: "Derecho Procesal Penal", anio: 2, correlativas: ["Derecho Penal I"] },

  { nombre: "Derecho Penal II", anio: 3, correlativas: ["Derecho Penal I"] },
  { nombre: "Derecho Civil II (Obligaciones)", anio: 3, correlativas: ["Derecho Civil I (Parte General)"] },
  { nombre: "Derecho Procesal Civil y Comercial", anio: 3, correlati
