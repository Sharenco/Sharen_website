const orderBtn = document.getElementById("toggle-order-btn");
const container = document.getElementById("blog-container");
let reversed = false; // current order state

function updateOrderButtonLabel() {
    const lang = localStorage.getItem("language") || "en";

    // base text from data-en/data-fr
    let label = orderBtn.getAttribute(`data-${lang}`);

    // if reversed -> swap texts
    if (reversed) {
        if (lang === "en") label = "Older to Latest";
        if (lang === "fr") label = "Plus ancien → Plus récent";
    }

    orderBtn.textContent = label;
}

// reverse posts when button is clicked
orderBtn.addEventListener("click", () => {
    const posts = Array.from(container.children).reverse();
    posts.forEach(p => container.appendChild(p));

    reversed = !reversed;
    updateOrderButtonLabel();
});

// Patch your existing setLanguage to also update button label
const originalSetLanguage = setLanguage;
setLanguage = function(lang) {
    originalSetLanguage(lang);
    updateOrderButtonLabel();
};

// Initial label
document.addEventListener("DOMContentLoaded", updateOrderButtonLabel);
