// Загрузка статей из JSON и отображение их на странице
fetch('articles.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('articlesContainer');
    if (!container) {
      console.error("Элемент #articlesContainer не найден");
      return;
    }

    data.forEach(article => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="blog-image">
        <h3 class="blog-title">${article.title}</h3>
        <p class="blog-description">${article.summary}</p>
        <p class="blog-date">${new Date(article.date).toLocaleDateString('ru-RU')}</p>
        <a href="article.html?id=${article.id}" class="read-more-btn">Читать далее &rarr;</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Ошибка загрузки статей:', error);
    document.getElementById('articlesContainer').innerHTML = '<p>Ошибка загрузки статей.</p>';
  });

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      // You might want to save the preference in localStorage
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
});

// article filter action
let allArticles = [];

document.addEventListener('DOMContentLoaded', () => {
  const articlesContainer = document.getElementById('articlesContainer');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const themeToggle = document.getElementById('theme-toggle');

  fetch('articles.json')
    .then(response => response.json())
    .then(data => {
      allArticles = data;
      displayArticles(allArticles);
    })
    .catch(error => {
      console.error('Ошибка загрузки статей:', error);
      if (articlesContainer) {
        articlesContainer.innerHTML = '<p>Ошибка загрузки статей.</p>';
      }
    });

  if (filterButtons) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;
        playArticles(category);
      });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  function displayArticles(articlesToDisplay) {
    if (!articlesContainer) {
      console.error("Элемент #articlesContainer не найден");
      return;
    }
    articlesContainer.innerHTML = '';

    if (articlesToDisplay.length === 0) {
      articlesContainer.innerHTML = '<p>Статьи по данной категории не найдены.</p>';
      return;
    }

    articlesToDisplay.forEach(article => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.dataset.category = article.category || 'all';

      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="blog-image">
        <h3 class="blog-title">${article.title}</h3>
        <p class="blog-description">${article.summary}</p>
        <p class="blog-date">${new Date(article.date).toLocaleDateString('ru-RU')}</p>
        <a href="article.html?id=${article.id}" class="read-more-btn">Читать далее &rarr;</a>
      `;
      articlesContainer.appendChild(card);
    });
  }

  function playArticles(category) {
    let filteredArticles = [];
    if (category === 'all') {
      filteredArticles = allArticles;
    } else {
      filteredArticles = allArticles.filter(article =>
        article.category && (Array.isArray(article.category) ? article.category.includes(category) : article.category === category)
      );
    }
    displayArticles(filteredArticles);
  }
});

// Адаптивная верстка
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelectorAll('.nav-links'); 

  if (hamburger && navLinks.length > 0) {
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.forEach(linkContainer => {
              linkContainer.classList.toggle('active');
          });
      });
      
      navLinks.forEach(linkContainer => {
          linkContainer.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', () => {
                  hamburger.classList.remove('active');
                  navLinks.forEach(lc => lc.classList.remove('active'));
              });
          });
      });
  }
});