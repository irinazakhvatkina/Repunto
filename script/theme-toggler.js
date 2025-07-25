// theme-toggler.js
const html = document.documentElement; 

function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    applyTheme(savedTheme || 'light');

    const themeToggle = document.getElementById('theme-toggle');

    console.log("Кнопка переключения темы найдена:", themeToggle);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            console.log("Кнопка темы нажата!");
            const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.warn("Кнопка переключения темы (#theme-toggle) не найдена. Убедитесь, что она есть в вашем HTML.");
    }
});