function renderShell() {
    let header = document.getElementById("site-header");
    let footer = document.getElementById("site-footer");
    if (!header || !footer) {
        return;
    }

    header.replaceChildren();
    let inner = document.createElement("div");
    inner.className = "inner";

    let brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "index.html";
    brand.textContent = "Demo Store";

    let nav = document.createElement("nav");
    nav.className = "nav-links";
    nav.setAttribute("aria-label", "Primary");
    let homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.textContent = "Home";
    nav.appendChild(homeLink);

    inner.appendChild(brand);
    inner.appendChild(nav);
    header.appendChild(inner);

    footer.replaceChildren();
    let footInner = document.createElement("div");
    footInner.className = "inner";
    footInner.textContent = "Demo storefront — assignment 13 (JSON + fetch)";
    footer.appendChild(footInner);
}

function appendAlert(container, message) {
    if (!container) {
        return;
    }
    let div = document.createElement("div");
    div.className = "alert";
    div.textContent = message;
    container.appendChild(div);
}