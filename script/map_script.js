
const map = L.map('map').setView([38.5598, 68.7870], 13); // Душанбе

// Добавление слоя
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);