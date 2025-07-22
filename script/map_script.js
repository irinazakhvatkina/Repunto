const map = L.map('map', {
  center: [38.5598, 68.7870],
  zoom: 13,
  zoomControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const recyclingPoints = [
  {
      name: 'Пункт приема "ЭкоЦентр"',
      location: [38.5650, 68.7900],
      type: ['plastic', 'paper', 'metal'],
      address: 'Улица Мира, 15',
      description: 'Принимаем пластик, макулатуру и металл.',
      details: 'Время работы: 9:00-18:00. Пластик: 5 сомони/кг, Макулатура: 2 сомони/кг, Металл: 10 сомони/кг.',
      photos: [
        '../Assets/point/urno.jpg' // Изменено
      ],
      contacts: {
          phone: '+992 93 123 4567',
          website: 'https://ecocenter.example.com',
          social: 'https://instagram.com/ecocenter'
      }
  },
  {
      name: 'Пункт "Зеленый Город"',
      location: [38.5500, 68.7800],
      type: ['plastic'],
      address: 'Проспект Рудаки, 120',
      description: 'Только пластик. Удобный заезд.',
      details: 'Работаем ежедневно с 8:00 до 17:00. Пластик: 4.5 сомони/кг.',
      photos: [
        '../Assets/point/beta.jpg'
      ],
      contacts: {
          phone: '+992 94 765 4321'
      }
  },
  {
      name: 'Металлоприемка "Сталь"',
      location: [38.5700, 68.7750],
      type: ['metal'],
      address: 'Улица Исмоили Сомони, 5',
      description: 'Прием черных и цветных металлов.',
      details: 'Круглосуточно. Металл: от 8 до 15 сомони/кг в зависимости от типа.',
      photos: ['../Assets/point/partov.jpg'],
      contacts: {
          phone: '+992 90 987 6543'
      }
  },
  {
      name: 'Бумажный Сбор',
      location: [38.5450, 68.7950],
      type: ['paper'],
      address: 'Улица Айнӣ, 8',
      description: 'Принимаем картон, газеты, книги.',
      details: 'По будням с 10:00 до 16:00. Макулатура: 2.5 сомони/кг.',
      photos: [
          '../Assets/point/partov.jpg',
          '../Assets/point/urno.jpg',
          '../Assets/point/beta.jpg'
      ],
      contacts: {
          phone: '+992 91 111 2233',
          website: 'https://paper-sbor.example.com'
      }
  }
];

const markers = L.layerGroup().addTo(map);

function addMarkers(points) {
    markers.clearLayers();

    points.forEach(point => {
        const marker = L.marker(point.location).addTo(markers);

        let popupContent = `
            <div class="popup-tabs">
                <div class="tab-buttons">
                    <button class="tab-button active" data-tab="info">Информация</button>
                    <button class="tab-button" data-tab="photo">Фото</button>
                    <button class="tab-button" data-tab="contact">Контакты</button>
                </div>
                <div class="tab-content">
                    <div id="info-tab-${marker._leaflet_id}" class="tab-pane active">
                        <p><strong>Адрес:</strong> ${point.address}</p>
                        <p><strong>Принимает:</strong> ${point.type.map(t => {
                            if (t === 'metal') return 'Металл';
                            if (t === 'plastic') return 'Пластик';
                            if (t === 'paper') return 'Макулатура';
                            return t;
                        }).join(', ')}</p>
                        <p>${point.description}</p>
                        <p>${point.details || 'Дополнительная информация отсутствует.'}</p>
                    </div>
                    <div id="photo-tab-${marker._leaflet_id}" class="tab-pane">
                        ${generatePhotoContent(point.photos, marker._leaflet_id)}
                    </div>
                    <div id="contact-tab-${marker._leaflet_id}" class="tab-pane">
                        ${generateContactContent(point.contacts)}
                    </div>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 300
        });

        marker.on('popupopen', function() {
            const popupElement = this.getPopup().getElement();

            if (typeof this._currentSlideIndex === 'undefined') {
                this._currentSlideIndex = 0;
            }

            const tabButtons = popupElement.querySelectorAll('.tab-button');
            const tabPanes = popupElement.querySelectorAll('.tab-pane');

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));

                    this.classList.add('active');
                    const targetTab = this.dataset.tab;
                    popupElement.querySelector(`#${targetTab}-tab-${marker._leaflet_id}`).classList.add('active');

                    if (targetTab === 'photo') {
                        showSlide(marker._currentSlideIndex, marker._leaflet_id, popupElement);
                    }
                });
            });

            if (point.photos && point.photos.length > 0) {
                const prevButton = popupElement.querySelector(`#prev-photo-${marker._leaflet_id}`);
                const nextButton = popupElement.querySelector(`#next-photo-${marker._leaflet_id}`);

                if (prevButton) {
                    prevButton.onclick = () => plusSlides(-1, marker._leaflet_id, popupElement);
                }
                if (nextButton) {
                    nextButton.onclick = () => plusSlides(1, marker._leaflet_id, popupElement);
                }
            }
            const activeTabButton = popupElement.querySelector('.tab-button.active');
            if (activeTabButton && activeTabButton.dataset.tab === 'photo') {
                 showSlide(marker._currentSlideIndex, marker._leaflet_id, popupElement);
            }
        });
    });
}

