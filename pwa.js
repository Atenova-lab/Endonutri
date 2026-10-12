/* Endonutri · Instalación en el dispositivo y avisos de conexión/actualización. */
(() => {
  'use strict';
  let installPrompt = null, registration = null, waitingWorker = null;
  let reloadForUpdate = false;
  const installed = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const base = new URL('./', document.baseURI);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    document.querySelectorAll('[data-endo-install], .endo-install-card').forEach(el => { el.hidden = true; });
    document.getElementById('endo-install-dialog')?.close();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector('#section-home .vn-shell') || document.getElementById('section-home');
    if (!home) return;
    const card = document.createElement('aside');
    card.className = 'endo-install-card';
    card.setAttribute('aria-label', 'Instalar Endonutri en tu dispositivo');
    card.innerHTML = '<img class="endo-install-icon" src="icons/icon-192.png" alt="" width="60" height="60">' +
      '<div class="endo-install-copy"><h2>Endonutri, contigo</h2><p>Guárdala gratis en tu móvil y ábrela desde su icono.</p></div>' +
      '<button type="button" class="endo-install-button" data-endo-install>Instalar app <span aria-hidden="true">↓</span></button>';
    const intro = home.querySelector('.vn-intro');
    if (intro) intro.after(card); else home.prepend(card);
    const footer = document.querySelector('.vn-bottom');
    if (footer) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'endo-install-footer';
      button.dataset.endoInstall = ''; button.textContent = 'Instalar Endonutri en mi móvil';
      footer.prepend(button);
    }
    const status = document.createElement('p');
    status.className = 'endo-pwa-status'; status.setAttribute('role', 'status'); status.hidden = true;
    status.textContent = 'Sin conexión: estás viendo contenido guardado. Los vídeos, enlaces externos y el área profesional necesitan internet. Conéctate para consultar las últimas actualizaciones.';
    (document.querySelector('.vn-header-shell') || home).append(status);
    const update = document.createElement('div');
    update.className = 'endo-update'; update.hidden = true; update.setAttribute('role', 'status');
    update.innerHTML = '<span>Hay una nueva versión de Endonutri.</span><button type="button">Actualizar</button>';
    document.body.append(update);
    update.querySelector('button').addEventListener('click', () => {
      if (!waitingWorker) return;
      reloadForUpdate = true;
      update.querySelector('button').disabled = true;
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    });
    const dialog = document.createElement('dialog');
    dialog.id = 'endo-install-dialog'; dialog.className = 'endo-install-dialog';
    dialog.setAttribute('aria-labelledby', 'endo-install-title');
    dialog.innerHTML = '<button type="button" class="endo-dialog-close" aria-label="Cerrar instrucciones">×</button>' +
      '<h2 id="endo-install-title">Tu app de Endonutri</h2><p>Elige tu dispositivo y sigue estos pasos:</p>' +
      '<div class="endo-device-options" role="group" aria-label="Tu dispositivo">' +
      '<button type="button" data-endo-device="android" aria-pressed="false">Android</button>' +
      '<button type="button" data-endo-device="ios" aria-pressed="false">iPhone</button>' +
      '<button type="button" data-endo-device="desktop" aria-pressed="false">Ordenador</button></div>' +
      '<div class="endo-device-guide" data-endo-guide="android" hidden><ol><li>Abre Endonutri en <strong>Chrome</strong> o en el navegador de Samsung.</li><li>Toca el menú <strong>⋮</strong> (tres puntos).</li><li>Elige <strong>Instalar aplicación</strong> o <strong>Añadir a pantalla de inicio</strong> y confirma.</li></ol></div>' +
      '<div class="endo-device-guide" data-endo-guide="ios" hidden><ol><li>Abre Endonutri en <strong>Safari</strong>.</li><li>Toca <strong>Compartir</strong>: el cuadrado con una flecha hacia arriba. Puede estar dentro del menú del navegador.</li><li>Elige <strong>Añadir a pantalla de inicio</strong>, activa <strong>Abrir como app web</strong> si aparece y toca <strong>Añadir</strong>.</li></ol></div>' +
      '<div class="endo-device-guide" data-endo-guide="desktop" hidden><ol><li>Abre Endonutri en <strong>Chrome</strong> o <strong>Edge</strong>.</li><li>Busca el icono de instalación junto a la dirección o la opción de instalar en el menú del navegador.</li><li>Confirma para abrir Endonutri en su propia ventana.</li></ol></div>' +
      '<p class="endo-browser-note">Si abriste este enlace dentro de WhatsApp o Instagram, utiliza su opción «Abrir en el navegador».</p>' +
      '<p class="endo-install-note">Es gratis y no necesitas una cuenta para los recursos de pacientes. Tras abrirla con conexión, podrás consultar el contenido básico guardado. Los documentos e imágenes se guardan al abrirlos; los vídeos y el área profesional necesitan internet.</p>';
    document.body.append(dialog);
    const selectDevice = device => {
      dialog.querySelectorAll('[data-endo-device]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.endoDevice === device)));
      dialog.querySelectorAll('[data-endo-guide]').forEach(guide => { guide.hidden = guide.dataset.endoGuide !== device; });
    };
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    selectDevice(isIOS ? 'ios' : /Android/.test(navigator.userAgent) ? 'android' : 'desktop');
    dialog.querySelector('.endo-dialog-close').addEventListener('click', () => dialog.close());
    dialog.querySelectorAll('[data-endo-device]').forEach(button => button.addEventListener('click', () => selectDevice(button.dataset.endoDevice)));
    document.querySelectorAll('[data-endo-install]').forEach(button => {
      button.hidden = installed();
      button.addEventListener('click', async () => {
        if (!installPrompt) { dialog.showModal(); return; }
        const prompt = installPrompt; installPrompt = null;
        try { await prompt.prompt(); await prompt.userChoice; }
        catch (_) { dialog.showModal(); }
      });
    });
    card.hidden = installed();
    const connectionState = () => { status.hidden = navigator.onLine; };
    connectionState();
    window.addEventListener('online', connectionState);
    window.addEventListener('offline', connectionState);
    // No se solicitan notificaciones ni permisos para instalar.
    if ('serviceWorker' in navigator && window.isSecureContext) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloadForUpdate) window.location.reload();
      });
      const announceUpdate = worker => {
        if (!navigator.serviceWorker.controller || !worker) return;
        waitingWorker = worker; update.hidden = false;
      };
      navigator.serviceWorker.register(new URL('sw.js', base).href, { scope: base.pathname, updateViaCache: 'none' })
        .then(result => {
          registration = result;
          announceUpdate(result.waiting);
          result.addEventListener('updatefound', () => {
            const worker = result.installing;
            worker?.addEventListener('statechange', () => {
              if (worker.state === 'installed') announceUpdate(result.waiting);
            });
          });
          result.update().catch(() => {});
        }).catch(() => {
          dialog.querySelector('.endo-install-note').textContent = 'Es gratis. Si el navegador no permite guardar contenido sin conexión, podrás seguir utilizándola con internet.';
        });
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && navigator.onLine) registration?.update().catch(() => {});
      });
    }
  });
})();
