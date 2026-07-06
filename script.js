const languageButtons = document.querySelectorAll("[data-lang-button]");
const translatedNodes = document.querySelectorAll("[data-en][data-de]");
const translatedLinks = document.querySelectorAll("[data-href-en][data-href-de]");
const storageKey = "preferredLanguage";

function setLanguage(language) {
  document.documentElement.lang = language;

  translatedNodes.forEach((node) => {
    node.textContent = node.dataset[language];
  });

  translatedLinks.forEach((link) => {
    link.setAttribute("href", link.dataset[`href${language.charAt(0).toUpperCase()}${language.slice(1)}`]);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langButton === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.langButton;
    setLanguage(language);

    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Language persistence is optional; the toggle still works without storage.
    }
  });
});

try {
  const savedLanguage = localStorage.getItem(storageKey);
  if (savedLanguage === "en" || savedLanguage === "de") {
    setLanguage(savedLanguage);
  }
} catch {
  // Ignore storage restrictions.
}
