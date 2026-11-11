/**
 * =============================================
 *  APP.JS — Lógica principal del portal
 * =============================================
 */

// ---- NAVEGACIÓN ----
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById("section-" + id);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Resalta enlace activo en sidebar
    document.querySelectorAll(".nav-submenu a").forEach(a => a.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-submenu a[onclick*="${id}"]`);
    if (activeLink) activeLink.classList.add("active");
  }
  closeSidebar();

  // Init formulario si es necesario
  if (id === "cuestionario-form") {
    initForm();
  }
}

// ---- SIDEBAR ----
function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ---- GRUPOS COLAPSABLES ----
function toggleGroup(btn) {
  const submenu = btn.nextElementSibling;
  if (!submenu || !submenu.classList.contains("nav-submenu")) return;
  const isOpen = submenu.classList.contains("open");
  // Cierra todos
  document.querySelectorAll(".nav-submenu.open").forEach(m => m.classList.remove("open"));
  document.querySelectorAll(".nav-group-title").forEach(b => b.classList.remove("collapsed"));
  // Abre el clicado si estaba cerrado
  if (!isOpen) {
    submenu.classList.add("open");
  } else {
    btn.classList.add("collapsed");
  }
}

// ---- ACCESO AL ÁREA PROFESIONAL ----
function initProfessionalAreaLink() {
  const nav = document.querySelector(".sidebar-nav");
  if (!nav || document.getElementById("professionalAreaNav")) return;

  const group = document.createElement("div");
  group.className = "nav-group nav-single";
  group.id = "professionalAreaNav";
  group.style.marginTop = "12px";
  group.style.paddingTop = "12px";
  group.style.borderTop = "1px solid var(--gris-borde, #d5e8dc)";

  const button = document.createElement("button");
  button.className = "nav-group-title";
  button.type = "button";
  button.setAttribute("aria-label", "Abrir Área profesional");
  button.style.background = "linear-gradient(135deg, #064e3b, #087f5b)";
  button.style.color = "#fff";
  button.style.borderRadius = "12px";
  button.style.margin = "0 8px";
  button.style.width = "calc(100% - 16px)";
  button.style.boxShadow = "0 8px 22px rgba(6, 78, 59, .16)";
  button.innerHTML = '<span class="nav-icon">🔒</span><span>Área profesional</span><span style="margin-left:auto;color:#e2b943">→</span>';
  button.addEventListener("click", () => {
    window.location.href = "profesionales.html";
  });

  group.appendChild(button);
  nav.appendChild(group);
}

// ---- GUÍA DE MEDICAMENTOS GLP-1 ----
function filterGlpCards(kind, button) {
  document.querySelectorAll(".glp-filter button").forEach(item => {
    item.classList.toggle("active", item === button);
  });
  document.querySelectorAll("#glpMedicationList .glp-card").forEach(card => {
    const visible = kind === "all" || card.dataset.glpKind === kind;
    card.hidden = !visible;
    if (!visible) card.open = false;
  });
}

function calculateGlpBmi() {
  const weight = Number.parseFloat(document.getElementById("glpWeight")?.value);
  const heightCm = Number.parseFloat(document.getElementById("glpHeight")?.value);
  const result = document.getElementById("glpBmiResult");
  if (!result) return;
  if (!Number.isFinite(weight) || !Number.isFinite(heightCm) || weight <= 0 || heightCm <= 0) {
    result.textContent = "Introduce un peso y una altura válidos.";
    return;
  }
  const bmi = weight / ((heightCm / 100) ** 2);
  const threshold = bmi >= 30
    ? "Alcanza el umbral de IMC usado en el visado, pero aún se necesita DM2, terapia combinada, control insuficiente y valoración profesional."
    : "No alcanza el umbral general de IMC ≥30 usado para financiar arGLP-1 antidiabéticos en Andalucía.";
  result.innerHTML = `<strong>IMC: ${bmi.toFixed(1)} kg/m².</strong> ${threshold}`;
}

// ---- FAQ ----
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains("open");
  document.querySelectorAll(".faq-answer.open").forEach(a => a.classList.remove("open"));
  document.querySelectorAll(".faq-question.open").forEach(b => b.classList.remove("open"));
  if (!isOpen) {
    answer.classList.add("open");
    btn.classList.add("open");
  }
  btn.setAttribute("aria-expanded", !isOpen);
}

// ---- PIRÁMIDE DE BUENOS HÁBITOS ----
function toggleHabitLevel(panelId, btn) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const willOpen = !panel.classList.contains("open");

  document.querySelectorAll(".habit-panel.open").forEach(item => item.classList.remove("open"));
  document.querySelectorAll(".habit-level.active").forEach(item => {
    item.classList.remove("active");
    item.setAttribute("aria-expanded", "false");
  });

  if (willOpen) {
    panel.classList.add("open");
    btn.classList.add("active");
    btn.setAttribute("aria-expanded", "true");
    setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120);
  }
}

// ---- LIGHTBOX ----
function openLightbox(src, alt) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  img.src = src;
  img.alt = alt || "";
  lb.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

// ---- RUEDA INTERACTIVA: FACTORES DE LA OBESIDAD ----
const OBESITY_FACTORS = {
  biology: {
    icon: "🧬",
    title: "Biología y genética",
    text: "Los genes influyen en el apetito, la saciedad, la distribución de la grasa y la respuesta del cuerpo al entorno. Predisposición no significa destino, pero explica por qué el mismo ambiente no afecta a todas las personas igual.",
    advice: "Evita compararte. Trabaja con objetivos ajustados a tu historia y pide valoración profesional si existe obesidad de inicio muy temprano, hambre extrema o antecedentes familiares marcados."
  },
  brain: {
    icon: "🧠",
    title: "Hambre, saciedad y metabolismo",
    text: "El cerebro integra señales del intestino, el tejido adiposo y otros órganos para regular hambre, saciedad y gasto energético. Tras perder peso puede aumentar el hambre y disminuir el gasto: es una adaptación biológica, no un fallo personal.",
    advice: "Prioriza comidas saciantes con proteína, fibra y alimentos poco procesados; evita restricciones extremas y busca apoyo sanitario si el hambre dificulta mantener los cambios."
  },
  food: {
    icon: "🍽️",
    title: "Alimentación y entorno alimentario",
    text: "La disponibilidad, el precio, el tamaño de las raciones, la publicidad y la alta palatabilidad de algunos productos influyen en cuánto y cómo comemos, muchas veces sin una decisión plenamente consciente.",
    advice: "Haz que la opción cotidiana sea fácil: planifica algunas comidas, deja alimentos saciantes a la vista, compra con lista y reserva los productos más densos en energía para un consumo consciente, sin prohibiciones."
  },
  movement: {
    icon: "🚶",
    title: "Movimiento diario y sedentarismo",
    text: "No solo cuenta el gimnasio. El trabajo, el transporte, el dolor, la discapacidad y el tiempo sentado modifican el gasto energético y la salud cardiometabólica. La inactividad también puede ser consecuencia, no solo causa, de la obesidad.",
    advice: "Empieza desde tu nivel: pausas breves al estar sentado, caminar más y fuerza dos días por semana. Si hay dolor o limitación, adapta el ejercicio con un profesional."
  },
  sleep: {
    icon: "🌙",
    title: "Sueño y ritmos circadianos",
    text: "Dormir poco o mal puede aumentar el apetito, reducir la saciedad, empeorar la regulación de la glucosa y dejar menos energía para moverse. Los turnos y la apnea del sueño también tienen un papel importante.",
    advice: "Mantén horarios lo más regulares posible, reduce cafeína y pantallas al final del día y consulta si roncas, haces pausas respiratorias o tienes mucha somnolencia diurna."
  },
  mind: {
    icon: "💭",
    title: "Estrés, emociones y salud mental",
    text: "El estrés mantenido, la ansiedad, la depresión, el trauma o comer para regular emociones pueden alterar el sueño, la actividad y la relación con la comida. El estigma por el peso añade otra carga y puede alejar de la atención sanitaria.",
    advice: "Identifica situaciones que disparan el picoteo, practica alternativas breves de regulación emocional y solicita apoyo psicológico cuando la comida sea la principal forma de afrontar el malestar."
  },
  medical: {
    icon: "💊",
    title: "Enfermedades, hormonas y medicación",
    text: "Algunas enfermedades y medicamentos pueden favorecer el aumento de peso o dificultar su pérdida. Entre ellos se encuentran determinados corticoides, antipsicóticos, antidepresivos, antiepilépticos y tratamientos para la diabetes.",
    advice: "No suspendas ningún fármaco por tu cuenta. Coméntalo con tu profesional para revisar causas, alternativas y objetivos. Las alteraciones hormonales existen, pero explican solo una parte de los casos."
  },
  social: {
    icon: "🏘️",
    title: "Entorno social y condiciones de vida",
    text: "Los ingresos, la educación, los horarios laborales, los cuidados, el barrio y el acceso a alimentos saludables, espacios seguros y atención sanitaria crean oportunidades muy diferentes para cuidar la salud.",
    advice: "Elige cambios compatibles con tus recursos reales. Busca apoyos familiares y comunitarios y plantea al equipo sanitario las barreras económicas, de tiempo, movilidad o cuidados para adaptar el plan."
  }
};

function initObesityWheel() {
  const wheel = document.getElementById("obesityWheel");
  const detail = document.getElementById("obesityFactorDetail");
  if (!wheel || !detail || wheel.dataset.ready === "true") return;
  wheel.dataset.ready = "true";

  wheel.querySelectorAll(".wheel-factor").forEach(button => {
    button.addEventListener("click", () => {
      const factor = OBESITY_FACTORS[button.dataset.factor];
      if (!factor) return;
      wheel.querySelectorAll(".wheel-factor").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      detail.classList.remove("factor-enter");
      void detail.offsetWidth;
      document.getElementById("factorDetailIcon").textContent = factor.icon;
      document.getElementById("factorDetailTitle").textContent = factor.title;
      document.getElementById("factorDetailText").textContent = factor.text;
      document.getElementById("factorDetailAdvice").textContent = factor.advice;
      detail.classList.add("factor-enter");
    });
  });
}

// Cerrar lightbox con ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
    closeSidebar();
  }
});

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  // Carga contenidos
  if (typeof cargarContenidos === "function") cargarContenidos();

  initObesityWheel();
  initProfessionalAreaLink();

  // Abrir directamente una sección educativa desde las guías públicas
  const initialSection = decodeURIComponent(window.location.hash.slice(1));
  if (initialSection && document.getElementById("section-" + initialSection)) {
    showSection(initialSection);
  } else {
    showSection("home");
  }
  window.addEventListener("hashchange", () => {
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (sectionId && document.getElementById("section-" + sectionId)) showSection(sectionId);
  });

  // En desktop, abrir el primer grupo del sidebar
  if (window.innerWidth >= 768) {
    const firstSubmenu = document.querySelector(".nav-submenu");
    if (firstSubmenu) firstSubmenu.classList.add("open");
  }
});
