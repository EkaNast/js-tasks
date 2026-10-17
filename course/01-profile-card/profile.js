// Находим кнопку переключения темы в HTML по классу theme-toggle
const themeToggle = document.querySelector('.theme-toggle');

// Добавляем обработчик события click — функция выполнится при нажатии на кнопку
themeToggle.addEventListener('click', () => {
  // Проверяем, установлено ли у body значение data-theme="dark"
  // Если да, isDark будет true, иначе — false
  const isDark = document.body.dataset.theme === 'dark';

  // Если тема уже тёмная...
  if (isDark) {
    // Удаляем атрибут data-theme у body
    // CSS перестанет применять тёмные токены и вернётся к значениям из :root
    delete document.body.dataset.theme;
  } else {
    // Если тема не тёмная, устанавливаем data-theme="dark"
    // CSS применит значения переменных из селектора [data-theme="dark"]
    document.body.dataset.theme = 'dark';
  }
});
