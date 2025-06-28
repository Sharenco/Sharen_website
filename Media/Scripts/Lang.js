function setLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    let savedLang = localStorage.getItem("language");

    if (!savedLang) {
        savedLang = "en"; // default
        localStorage.setItem("language", savedLang);
    }

    setLanguage(savedLang);

    const toggleButton = document.getElementById("lang-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
        const newLang = localStorage.getItem("language") === "en" ? "fr" : "en";
        setLanguage(newLang);
        });
    }
});