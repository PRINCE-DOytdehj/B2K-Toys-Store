let cart = JSON.parse(localStorage.getItem("b2kCart")) || [];


/* SAVE CART */

function saveCart() {
    localStorage.setItem("b2kCart", JSON.stringify(cart));
}


/* ADD TO CART */

function addToCart(productName, productPrice) {

    let existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    displayCart();

    showToast("✓ " + productName + " added to cart");
}


/* CART COUNT */

function updateCartCount() {

    let cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let totalQuantity = 0;

    cart.forEach(function(product) {
        totalQuantity += product.quantity;
    });

    cartCount.textContent = totalQuantity;
}


/* DISPLAY CART */

function displayCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty. Start shopping for your favourite toys!
            </p>
        `;

        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach(function(product, index) {

        let subtotal = product.price * product.quantity;

        total += subtotal;

        let cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-product-info">

                <h3>${product.name}</h3>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Subtotal: ₹${subtotal}
                </p>

            </div>

            <div class="quantity-buttons">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total;
}


/* INCREASE */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity++;

    saveCart();
    updateCartCount();
    displayCart();
}


/* DECREASE */

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    displayCart();
}


/* REMOVE */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    let productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    displayCart();

    showToast("Removed " + productName);
}


/* SEARCH */

function searchProducts() {

    let searchInput = document.getElementById("search");

    if (!searchInput) {
        return;
    }

    let searchValue = searchInput.value.toLowerCase().trim();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let productName =
            product.dataset.name.toLowerCase();

        let productCategory =
            product.dataset.category.toLowerCase();

        if (
            productName.includes(searchValue) ||
            productCategory.includes(searchValue)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";
        }
    });
}


/* CATEGORY FILTER */

function filterCategory(category, clickedButton) {

    let products =
        document.querySelectorAll(".product-card");

    let buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    products.forEach(function(product) {

        let productCategory =
            product.dataset.category;

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";
        }
    });
}


/* SORT PRODUCTS */

function sortProducts() {

    let select =
        document.getElementById("sort-products");

    let grid =
        document.getElementById("products-grid");

    if (!select || !grid) {
        return;
    }

    let products =
        Array.from(grid.querySelectorAll(".product-card"));

    let value = select.value;

    if (value === "low") {

        products.sort(function(a, b) {
            return Number(a.dataset.price) -
                   Number(b.dataset.price);
        });

    } else if (value === "high") {

        products.sort(function(a, b) {
            return Number(b.dataset.price) -
                   Number(a.dataset.price);
        });

    } else if (value === "name") {

        products.sort(function(a, b) {
            return a.dataset.name.localeCompare(
                b.dataset.name
            );
        });
    }

    products.forEach(function(product) {
        grid.appendChild(product);
    });
}


/* CATEGORY FROM URL */

function loadCategoryFromURL() {

    let params =
        new URLSearchParams(window.location.search);

    let category =
        params.get("category");

    if (!category) {
        return;
    }

    let button =
        document.querySelector(
            '.filter-btn[data-category="' +
            category +
            '"]'
        );

    filterCategory(category, button);
}


/* TOAST */

function showToast(message) {

    let toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {

        toast.classList.remove("show");

    }, 2200);
}


/* DEMO PRODUCT DETAILS */

function showProductMessage(productName) {

    showToast(
        "Product details for " +
        productName +
        " will open here."
    );
}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }

    let total =
        cart.reduce(function(sum, product) {

            return sum +
                (product.price * product.quantity);

        }, 0);

    showToast(
        "Checkout ready — Total ₹" + total
    );
}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        loadCategoryFromURL();

    }
);
