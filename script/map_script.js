
const map = L.map('map', {
    center: [38.5598, 68.7870],
    zoom: 13,
    zoomControl: false // <-- отключает +/-
  });
   
// Добавление слоя
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// filter
const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');
const closeFilter = document.getElementById('closeFilter');

filterToggle.addEventListener('click', () => {
   filterPanel.classList.add('active');
   filterToggle.style.display = 'block'; 
});

closeFilter.addEventListener('click', () => {
  filterPanel.classList.remove('active');
  setTimeout(() => {
    filterToggle.style.display = 'block';
  }, 400);
});

//  filter button
const clearFiltersBtn = document.getElementById('clearFilters');
const applyFiltersBtn = document.getElementById('applyFilters');

const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
const STORAGE_KEY = 'selectedFilters';

// Функция загрузки выбранных фильтров из localStorage
function loadFilters() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const selected = JSON.parse(saved);
  checkboxes.forEach(chk => {
    chk.checked = selected.includes(chk.value);
  });
}

// Функция сохранения выбранных фильтров в localStorage
function saveFilters() {
  const selected = [];
  checkboxes.forEach(chk => {
    if (chk.checked) selected.push(chk.value);
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
}

// Очистить все чекбоксы
function clearFilters() {
  checkboxes.forEach(chk => (chk.checked = false));
}

// Открыть панель и загрузить состояние
filterToggle.addEventListener('click', () => {
  loadFilters();
  filterPanel.classList.add('active');
  filterToggle.style.display = 'none';
});

// Закрыть панель
closeFilter.addEventListener('click', () => {
  filterPanel.classList.remove('active');
  setTimeout(() => {
    filterToggle.style.display = 'block';
  }, 400);
});

// Обработка кнопки Очистить
clearFiltersBtn.addEventListener('click', () => {
  clearFilters();
});

// Обработка кнопки Применить — сохраняем и закрываем
applyFiltersBtn.addEventListener('click', () => {
  saveFilters();
  filterPanel.classList.remove('active');
  setTimeout(() => {
    filterToggle.style.display = 'block';
  }, 400);
});
