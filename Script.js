(() => {
  "use strict";

  /* ---------- Переключение вкладок (демон лист / челлендж лист / топ игроков) ---------- */

  const links = document.querySelectorAll(".header-link[data-target]");
  const panels = document.querySelectorAll(".panel");

  function showPanel(targetId) {
    panels.forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });

    links.forEach((link) => {
      const isActive = link.dataset.target === targetId;
      link.classList.toggle("is-active", isActive);
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(link.dataset.target);
    });
  });

  /* ---------- Переключение темы (тёмная / светлая / молочно-шоколадная) ---------- */

  const root = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-btn]");
  const STORAGE_KEY = "ygdps-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    themeButtons.forEach((btn) => {
      const isActive = btn.dataset.themeBtn === theme;
      btn.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage может быть недоступен — тема просто не сохранится */
    }
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.themeBtn));
  });

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* игнорируем */
  }

  applyTheme(savedTheme || "dark");
})();