function generatePhotoContent(photos, markerId) {
    if (!photos || photos.length === 0) {
        return '<p>Фотографии не загружены.</p>';
    }

    if (photos.length === 1) {
        return `<img src="${photos[0]}" alt="Фото пункта"  class="single-photo">`;
    }

    let slidesHtml = photos.map((photo, index) => `
        <div class="mySlides fade">
            <img src="${photo}" alt="Фото пункта ${index + 1}">
        </div>
    `).join('');

    return `
        <div class="slideshow-container">
            ${slidesHtml}
            <a class="prev" id="prev-photo-${markerId}">&#10094;</a>
            <a class="next" id="next-photo-${markerId}">&#10095;</a>
        </div>
    `;
}

function generateContactContent(contacts) {
    if (!contacts || (Object.keys(contacts).length === 0)) {
        return '<p>Контактная информация отсутствует.</p>';
    }

    let contactHtml = '';
    if (contacts.phone) {
        contactHtml += `<p><strong>Телефон:</strong> <a href="tel:${contacts.phone}">${contacts.phone}</a></p>`;
    }
    if (contacts.website) {
        contactHtml += `<p><strong>Сайт:</strong> <a href="${contacts.website}" target="_blank">${contacts.website}</a></p>`;
    }
    if (contacts.social) {
        contactHtml += `<p><strong>Соцсеть:</strong> <a href="${contacts.social}" target="_blank">${contacts.social}</a></p>`;
    }
    return contactHtml;
}

function plusSlides(n, markerId, popupElement) {
    const marker = markers.getLayer(markerId);
    if (!marker || typeof marker._currentSlideIndex === 'undefined') {
        return;
    }

    const slides = popupElement.querySelectorAll(`#photo-tab-${markerId} .mySlides`);
    if (slides.length === 0) return;

    marker._currentSlideIndex += n;
    if (marker._currentSlideIndex >= slides.length) {
        marker._currentSlideIndex = 0;
    }
    if (marker._currentSlideIndex < 0) {
        marker._currentSlideIndex = slides.length - 1;
    }
    showSlide(marker._currentSlideIndex, markerId, popupElement);
}

function showSlide(n, markerId, popupElement) {
    const slides = popupElement.querySelectorAll(`#photo-tab-${markerId} .mySlides`);
    slides.forEach(slide => slide.style.display = 'none');
    if (slides[n]) {
        slides[n].style.display = 'block';
    }
}

const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');
const closeFilter = document.getElementById('closeFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const applyFiltersBtn = document.getElementById('applyFilters');
const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
const STORAGE_KEY = 'selectedFilters';

function loadFilters() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const selected = JSON.parse(saved);
  checkboxes.forEach(chk => {
      chk.checked = selected.includes(chk.value);
  });
}

function saveFilters() {
  const selected = [];
  checkboxes.forEach(chk => {
      if (chk.checked) selected.push(chk.value);
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
}

function clearFilters() {
  checkboxes.forEach(chk => (chk.checked = false));
}

filterToggle.addEventListener('click', () => {
  loadFilters();
  filterPanel.classList.add('active');
  filterToggle.style.display = 'none';
});

closeFilter.addEventListener('click', () => {
  filterPanel.classList.remove('active');
  setTimeout(() => {
      filterToggle.style.display = 'block';
  }, 400);
});

clearFiltersBtn.addEventListener('click', () => {
  clearFilters();
  localStorage.removeItem(STORAGE_KEY);
  addMarkers(recyclingPoints);
});

applyFiltersBtn.addEventListener('click', () => {
  saveFilters();

  const selectedFilters = [];
  checkboxes.forEach(chk => {
      if (chk.checked) selectedFilters.push(chk.value);
  });

  let filteredPoints = [];
  if (selectedFilters.length === 0) {
      filteredPoints = recyclingPoints;
  } else {
      filteredPoints = recyclingPoints.filter(point =>
          selectedFilters.some(filter => point.type.includes(filter))
      );
  }

  addMarkers(filteredPoints);

  filterPanel.classList.remove('active');
  setTimeout(() => {
      filterToggle.style.display = 'block';
  }, 400);
});

document.addEventListener('DOMContentLoaded', () => {
  loadFilters();
  const selectedFiltersOnLoad = [];
  checkboxes.forEach(chk => {
      if (chk.checked) selectedFiltersOnLoad.push(chk.value);
  });

  let initialFilteredPoints = [];
  if (selectedFiltersOnLoad.length === 0) {
      initialFilteredPoints = recyclingPoints;
  } else {
      initialFilteredPoints = recyclingPoints.filter(point =>
          selectedFiltersOnLoad.some(filter => point.type.includes(filter))
      );
  }
  addMarkers(initialFilteredPoints);
});
