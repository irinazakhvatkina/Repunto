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