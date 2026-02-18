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
    var githubIcons = document.querySelectorAll(".github-icon");
    githubIcons.forEach(function (icon) {
      var lightIcon = icon.getAttribute("data-light-icon") || "github_logo_dark.png";
      var darkIcon = icon.getAttribute("data-dark-icon") || "github_logo_white.png";
      icon.src = theme === "dark" ? darkIcon : lightIcon;
    });

    if (button) {
      var icon = button.querySelector("img");
      if (!icon) {
        icon = document.createElement("img");
        icon.setAttribute("data-dark-icon", button.getAttribute("data-dark-icon") || "night-mode.png");
        icon.setAttribute("data-light-icon", button.getAttribute("data-light-icon") || "day-mode.png");
        button.textContent = "";
        button.appendChild(icon);
      }
      var darkIcon = icon.getAttribute("data-dark-icon") || "night-mode.png";
      var lightIcon = icon.getAttribute("data-light-icon") || "day-mode.png";
      var nextIsDark = theme !== "dark";
      icon.src = nextIsDark ? darkIcon : lightIcon;
      icon.alt = nextIsDark ? "Dark mode" : "Light mode";
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
