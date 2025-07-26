const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');

fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
        const article = articles.find(a => a.id === articleId);

        if (!article) {
            document.getElementById('article-content').innerHTML = '<p>Статья не найдена.</p>';
            return;
        }

        document.getElementById('article-content').innerHTML = `
      <h1>${article.title}</h1>
      <p class="blog-date">${article.date}</p>
      <img src="${article.image}" alt="${article.title}" class="blog-image">
      <div class="blog-full-content">${article.content}</div>
      <a href="blog.html" class="back-link">← Назад ко всем статьям</a>
    `;
    })
    .catch(error => {
        document.getElementById('article-content').innerHTML = '<p>Ошибка загрузки статьи.</p>';
        console.error(error);
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