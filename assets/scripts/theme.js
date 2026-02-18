(function () {
  var STORAGE_KEY = "portfolio-theme";
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  var year = document.getElementById("year");

  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (button) {
      button.textContent = theme === "dark" ? "Light" : "Dark";
    }
  }

  var theme = getPreferredTheme();
  applyTheme(theme);

  if (button) {
    button.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
