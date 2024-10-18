// Установка сохраненного языка и темы
let currentLanguage = localStorage.getItem('language') || 'ru'; // По умолчанию русский
let isDarkTheme = localStorage.getItem('theme') === 'dark'; // Получаем сохраненную тему

// Применяем сохраненные настройки темы
if (isDarkTheme) {
    document.body.classList.add('dark');
}

// Функция для обновления заголовков и текстов
function updateTitles() {
    const titles = {
        ru: {
            mainMenu: 'Главное меню',
            cart: 'Корзина',
            faq: 'FAQ',
            toggleTheme: 'Переключить тему',
            searchPlaceholder: 'Поиск игр...',
            faqTitle: 'FAQ',
            faqInfo1Title: 'Почему мы?',
            faqInfo1Text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
            faqInfo2Title: 'Почему так дорого?',
            faqInfo2Text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean масса. Cum sociis natoque penatibus et magnis dis.',
            faqInfo3Title: 'Филлер 3',
            faqInfo3Text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean масса. Cum sociис natoque penatibus et magnis dis.',
        },
        en: {
            mainMenu: 'Main Menu',
            cart: 'Cart',
            faq: 'FAQ',
            toggleTheme: 'Toggle Theme',
            searchPlaceholder: 'Search games...',
            faqTitle: 'FAQ',
            faqInfo1Title: 'Why us?',
            faqInfo1Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
            faqInfo2Title: 'Why so expensive?',
            faqInfo2Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
            faqInfo3Title: 'Filler 3',
            faqInfo3Text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis.',
        }
    };

    // Обновляем текст заголовков и блоков FAQ
    if (document.querySelector('.faq-title')) {
        document.querySelector('.faq-title').textContent = titles[currentLanguage].faqTitle;
    }
    if (document.querySelector('.faqInfo1Title')) {
        document.querySelector('.faqInfo1Title').textContent = titles[currentLanguage].faqInfo1Title;
    }
    if (document.querySelector('.faqInfo1Text')) {
        document.querySelector('.faqInfo1Text').textContent = titles[currentLanguage].faqInfo1Text;
    }
    if (document.querySelector('.faqInfo2Title')) {
        document.querySelector('.faqInfo2Title').textContent = titles[currentLanguage].faqInfo2Title;
    }
    if (document.querySelector('.faqInfo2Text')) {
        document.querySelector('.faqInfo2Text').textContent = titles[currentLanguage].faqInfo2Text;
    }
    if (document.querySelector('.faqInfo3Title')) {
        document.querySelector('.faqInfo3Title').textContent = titles[currentLanguage].faqInfo3Title;
    }
    if (document.querySelector('.faqInfo3Text')) {
        document.querySelector('.faqInfo3Text').textContent = titles[currentLanguage].faqInfo3Text;
    }

    // Обновляем текст кнопок меню
    document.querySelector('.menu-button:nth-child(1)').textContent = titles[currentLanguage].mainMenu;
    document.querySelector('.menu-button:nth-child(2)').textContent = titles[currentLanguage].cart;
    document.querySelector('.menu-button:nth-child(3)').textContent = titles[currentLanguage].faq;
    document.getElementById('languageButton').textContent = currentLanguage === 'ru' ? '🌍' : '🌎'; // Меняем иконку

    // Обновляем плейсхолдер для input поиска (если он есть)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = titles[currentLanguage].searchPlaceholder;
    }
}

// Переключение темы
document.getElementById('themeToggle').addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Переключение языка
document.getElementById('languageButton').addEventListener('click', () => {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru'; // Переключаем язык
    localStorage.setItem('language', currentLanguage); // Сохраняем язык
    updateTitles(); // Обновляем заголовки и тексты
});

// Устанавливаем заголовки и тексты при загрузке
updateTitles();

// Получаем текущий URL
const currentPage = window.location.pathname;

// Запрещаем прокрутку на index.html
if (currentPage.includes('index.html')) {
    document.body.style.overflow = 'hidden';
} else {
    // Разрешаем прокрутку на других страницах
    document.body.style.overflow = 'auto'; // Или 'scroll', если нужно
}