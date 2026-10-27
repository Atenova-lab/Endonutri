/**
 * =============================================
 *  QR.JS — Generador de códigos QR
 * =============================================
 *
 *  Los QR se generan automáticamente a partir
 *  de las URLs configuradas en js/config.js
 *
 *  Para cambiar una URL:
 *  1. Edita js/config.js
 *  2. El QR se regenera al recargar la página
 */

function generarQR(canvasId, url, size) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !url) return;

  try {
    // Usa la librería qrcode.js si está disponible
    if (typeof QRCode !== "undefined") {
      // Limpia el contenedor
      const container = canvas.parentElement;
      container.innerHTML = "";
      new QRCode(container, {
        text: url,
        width: size || 110,
        height: size || 110,
        colorDark: "#064e3b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  } catch (e) {
    console.warn("QR no disponible:", e);
    // Fallback: muestra URL como texto
    canvas.parentElement.innerHTML = `
      <div style="
        font-size:0.65rem;
        word-break:break-all;
        color:#064e3b;
        text-align:center;
        padding:8px;
        border:2px dashed #56bd86;
        border-radius:8px;
        max-width:110px;
      ">${url}</div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG === "undefined") return;

  // QR de la web principal
  if (CONFIG.URL_WEB) {
    const urlLabel = document.getElementById("qrUrlLabel");
    if (urlLabel) {
      urlLabel.textContent = CONFIG.URL_WEB;
      urlLabel.href = CONFIG.URL_WEB;
    }
    const qrLink = document.getElementById('mainQrLink');
    if (qrLink) qrLink.href = CONFIG.URL_WEB;
    const share = document.getElementById('shareEndonutri');
    const status = document.getElementById('shareEndonutriStatus');
    if (share && status) share.addEventListener('click', async () => {
      share.disabled = true;
      status.textContent = '';
      const copyFallback = () => {
        const field = document.createElement('textarea');
        field.value = CONFIG.URL_WEB;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;pointer-events:none';
        document.body.append(field);
        try {
          field.focus({ preventScroll: true });
          field.select();
          field.setSelectionRange(0, field.value.length);
          return document.execCommand('copy');
        } finally {
          field.remove();
          share.focus({ preventScroll: true });
        }
      };
      try {
        let copied = false;
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(CONFIG.URL_WEB);
            copied = true;
          } catch (_) { /* Intenta la copia compatible con navegadores antiguos. */ }
        }
        if (!copied) copied = copyFallback();
        status.textContent = copied ? 'Enlace copiado' : 'No se ha podido copiar. Mantén pulsado el enlace para copiarlo.';
      } catch (_) {
        status.textContent = 'No se ha podido copiar. Mantén pulsado el enlace para copiarlo.';
      } finally {
        share.disabled = false;
      }
    });
  }

  // QR del cuestionario
  if (CONFIG.URL_CUESTIONARIO) {
    generarQR("cuestionarioQrCanvas", CONFIG.URL_CUESTIONARIO, 110);
  }
});
