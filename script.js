// переход к "чистой" и "загрязнённой" Земле
let isClean = false;

function toggleEarth() {
    if (isClean) {
        switchToPolluted();
    } else {
        switchToClean();
    }
    isClean = !isClean;
}

function switchToClean() {
    const section = document.querySelector('.hero-section');
    const title = document.querySelector('.section-header__title');
    const tagline = document.querySelector('.section-header__tagline');
    const earthImage = document.querySelector('.earth-image');
    const statisticDescriptions = document.querySelectorAll('.statistic-item__description');
    const statisticValues = document.querySelectorAll('.statistic-item__value');

    document.querySelector('.hover-text').textContent = 'Игнорировать?';
    document.querySelector('.clean-btn--left').style.display = 'inline-block';
    document.querySelector('.clean-btn--right').style.display = 'inline-block';

    // Добавляем класс для "чистой" Земли
    section.classList.add('clean-state');
    section.style.transition = 'background 1s ease-in-out';

    // Заголовок: меняем текст + градиентный цвет
    title.textContent = 'ДЕЙСТВОВАТЬ';
    title.style.background = `linear-gradient(to top, #384783, #DFE8F1)`;
    title.style.webkitBackgroundClip = 'text';
    title.style.color = 'transparent';
    title.style.transition = 'background 0.8s ease, color 0.8s ease';
    title.style.textShadow = 'none';

    // Подзаголовок
    tagline.textContent = 'Создавать решение — твой шанс!';
    tagline.style.color = '#384783';

    // Картинка Земли: замена и увеличение
    earthImage.src = 'Assets/Light_Earth.svg';
    earthImage.alt = 'Чистая планета Земля';
    earthImage.style.transition = 'transform 0.8s ease';
    earthImage.style.transform = 'scale(1.28)';
    earthImage.style.boxShadow = 'none';

    // Обновляем все описания
    const newDescriptions = [
        'Переработка 1 кг бумаги экономит',
        'Запретили одноразовый пластик',
        'Каждое дерево поглощает CO₂'
    ];

    const newValues = [
        '0,7 кг CO₂',
        'более 70 стран',
        '21 кг в год'
    ];

    statisticDescriptions.forEach((desc, index) => {
        if (newDescriptions[index]) {
            desc.textContent = newDescriptions[index];
            desc.style.color = '#384783';
            desc.style.opacity = '0.8';
        }
    });

    statisticValues.forEach((val, index) => {
        if (newValues[index]) {
            val.textContent = newValues[index];
            val.style.color = '#384783';
        }
    });
}


function switchToPolluted() {
    const section = document.querySelector('.hero-section');
    const title = document.querySelector('.section-header__title');
    const tagline = document.querySelector('.section-header__tagline');
    const earthImage = document.querySelector('.earth-image');
    const statisticDescriptions = document.querySelectorAll('.statistic-item__description');
    const statisticValues = document.querySelectorAll('.statistic-item__value');

    document.querySelector('.hover-text').textContent = 'Действуй!';
    document.querySelector('.clean-btn--left').style.display = 'none';
    document.querySelector('.clean-btn--right').style.display = 'none';

    // Удаляем класс для "чистой" Земли, чтобы вернулся "загрязненный" фон по умолчанию
    section.classList.remove('clean-state');
    section.style.transition = 'background 1s ease-in-out'; // Оставляем переход

    // Заголовок: возвращаем «ИГНОРИРОВАТЬ»
    title.textContent = 'ИГНОРИРОВАТЬ';
    title.style.background = `linear-gradient(to top, var(--main-color), var(--light-green-color))`;
    title.style.webkitBackgroundClip = 'text';
    title.style.color = 'transparent';
    title.style.transition = 'background 0.8s ease, color 0.8s ease';
    title.style.textShadow = 'none';

    // Подзаголовок: тёмный цвет, текст
    tagline.textContent = 'Если ничего не делать!';
    tagline.style.color = 'var(--main-color)';

    // Земля: тёмная версия + тень
    earthImage.src = 'Assets/Dark_Earth.svg';
    earthImage.alt = 'Загрязнённая планета Земля';
    earthImage.style.transition = 'transform 0.8s ease, box-shadow 0.8s ease';
    earthImage.style.transform = 'scale(1)';
    earthImage.style.boxShadow = '0 0 30px var(--main-color)';

    // Статистика: загрязнённые факты
    const pollutedDescriptions = [
        'В океане ежегодно пластика',
        'Каждую минуту вырубается',
        'Из-за транспорта загрязняется'
    ];

    const pollutedValues = [
        '8 млн тонн',
        '36 тыс деревьев',
        '70% воздуха'
    ];

    statisticDescriptions.forEach((desc, index) => {
        if (pollutedDescriptions[index]) {
            desc.textContent = pollutedDescriptions[index];
            desc.style.color = 'var(--main-color)';
            desc.style.opacity = '0.6';
        }
    });

    statisticValues.forEach((val, index) => {
        if (pollutedValues[index]) {
            val.textContent = pollutedValues[index];
            val.style.color = 'var(--main-color)';
        }
    });
}