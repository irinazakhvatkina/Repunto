// theme-toggler.js
const html = document.documentElement;

// Применение темы
function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

// Сохранённая тема при загрузке
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    // Дожидаемся появления кнопки и навешиваем обработчик
    const observer = new MutationObserver(() => {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });

            observer.disconnect(); // Отключить наблюдение после инициализации
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
