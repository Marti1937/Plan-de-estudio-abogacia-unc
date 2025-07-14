<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Malla Interactiva - Abogacía</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1 class="titulo">Malla Interactiva - Abogacía</h1>
  <div id="malla" class="malla"></div>

  <script>
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
      { nombre: "Derecho Procesal Civil y Comercial", anio: 3, correlativas: ["Derecho Civil I (Parte General)"] },
      { nombre: "Derecho Administrativo", anio: 3, correlativas: ["Derecho Constitucional"] },
      { nombre: "Derecho de Familia y Sucesiones", anio: 3, correlativas: ["Derecho Civil I (Parte General)"] },

      { nombre: "Derecho Civil III (Contratos)", anio: 4, correlativas: ["Derecho Civil II (Obligaciones)"] },
      { nombre: "Derecho del Trabajo y de la Seguridad Social", anio: 4, correlativas: ["Derecho Constitucional"] },
      { nombre: "Derecho Tributario", anio: 4, correlativas: ["Derecho Administrativo"] },
      { nombre: "Filosofía del Derecho", anio: 4, correlativas: ["Introducción al Pensamiento Jurídico"] },
      { nombre: "Derecho Civil IV (Reales)", anio: 4, correlativas: ["Derecho Civil II (Obligaciones)"] },
      { nombre: "Derecho Internacional Privado", anio: 4, correlativas: ["Derecho Civil II (Obligaciones)"] },

      { nombre: "Práctica Profesional Supervisada", anio: 5, correlativas: [
        "Derecho Procesal Civil y Comercial",
        "Derecho Procesal Penal",
        "Derecho Civil III (Contratos)",
        "Derecho del Trabajo y de la Seguridad Social"
      ] },
      { nombre: "Derecho Civil V (Responsabilidad Civil)", anio: 5, correlativas: ["Derecho Civil II (Obligaciones)"] },
      { nombre: "Derecho Comercial I", anio: 5, correlativas: ["Derecho Civil II (Obligaciones)"] },
      { nombre: "Derecho Comercial II", anio: 5, correlativas: ["Derecho Comercial I"] },
      { nombre: "Derecho Civil VI (Derecho del Consumidor y Defensa de la Competencia)", anio: 5, correlativas: ["Derecho Civil III (Contratos)"] },
      { nombre: "Derecho Civil VII (Bioética y Derecho Privado)", anio: 5, correlativas: ["Derecho Civil II (Obligaciones)"] },

      { nombre: "Taller de Tesina", anio: 6, correlativas: ["Filosofía del Derecho"] },
      { nombre: "Optativa I", anio: 6, correlativas: [] },
      { nombre: "Optativa II", anio: 6, correlativas: [] },
      { nombre: "Optativa III", anio: 6, correlativas: [] },
      { nombre: "Tesina", anio: 6, correlativas: ["Taller de Tesina"] }
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
  </script>
</body>
</html>

