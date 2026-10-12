/* Composición en el navegador con las fotografías generadas: no se envían elecciones fuera del dispositivo. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EndonutriGamesImages = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const cache = new Map();
  function load(url) {
    if (!cache.has(url)) cache.set(url, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => { cache.delete(url); reject(new Error('No se ha podido cargar la preparación')); };
      image.src = url;
    }));
    return cache.get(url);
  }
  async function compose(choices, foods, env = { load, canvas: () => document.createElement('canvas') }) {
    const selected = choices.map(id => foods.find(item => item.id === id));
    if (selected.length !== 4 || selected.some(item => !item?.atlas)) throw new Error('El plato necesita cuatro preparaciones');
    const photos = await Promise.all(selected.map(item => env.load(item.atlas)));
    const canvas = env.canvas(); canvas.width = 720; canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se ha podido dibujar el plato');
    ctx.fillStyle = '#eef4e8'; ctx.fillRect(0, 0, 720, 720);
    ctx.shadowColor = '#164d3b25'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
    ctx.beginPath(); ctx.arc(360, 360, 316, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.beginPath(); ctx.arc(360, 360, 299, 0, Math.PI * 2); ctx.strokeStyle = '#e2e9df'; ctx.lineWidth = 3; ctx.stroke();
    // Positions match the interactive plate: two vegetable quarters on the left.
    const positions = [[125,125],[125,365],[365,125],[365,365]];
    selected.forEach((item, index) => {
      const image = photos[index], cellW = image.naturalWidth / 4, cellH = image.naturalHeight / 4;
      ctx.drawImage(image, (item.tile % 4) * cellW, Math.floor(item.tile / 4) * cellH, cellW, cellH, positions[index][0], positions[index][1], 230, 230);
    });
    return canvas.toDataURL('image/png');
  }
  return { compose };
});
