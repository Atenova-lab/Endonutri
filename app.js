document.write('<script src="app-core.js"><\/script>');

// ENDONUTRI deployment refresh 2026-10-11 01:43
// Ajustes de interfaz solicitados para ENDONUTRI.
document.addEventListener("DOMContentLoaded", () => {
  // Eliminar por completo la sección "Ideas de Comidas" de la navegación,
  // la portada y sus vistas internas, sin afectar a Planes de Alimentación.
  const comidasNavLink = document.querySelector('a[onclick*="comidas-desayunos"]');
  comidasNavLink?.closest(".nav-group")?.remove();

  document.querySelector('.home-card[onclick*="comidas-desayunos"]')?.remove();

  document
    .querySelectorAll('[id^="section-comidas-"]')
    .forEach((section) => section.remove());

  // En "Rellenar cuestionario previo", quitar el QR del cuestionario.
  document
    .getElementById("cuestionarioQrCanvas")
    ?.closest(".qr-card")
    ?.remove();

  // Quitar la nota interna "Instrucciones para el equipo médico".
  document.querySelectorAll(".info-box").forEach((box) => {
    const text = box.textContent || "";
    if (text.includes("Instrucciones para el equipo médico")) {
      box.remove();
    }
  });

  // EJERCICIO EN CASA
  // Garantiza que la sección exista y presenta la rutina en una secuencia clara.
  const main = document.getElementById("contentArea");
  let ejercicioCasa = document.getElementById("section-ejercicio-casa");

  if (!ejercicioCasa && main) {
    ejercicioCasa = document.createElement("section");
    ejercicioCasa.className = "section";
    ejercicioCasa.id = "section-ejercicio-casa";
    const pasos = document.getElementById("section-ejercicio-pasos");
    if (pasos) main.insertBefore(ejercicioCasa, pasos);
    else main.appendChild(ejercicioCasa);
  }

  if (ejercicioCasa) {
    const paginasRutina = [
      {
        paso: "DÍA 1",
        titulo: "Base y control",
        ayuda: "Empieza aquí",
        src: "img/rutina-casa/rutina-dia-1.webp?v=20261011-0143"
      },
      {
        paso: "DÍA 2",
        titulo: "Estabilidad y fuerza funcional",
        ayuda: "Segundo entrenamiento",
        src: "img/rutina-casa/rutina-dia-2.webp?v=20261011-0143"
      },
      {
        paso: "DÍA 3",
        titulo: "Coordinación y progresión",
        ayuda: "Tercer entrenamiento",
        src: "img/rutina-casa/rutina-dia-3.webp?v=20261011-0143"
      },
      {
        paso: "COMPLEMENTO DE CORE",
        titulo: "Abdominales fáciles · Nivel principiante",
        ayuda: "Añádelo cuando corresponda a tu sesión",
        src: "img/rutina-casa/abdominales-principiante.webp?v=20261011-0143",
        finalBase64: true
      },
      {
        paso: "PROGRESIÓN DE CORE",
        titulo: "Abdominales · Principiante a intermedio",
        ayuda: "Avanza solo cuando controles bien el nivel anterior",
        src: "img/rutina-casa/abdominales-progresion.webp?v=20261011-0143"
      }
    ];

    ejercicioCasa.innerHTML = `
      <div class="section-header">
        <button class="back-btn" onclick="showSection('home')">← Inicio</button>
        <h2>🏠 Ejercicio en casa</h2>
      </div>

      <div style="max-width:780px;margin:0 auto 30px;">
        <div style="padding:26px;margin-bottom:22px;border-radius:20px;background:linear-gradient(135deg,#eef7f1,#fbfdfb);border:1px solid #dce9e0;box-shadow:0 8px 26px rgba(16,68,58,.06);">
          <span class="eyebrow">PLAN DE EJERCICIO EN CASA</span>
          <h3 style="margin:.45rem 0 .75rem;color:#0f5138;font-size:clamp(1.45rem,3vw,2rem);">¿Qué hago cada día?</h3>
          <p style="margin:0 0 18px;line-height:1.65;color:#41554a;">Realiza las sesiones en este orden: <strong>Día 1 → Día 2 → Día 3</strong>. No significa necesariamente lunes, martes y miércoles: son tus tres entrenamientos de la rutina. Después encontrarás un bloque de abdominales y su progresión.</p>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;">
            <div style="padding:14px;border-radius:14px;background:#fff;border:1px solid #dbe9df;"><strong style="display:block;color:#0f5138;">1 · DÍA 1</strong><span style="font-size:.92rem;color:#53665b;">Base y control</span></div>
            <div style="padding:14px;border-radius:14px;background:#fff;border:1px solid #dbe9df;"><strong style="display:block;color:#0f5138;">2 · DÍA 2</strong><span style="font-size:.92rem;color:#53665b;">Estabilidad y fuerza</span></div>
            <div style="padding:14px;border-radius:14px;background:#fff;border:1px solid #dbe9df;"><strong style="display:block;color:#0f5138;">3 · DÍA 3</strong><span style="font-size:.92rem;color:#53665b;">Coordinación y progresión</span></div>
          </div>

          <div style="margin-top:14px;padding:14px 16px;border-radius:14px;background:#f7f3e8;border:1px solid #e8dfc8;color:#576158;line-height:1.55;"><strong>Después:</strong> usa “Abdominales fáciles” como bloque complementario. Cuando puedas hacerlos con buena técnica, pasa a la hoja de “Progresión de abdominales”.</div>
        </div>

        <div class="rutina-casa-pages" style="display:grid;gap:34px;">
          ${paginasRutina.map(({ paso, titulo, ayuda, src, finalBase64 }, index) => `
            <article style="margin:0;">
              <div style="display:flex;align-items:flex-start;gap:13px;margin:0 0 12px;padding:0 3px;">
                <div style="min-width:64px;padding:7px 10px;border-radius:999px;background:#0f5138;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.04em;text-align:center;">${paso}</div>
                <div>
                  <h3 style="margin:0;color:#173e31;font-size:clamp(1.15rem,2.5vw,1.45rem);line-height:1.2;">${titulo}</h3>
                  <p style="margin:.25rem 0 0;color:#66786d;font-size:.94rem;">${ayuda}</p>
                </div>
              </div>
              <figure style="margin:0;">
                <img
                  src="${src}"
                  ${finalBase64 ? 'data-final-abdominales="true"' : ''}
                  alt="${paso}: ${titulo}"
                  loading="${index === 0 ? "eager" : "lazy"}"
                  decoding="async"
                  style="display:block;width:100%;height:auto;margin:0;border-radius:18px;box-shadow:0 12px 36px rgba(16,68,58,.13);background:#f7f3ea;"
                >
              </figure>
            </article>
          `).join("")}
        </div>
      </div>
    `;

    // Carga la última versión aprobada de "Abdominales fáciles · Nivel principiante"
    // desde el archivo de alta calidad subido al repositorio.
    const abdominalesFinal = ejercicioCasa.querySelector('img[data-final-abdominales="true"]');
    if (abdominalesFinal) {
      fetch('_upload/abdominales-principiante-final.b64?v=20261011-0143', { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error('No se pudo cargar la imagen final');
          return response.text();
        })
        .then(base64 => {
          const limpio = base64.trim();
          if (limpio) abdominalesFinal.src = `data:image/webp;base64,${limpio}`;
        })
        .catch(() => {
          // Si fallase la carga, se mantiene la versión binaria anterior como respaldo.
        });
    }
  }
});