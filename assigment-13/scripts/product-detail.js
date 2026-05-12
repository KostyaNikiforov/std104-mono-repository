renderShell();
loadProduct();

async function loadProduct() {
    let alerts = document.getElementById("global-alerts");
    let root = document.getElementById("product-detail-root");
    if (!root) {
        return;
    }
    if (alerts) {
        alerts.replaceChildren();
    }

    let params = new URLSearchParams(window.location.search);
    let idParam = params.get("id");

    if (!idParam) {
        renderError(
            root,
            "Product not specified",
            "Add an id to the URL, for example product.html?id=1"
        );
        return;
    }

    let numericId = Number(idParam);
    if (Number.isNaN(numericId)) {
        renderError(
            root,
            "Invalid product link",
            "The product id in the URL is not valid."
        );
        return;
    }

    try {
        let res = await fetch("data/products.json");
        if (!res.ok) {
            throw new Error("Could not load products (HTTP " + res.status + ")");
        }
        let text = await res.text();
        let products;
        try {
            products = JSON.parse(text);
        } catch (parseErr) {
            throw new Error("Catalog file is not valid JSON.");
        }

        if (!Array.isArray(products)) {
            throw new Error("Catalog data has an unexpected shape.");
        }

        let product = products.find(function (p) {
            return Number(p.id) === numericId;
        });

        if (!product) {
            renderError(
                root,
                "Product not found",
                "We do not have a product with id " + idParam + "."
            );
            return;
        }

        renderProduct(root, product);
        document.title = (product.title || "Product") + " — Store";
    } catch (err) {
        let msg =
            err && err.message
                ? err.message
                : "Something went wrong while loading this product.";
        if (alerts) {
            appendAlert(alerts, msg);
        }
        renderError(
            root,
            "Unable to load product",
            "Please check your connection and try again. If you opened this file directly, use a local web server so fetch can read products.json."
        );
    }
}

function renderProduct(root, product) {
    root.replaceChildren();

    let img = document.createElement("img");
    img.src = product.imageUrl || "";
    img.alt = product.title || "Product";
    img.loading = "lazy";
    img.addEventListener("error", function () {
        img.alt = "Image unavailable";
        img.removeAttribute("src");
        img.style.minHeight = "200px";
        img.style.background = "#e5e7eb";
    });

    let h1 = document.createElement("h1");
    h1.textContent = product.title || "Product";

    let price = document.createElement("p");
    price.className = "price";
    price.textContent =
        typeof product.price === "number"
            ? "$" + product.price.toFixed(2)
            : "Price on request";

    let desc = document.createElement("p");
    desc.className = "description";
    desc.textContent =
        product.description ||
        "No description is available for this product yet.";

    let back = document.createElement("a");
    back.className = "btn btn-secondary";
    back.href = "index.html";
    back.textContent = "← Back to catalog";

    root.appendChild(img);
    root.appendChild(h1);
    root.appendChild(price);
    root.appendChild(desc);
    root.appendChild(back);
}

function renderError(root, title, message) {
    root.replaceChildren();
    let block = document.createElement("div");
    block.className = "error-block";
    let h1 = document.createElement("h1");
    h1.textContent = title;
    let p = document.createElement("p");
    p.textContent = message;
    let back = document.createElement("a");
    back.className = "btn btn-secondary";
    back.href = "index.html";
    back.textContent = "Back to catalog";
    block.appendChild(h1);
    block.appendChild(p);
    block.appendChild(back);
    root.appendChild(block);
}
