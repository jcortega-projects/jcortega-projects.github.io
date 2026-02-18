(function () {
  var STORAGE_KEY = "portfolio-theme";
  function getAssetPrefix() {
    var scriptTag = document.currentScript;
    var scriptSrc = scriptTag ? scriptTag.getAttribute("src") || "" : "";
    if (scriptSrc.indexOf("../../assets/scripts/theme.js") === 0) {
      return "../../";
    }
    if (scriptSrc.indexOf("assets/scripts/theme.js") === 0) {
      return "";
    }
    return window.location.pathname.indexOf("/projects/") !== -1 ? "../../" : "";
  }
  var assetPrefix = getAssetPrefix();
  var ICON_PATHS = {
    githubLight: assetPrefix + "assets/images/icons/github_logo_dark.png",
    githubDark: assetPrefix + "assets/images/icons/github_logo_white.png",
    toggleDark: assetPrefix + "assets/images/icons/night-mode.png",
    toggleLight: assetPrefix + "assets/images/icons/day-mode.png"
  };
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
      var lightIcon = icon.getAttribute("data-light-icon") || icon.getAttribute("src") || ICON_PATHS.githubLight;
      var darkIcon = icon.getAttribute("data-dark-icon") || icon.getAttribute("src") || ICON_PATHS.githubDark;
      icon.src = theme === "dark" ? darkIcon : lightIcon;
    });

    if (button) {
      var icon = button.querySelector("img");
      if (!icon) {
        icon = document.createElement("img");
        icon.setAttribute("data-dark-icon", button.getAttribute("data-dark-icon") || ICON_PATHS.toggleDark);
        icon.setAttribute("data-light-icon", button.getAttribute("data-light-icon") || ICON_PATHS.toggleLight);
        button.textContent = "";
        button.appendChild(icon);
      }
      icon.classList.add("nav-icon");
      var darkIcon = icon.getAttribute("data-dark-icon") || ICON_PATHS.toggleDark;
      var lightIcon = icon.getAttribute("data-light-icon") || ICON_PATHS.toggleLight;
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
