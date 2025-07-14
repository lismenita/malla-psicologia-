
const ciclos = {
  "Ciclo 1": [
    { id: "realidad", nombre: "Realidad nacional", requisitos: [] },
    { id: "biopsi", nombre: "Biopsicología", requisitos: [] },
    { id: "psigral", nombre: "Psicología General", requisitos: [] },
    { id: "comp", nombre: "Seminario Taller de Competencias", requisitos: [] },
    { id: "info", nombre: "Informática", requisitos: [] },
  ],
  "Ciclo 2": [
    { id: "const", nombre: "Estudio de la constitución", requisitos: [] },
    { id: "neuro", nombre: "Neuro-Psicología", requisitos: ["biopsi"] },
    { id: "des1", nombre: "Psicología del Desarrollo 1", requisitos: ["psigral"] },
    { id: "psiest", nombre: "Psico-Estadística", requisitos: [] },
    { id: "exp", nombre: "Expresión Oral y Escrita", requisitos: [] },
  ],
  "Ciclo 3": [
    { id: "filo", nombre: "Filosofía", requisitos: [] },
    { id: "fisio", nombre: "Psico-Fisiología", requisitos: ["neuro"] },
    { id: "des2", nombre: "Psicología del Desarrollo 2", requisitos: ["des1"] },
    { id: "ing1", nombre: "Inglés 1", requisitos: [] },
    { id: "pers", nombre: "Psicología de la Personalidad", requisitos: ["des1"] },
  ],
  "Ciclo 4": [
    { id: "etica", nombre: "Ética", requisitos: [] },
    { id: "psip1", nombre: "Psico-Patología 1", requisitos: ["fisio"] },
    { id: "edu", nombre: "Psicología Educativa", requisitos: ["des2"] },
    { id: "ing2", nombre: "Inglés 2", requisitos: ["ing1"] },
    { id: "neurocli", nombre: "Neuro-Psicología Clínica", requisitos: ["fisio", "psip1"] },
  ],
  "Ciclo 5": [
    { id: "desind", nombre: "Desarrollo individual", requisitos: [] },
    { id: "psip2", nombre: "Psico-Patología 2", requisitos: ["psip1"] },
    { id: "aprendizaje", nombre: "Psicología del Aprendizaje", requisitos: ["edu"] },
    { id: "exp2", nombre: "Psicología Experimental", requisitos: ["edu"] },
    { id: "metinv", nombre: "Métodos de Investigación", requisitos: ["psiest"] },
  ],
  "Ciclo 6": [
    { id: "social", nombre: "Psicología Social", requisitos: ["metinv"] },
    { id: "evalinf", nombre: "Mét. Evaluación Infantil", requisitos: ["psip2"] },
    { id: "voc", nombre: "Orientación Vocacional", requisitos: ["aprendizaje"] },
    { id: "clinica", nombre: "Psicología Clínica", requisitos: ["psip2"] },
    { id: "forense", nombre: "Psicología Forense", requisitos: ["psip2"] },
  ],
  "Ciclo 7": [
    { id: "comuni", nombre: "Psicología Comunitaria", requisitos: ["social"] },
    { id: "evaladult", nombre: "Mét. Eval. Adultos", requisitos: ["evalinf"] },
    { id: "tratainf", nombre: "Trat. Psicológico Infantil", requisitos: ["evalinf"] },
    { id: "geronto", nombre: "Psicogerontología", requisitos: ["clinica"] },
  ],
  "Ciclo 8": [
    { id: "patosoc", nombre: "Patología Social", requisitos: ["comuni"] },
    { id: "rehab", nombre: "Rehabilitación Integral", requisitos: ["geronto"] },
    { id: "tratadult", nombre: "Trat. Psicológico Adulto", requisitos: ["tratainf"] },
    { id: "laboral", nombre: "Psicología Laboral", requisitos: ["evaladult"] },
  ],
  "Ciclo 9": [
    { id: "formproy", nombre: "Formulación y Eval. Proyectos", requisitos: ["patosoc"] },
    { id: "org1", nombre: "Psicología Organizacional 1", requisitos: ["laboral"] },
    { id: "pract1", nombre: "Prácticas Psicológicas 1", requisitos: ["tratadult"] },
  ],
  "Ciclo 10": [
    { id: "seminv", nombre: "Seminario de Investigación", requisitos: ["formproy"] },
    { id: "org2", nombre: "Psicología Organizacional 2", requisitos: ["org1"] },
    { id: "pract2", nombre: "Prácticas Psicológicas 2", requisitos: ["pract1"] },
  ]
};

function crearMalla() {
  const contenedor = document.getElementById("contenedor-ciclos");
  for (const ciclo in ciclos) {
    const section = document.createElement("section");
    section.classList.add("ciclo");

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    section.appendChild(titulo);

    const grid = document.createElement("div");
    grid.classList.add("grid");

    ciclos[ciclo].forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.id = ramo.id;
      div.textContent = ramo.nombre;
      if (ramo.requisitos.length === 0) {
        div.classList.add("activo");
      }
      div.addEventListener("click", () => aprobarRamo(ramo.id));
      grid.appendChild(div);
    });

    section.appendChild(grid);
    contenedor.appendChild(section);
  }
}

function aprobarRamo(id) {
  const elem = document.getElementById(id);
  if (!elem.classList.contains("activo") || elem.classList.contains("aprobado")) return;
  elem.classList.add("aprobado");

  for (const ciclo in ciclos) {
    ciclos[ciclo].forEach(ramo => {
      if (ramo.requisitos.includes(id)) {
        const requisitosCumplidos = ramo.requisitos.every(reqId =>
          document.getElementById(reqId).classList.contains("aprobado")
        );
        if (requisitosCumplidos) {
          document.getElementById(ramo.id).classList.add("activo");
        }
      }
    });
  }
}

crearMalla();
