/* Этот скрипт использует имена классов theme-menu__button, theme-dark, theme-light и theme-auto;
еще атрибуты disabled и data-theme. Поэтому их нельзя менять в HTML. */

const themeButtons = document.querySelectorAll('.theme-menu__button');

themeButtons.forEach((button) => {
  button.onclick = () => {
    changeTheme(button.getAttribute('data-theme'));
  };
});

function changeTheme(theme) {
  document.body.className = 'page';
  document.body.classList.add(`theme-${theme}`);
  setDisabled(theme);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    changeTheme(theme);
  }
}

function setDisabled(theme) {
  themeButtons.forEach((item) => {
    if (item.getAttribute('data-theme') === theme) {
      item.setAttribute('disabled', true);
    } else {
      item.removeAttribute('disabled');
    }
  });
}

initTheme();

function updateStyles() {
  const root = document.documentElement;
  root.style.setProperty('--pattern-image', root.classList.contains('theme-dark') 
      ? 'url(../svg/pattern-dark.svg)' 
      : 'url(../svg/pattern-light.svg)');
}

function changeTheme(theme) {
  // Очищаем все классы тем
  document.documentElement.className = 'page';

  // Добавляем выбранную тему
  if (theme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(`theme-${systemTheme}`);
  } else {
      document.documentElement.classList.add(`theme-${theme}`);
  }

  // Обновляем состояние кнопок
  setDisabled(theme);

  // Сохраняем тему в localStorage
  localStorage.setItem('theme', theme);

  // Обновляем стили
  updateStyles();
}
