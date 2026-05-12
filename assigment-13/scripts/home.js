renderShell();

try {
    loadPageData().catch(function (err) {
        var alerts = document.getElementById("global-alerts");
        if (alerts) {
            appendAlert(
                alerts,
                "Something went wrong while building the page: " +
                (err && err.message ? err.message : "Unknown error")
            );
        }
    });
} catch (err) {
    var alerts = document.getElementById("global-alerts");
    if (alerts) {
        appendAlert(
            alerts,
            "Unexpected error: " + (err && err.message ? err.message : String(err))
        );
    }
}

function loadPageData() {
    var alerts = document.getElementById("global-alerts");
    var heroRoot = document.getElementById("hero-root");
    var grid = document.getElementById("products-grid");
    var infoRoot = document.getElementById("info-sections-root");

    if (!alerts || !heroRoot || !grid || !infoRoot) {
        return;
    }

    alerts.replaceChildren();

    var jobs = [
        { key: "products", url: "data/products.json" },
        { key: "sections", url: "data/sections.json" },
        { key: "info", url: "data/info-sections.json" }
    ];

    function loadOrMark(job) {
        return fetchJson(job.url).then(
            function (value) {
                return { key: job.key, ok: true, value: value, url: job.url };
            },
            function (reason) {
                var msg =
                    reason && reason.message ? reason.message : String(reason);
                return { key: job.key, ok: false, reason: msg, url: job.url };
            }
        );
    }

    return Promise.all(jobs.map(loadOrMark)).then(function (results) {
        var data = {};

        results.forEach(function (result) {
            if (result.ok) {
                data[result.key] = result.value;
            } else {
                appendAlert(
                    alerts,
                    "We could not load " +
                    result.url +
                    ": " +
                    result.reason +
                    " Showing fallbacks where we can."
                );
                data[result.key] = null;
            }
        });

        renderHero(heroRoot, data.sections);
        renderProducts(grid, data.products);
        renderInfoBlocks(infoRoot, data.info);
    });
}

function renderHero(heroRoot, sections) {
    heroRoot.replaceChildren();
    if (sections && sections.headerText) {
        var wrap = document.createElement("div");
        wrap.className = "hero-inner";
        var title = document.createElement("h2");
        title.className = "hero-title";
        title.textContent = sections.headerText;
        var img = document.createElement("img");
        img.className = "hero-banner";
        img.src = sections.bannerImage || "images/banner.svg";
        img.alt = "Store banner";
        img.loading = "lazy";
        img.addEventListener("error", function () {
            img.replaceWith(fallbackBannerNote());
        });
        wrap.appendChild(title);
        wrap.appendChild(img);
        heroRoot.appendChild(wrap);
    } else {
        var fallback = document.createElement("div");
        fallback.className = "hero-inner";
        var p = document.createElement("p");
        p.className = "hero-fallback";
        p.textContent =
            "Welcome to our store. We could not load the headline or banner from the server, so you are seeing this fallback message.";
        fallback.appendChild(p);
        heroRoot.appendChild(fallback);
    }
}

function fallbackBannerNote() {
    var note = document.createElement("p");
    note.className = "hero-fallback";
    note.textContent = "Banner image failed to load. The headline above should still be correct if section data loaded.";
    return note;
}

function renderProductCard(grid, product) {
    var card = document.createElement("article");
    card.className = "product-card";

    var link = document.createElement("a");
    link.href = "product.html?id=" + encodeURIComponent(String(product.id));

    var img = document.createElement("img");
    img.src = product.imageUrl || "";
    img.alt = product.title || "Product";
    img.loading = "lazy";
    img.addEventListener("error", function () {
        var ph = document.createElement("div");
        ph.className = "product-card-img-fallback";
        ph.textContent = "Image unavailable";
        img.replaceWith(ph);
    });

    var body = document.createElement("div");
    body.className = "product-card-body";

    var h3 = document.createElement("h3");
    h3.className = "product-card-title";
    h3.textContent = product.title || "Untitled";

    var price = document.createElement("p");
    price.className = "product-card-price";
    price.textContent =
        typeof product.price === "number"
            ? "$" + product.price.toFixed(2)
            : "Price on request";

    var cta = document.createElement("p");
    cta.className = "product-card-cta";
    cta.textContent = "View details →";

    body.appendChild(h3);
    body.appendChild(price);
    body.appendChild(cta);
    link.appendChild(img);
    link.appendChild(body);
    card.appendChild(link);
    grid.appendChild(card);
}

function renderProducts(grid, products) {
    grid.replaceChildren();
    if (Array.isArray(products) && products.length > 0) {
        products.forEach(function (p) {
            renderProductCard(grid, p);
        });
    } else {
        var block = document.createElement("div");
        block.className = "error-block";
        var h2 = document.createElement("h2");
        h2.textContent = "Products unavailable";
        var p = document.createElement("p");
        p.textContent =
            "We could not load the product list. Check your connection or try refreshing the page.";
        block.appendChild(h2);
        block.appendChild(p);
        grid.appendChild(block);
    }
}

function renderInfoBlocks(infoRoot, infoPayload) {
    infoRoot.replaceChildren();
    var sections =
        infoPayload && Array.isArray(infoPayload.infoSections)
            ? infoPayload.infoSections
            : null;

    if (sections && sections.length > 0) {
        sections.forEach(function (block) {
            var article = document.createElement("article");
            article.className = "info-block";
            var h2 = document.createElement("h2");
            h2.textContent = block.title || "Information";
            var p = document.createElement("p");
            p.textContent = block.content || "";
            article.appendChild(h2);
            article.appendChild(p);
            infoRoot.appendChild(article);
        });
    } else {
        var fb = document.createElement("div");
        fb.className = "info-fallback";
        fb.textContent =
            "Store policies and extra information could not be loaded. Please try again later.";
        infoRoot.appendChild(fb);
    }
}

function fetchJson(url) {
    return fetch(url).then(function (res) {
        if (!res.ok) {
            throw new Error("HTTP " + res.status + " for " + url);
        }
        return res.text();
    }).then(function (text) {
        try {
            return JSON.parse(text);
        } catch (e) {
            throw new Error("Invalid JSON from " + url);
        }
    });
}
