document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.querySelector(".language-button");
  const languageMenu = document.querySelector(".language-menu");
  const languageOptions = document.querySelectorAll("[data-language]");

  const supportedLanguages = ["en", "ku", "ar"];
  const defaultLanguage = "en";

  // Open / close language menu
  if (languageButton && languageMenu) {
    languageButton.addEventListener("click", (event) => {
      event.stopPropagation();
      languageMenu.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      languageMenu.classList.remove("active");
    });

    languageMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  // Load a language
  async function loadLanguage(language) {
    if (!supportedLanguages.includes(language)) {
      language = defaultLanguage;
    }

    try {
      const response = await fetch(`languages/${language}.json`);

      if (!response.ok) {
        throw new Error(`Could not load ${language}.json`);
      }

      const translations = await response.json();

      // Translate all elements
      document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang");

        if (translations[key] !== undefined) {
          element.innerHTML = translations[key];
        }
      });

      // Set page language and direction
      document.documentElement.lang = language;

      if (language === "ku" || language === "ar") {
        document.documentElement.dir = "rtl";
      } else {
        document.documentElement.dir = "ltr";
      }

      // Save selected language
      localStorage.setItem("lunaHotelLanguage", language);

      // Update language button
      if (languageButton) {
        const languageNames = {
          en: "EN",
          ku: "KU",
          ar: "AR",
        };

        languageButton.textContent = languageNames[language];
      }

      // Close menu
      if (languageMenu) {
        languageMenu.classList.remove("active");
      }
    } catch (error) {
      console.error("Language loading error:", error);
    }
  }

  // Language option clicks
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedLanguage = option.getAttribute("data-language");
      loadLanguage(selectedLanguage);
    });
  });

  // Load saved language or English
  const savedLanguage =
    localStorage.getItem("lunaHotelLanguage") || defaultLanguage;

  loadLanguage(savedLanguage);
});
