/* Abrir y enfocar fichas desde su índice, sin datos clínicos del usuario. */
document.querySelectorAll('[data-db-open]').forEach(link => {
  link.addEventListener('click', event => {
    const resource = document.getElementById('db-' + link.dataset.dbOpen);
    if (!resource) return;
    event.preventDefault();
    resource.open = true;
    resource.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    resource.querySelector('summary').focus({ preventScroll: true });
  });
});
