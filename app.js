document.write('<script src="app-core.js"><\/script>');

// ENDONUTRI deployment refresh 2026-10-11 02:10
// Ajustes de interfaz solicitados para ENDONUTRI.
document.addEventListener("DOMContentLoaded", () => {
  const comidasNavLink = document.querySelector('a[onclick*="comidas-desayunos"]');
  comidasNavLink?.closest(".nav-group")?.remove();
  document.querySelector('.home-card[onclick*="comidas-desayunos"]')?.remove();
  document.querySelectorAll('[id^="section-comidas-"]').forEach((section) => section.remove());

  document.getElementById("cuestionarioQrCanvas")?.closest(".qr-card")?.remove();
  document.querySelectorAll(".info-box").forEach((box) => {
    if ((box.textContent || "").includes("Instrucciones para el equipo médico")) box.remove();
  });

  const main = document.getElementById("contentArea");
  let ejercicioCasa = document.getElementById("section-ejercicio-casa");
  if (!ejercicioCasa && main) {
    ejercicioCasa = document.createElement("section");
    ejercicioCasa.className = "section";
    ejercicioCasa.id = "section-ejercicio-casa";
    const pasos = document.getElementById("section-ejercicio-pasos");
    if (pasos) main.insertBefore(ejercicioCasa, pasos); else main.appendChild(ejercicioCasa);
  }

  if (ejercicioCasa) {
    const VERSION_HQ = "20261011-0210";
    const paginasRutina = [
      { paso: "DÍA 1", titulo: "Base y control", ayuda: "Empieza aquí", src: `img/rutina-casa/rutina-dia-1.webp?v=${VERSION_HQ}` },
      { paso: "DÍA 2", titulo: "Estabilidad y fuerza funcional", ayuda: "Segundo entrenamiento", src: `img/rutina-casa/rutina-dia-2.webp?v=${VERSION_HQ}` },
      { paso: "DÍA 3", titulo: "Coordinación y progresión", ayuda: "Tercer entrenamiento", src: `img/rutina-casa/rutina-dia-3.webp?v=${VERSION_HQ}` },
      { paso: "COMPLEMENTO DE CORE", titulo: "Abdominales fáciles · Nivel principiante", ayuda: "Añádelo cuando corresponda a tu sesión", src: `img/rutina-casa/abdominales-principiante.webp?v=${VERSION_HQ}` },
      { paso: "PROGRESIÓN DE CORE", titulo: "Abdominales · Principiante a intermedio", ayuda: "Avanza solo cuando controles bien el nivel anterior", src: `img/rutina-casa/abdominales-progresion.webp?v=${VERSION_HQ}` }
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
          <div style="margin-top:14px;padding:14px 16px;border-radius:14px;background:#f7f3e8;border:1px solid #e8dfc8;color:#576158;line-height:1.55;"><strong>Después:</strong> usa “Abdominales fáciles” como bloque complementario. Cuando puedas hacerlo con buena técnica, pasa a “Progresión de abdominales”.</div>
        </div>
        <div class="rutina-casa-pages" style="display:grid;gap:34px;">
          ${paginasRutina.map(({ paso, titulo, ayuda, src }, index) => `
            <article style="margin:0;">
              <div style="display:flex;align-items:flex-start;gap:13px;margin:0 0 12px;padding:0 3px;">
                <div style="min-width:64px;padding:7px 10px;border-radius:999px;background:#0f5138;color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.04em;text-align:center;">${paso}</div>
                <div><h3 style="margin:0;color:#173e31;font-size:clamp(1.15rem,2.5vw,1.45rem);line-height:1.2;">${titulo}</h3><p style="margin:.25rem 0 0;color:#66786d;font-size:.94rem;">${ayuda}</p></div>
              </div>
              <figure style="margin:0;">
                <img
                  src="${src}"
                  alt="${paso}: ${titulo}"
                  loading="${index === 0 ? "eager" : "lazy"}"
                  decoding="async"
                  style="display:block;width:100%;height:auto;margin:0;border-radius:18px;box-shadow:0 12px 36px rgba(16,68,58,.13);background:#f7f3ea;image-rendering:auto;"
                >
              </figure>
            </article>`).join("")}
        </div>
      </div>`;
  }
});