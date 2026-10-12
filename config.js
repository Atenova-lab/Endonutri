/**
 * =============================================
 *  ARCHIVO DE CONFIGURACIÓN
 *  Edita este archivo para personalizar el portal
 * =============================================
 */
const CONFIG = {
  URL_WEB: "https://atenova-lab.github.io/Endonutri/",
  URL_CUESTIONARIO: "",
  EMAIL_DESTINO: "",
  CONTACTO: { telefono:"", telefono_ext:"", email:"nutri.bea.md@gmail.com", horario:"", direccion:"", whatsapp:"", google_maps_url:"" }
};

// Módulo educativo PAPEF. El parámetro de versión evita que GitHub Pages use una copia antigua.
const papefCss=document.createElement('link'); papefCss.rel='stylesheet'; papefCss.href='papef.css?v=20260907b'; document.head.appendChild(papefCss);
const papefScript=document.createElement('script'); papefScript.src='papef.js?v=20260907b'; papefScript.defer=true; document.head.appendChild(papefScript);