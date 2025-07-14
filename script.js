const niveles = {
  1: "Primer Año",
  2: "Segundo Año",
  3: "Tercer Año",
  4: "Cuarto Año",
  5: "Quinto Año",
  6: "Sexto Año"
};

const materias = [
  // 1º Año
  { nombre: "Ieca", anio: 1, correlativas: [] },
  { nombre: "Romano", anio: 1, correlativas: ["Ieca"] },
  { nombre: "Problemas del Conocimiento", anio: 1, correlativas: ["Ieca"] },
  { nombre: "Introducción al Derecho", anio: 1, correlativas: ["Ieca"] },
  { nombre: "Constitucional", anio: 1, correlativas: ["Introducción al Derecho"] },
  { nombre: "Privado I", anio: 1, correlativas: ["Introducción al Derecho", "Ieca"] },
  { nombre: "Penal I", anio: 1, correlativas: ["Introducción al Derecho", "Ieca"] },
  { nombre: "Privado II", anio: 1, correlativas: ["Privado I", "Ieca"] },

  // 2º Año
  { nombre: "Teoría General del Proceso", anio: 2, correlativas: ["Problemas del Conocimiento", "Constitucional"] },
  { nombre: "Penal II", anio: 2, correlativas: ["Penal I", "Privado I"] },
  { nombre: "Privado III", anio: 2, correlativas: ["Privado II"] },
  { nombre: "Público Provincial", anio: 2, correlativas: ["Constitucional", "Privado I"] },
  { nombre: "Procesal Penal", anio: 2, correlativas: ["Teoría General del Proceso", "Penal II", "Constitucional", "Privado I", "Penal I"] },
  { nombre: "Taller de Jurisprudencia I", anio: 2, correlativas: ["Privado II", "Penal I"] },

  // 3º Año
  { nombre: "Privado IV", anio: 3, correlativas: ["Privado III"] },
  { nombre: "Administrativo I", anio: 3, correlativas: ["Público Provincial"] },
  { nombre: "Procesal Civil", anio: 3, correlativas: ["Teoría General del Proceso", "Privado I", "Privado II"] },
  { nombre: "Privado V", anio: 3, correlativas: ["Privado IV"] },
  { nombre: "Procesal Constitucional", anio: 3, correlativas: ["Teoría General del Proceso", "Público Provincial"] },
  { nombre: "Procesal Administrativo II", anio: 3, correlativas: ["Constitucional", "Administrativo I"] },
  { nombre: "Laboral", anio: 3, correlativas: ["Privado II", "Privado III"] },
  { nombre: "Taller de Jurisprudencia II", anio: 3, correlativas: ["Taller de Jurisprudencia I", "Privado II"] },

  // 4º Año
  { nombre: "Privado VI", anio: 4, correlativas: ["Privado V"] },
  { nombre: "Político", anio: 4, correlativas: ["Administrativo I", "Taller de Jurisprudencia I"] },
  { nombre: "Sociología", anio: 4, correlativas: [] },
  { nombre: "Práctica Profesional I", anio: 4, correlativas: ["Procesal Penal", "Procesal Civil", "Privado V", "Laboral"] },
  { nombre: "Privado VII", anio: 4, correlativas: ["Privado VI"] },
  { nombre: "Filosofía", anio: 4, correlativas: ["Problemas del Conocimiento"] },
  { nombre: "Economía", anio: 4, correlativas: [] },
  { nombre: "Privado VIII", anio: 4, correlativas: ["Privado VI"] },
  { nombre: "Concursal", anio: 4, correlativas: ["Privado VII", "Privado VIII"] },

  // 5º Año
  { nombre: "Historia", anio: 5, correlativas: ["Romano"] },
  { nombre: "Teoría del Conflicto", anio: 5, correlativas: ["Procesal Penal", "Procesal Constitucional", "Filosofía", "Concursal"] },
  { nombre: "Optativa I", anio: 5, correlativas: [] },
  { nombre: "Internacional Público", anio: 5, correlativas: ["Político"] },
  { nombre: "Ética", anio: 5, correlativas: ["Concursal"] },
  { nombre: "Optativa II", anio: 5, correlativas: [] },
  { nombre: "Práctica Profesional II", anio: 5, correlativas: ["Práctica Profesional I"] },
  { nombre: "Tributario", anio: 5, correlativas: ["Procesal Administrativo II", "Economía"] },
  { nombre: "Optativa III", anio: 5, correlativas: [] },

  // 6º Año
  { nombre: "Seminario de Naturales", anio: 6, correlativas: ["Administrativo I", "Procesal Administrativo II", "Procesal Penal"] },
  { nombre: "Optativa IV", anio: 6, correlativas: [] },
  { nombre: "Tesina", anio: 6, correlativas: ["Ética", "Concursal"] }
];

const malla = document.getElementById("malla");

function cargarMaterias() {
  const estado = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");
  const porAnio = {};
  materias.forEach(m => {
    if (!porAnio[m.anio]) porAnio[m.anio] = [];
    porAnio[m.anio].push(m);
  });

  for (const anio of Object.keys(porAnio).sort((a, b) => a - b)) {
    const col = document.createElement("div");
    col.className = "anio";
    col.innerHTML = `<h2>${niveles[anio]}</h2>`;

    porAnio[anio].forEach(materia => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = materia.nombre;

      const aprobada = estado[materia.nombre];
      if (aprobada) {
        div.classList.add("aprobada");
      } else if (!materia.correlativas.every(c => estado[c])) {
        div.classList.add("bloqueada");
      }

      div.addEventListener("click", () => {
        div.classList.toggle("aprobada");
        estado[materia.nombre] = div.classList.contains("aprobada");
        localStorage.setItem("estadoMaterias", JSON.stringify(estado));
        location.reload();
      });

      col.appendChild(div);
    });

    malla.appendChild(col);
  }
}

cargarMaterias();
