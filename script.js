/* =====================================================
   B2K TOYS STORE - MAIN JAVASCRIPT
===================================================== */


/* =========================
   PRODUCT DATABASE
========================= */

const products = [

    {
        id: "rc-speed",
        name: "Speed Racer RC Car",
        category: "cars",
        categoryName: "RC Cars",
        price: 599,
        age: "5-9",
        image: "https://images.pexels.com/photos/13047786/pexels-photo-13047786.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "A stylish remote control racing car designed for exciting indoor and outdoor play."
    },

    {
        id: "monster-truck",
        name: "Monster Truck RC",
        category: "cars",
        categoryName: "RC Cars",
        price: 799,
        age: "7-12",
        image: "https://images.pexels.com/photos/9227215/pexels-photo-9227215.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "A powerful monster-style RC truck made for adventurous driving and racing."
    },

    {
        id: "offroad-car",
        name: "Off-Road RC Car",
        category: "cars",
        categoryName: "RC Cars",
        price: 899,
        age: "7-12",
        image: "https://images.pexels.com/photos/5190162/pexels-photo-5190162.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "Built for rough surfaces, this off-road RC car delivers an exciting driving experience."
    },

    {
        id: "smart-robot",
        name: "Smart Robot Toy",
        category: "robots",
        categoryName: "Robots",
        price: 699,
        age: "5-9",
        image: "https://images.pexels.com/photos/8566462/pexels-photo-8566462.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "An interactive robot toy designed to make learning and play more exciting."
    },

    {
        id: "advanced-robot",
        name: "Advanced Robot Toy",
        category: "robots",
        categoryName: "Robots",
        price: 999,
        age: "7-12",
        image: "https://images.pexels.com/photos/8294567/pexels-photo-8294567.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "A futuristic robot toy with interactive play features for curious young minds."
    },

    {
        id: "classic-teddy",
        name: "Classic Teddy Bear",
        category: "plush",
        categoryName: "Soft Toys",
        price: 399,
        age: "3-7",
        image: "https://images.pexels.com/photos/5802595/pexels-photo-5802595.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "A soft and cuddly teddy bear perfect for gifting and everyday companionship."
    },

    {
        id: "premium-teddy",
        name: "Premium Teddy Bear",
        category: "plush",
        categoryName: "Soft Toys",
        price: 599,
        age: "3-7",
        image: "https://images.pexels.com/photos/708774/pexels-photo-708774.jpeg?auto=compress&cs=tinysrgb&w=1000",
        description: "A premium soft teddy designed for comfort, gifting and imaginative play."
    },

    {
        id: "gaming-controller",
        name: "Pro Gaming Controller",
        category: "gaming",
        categoryName: "Gaming",
        price: 899,
        age: "8-12",
        image: "",
        description: "A stylish gaming controller concept for young gaming enthusiasts."
    },

    {
        id: "building-blocks",
        name: "100-Piece Building Blocks",
        category: "building",
        categoryName: "Building & Construction",
        price: 499,
        age: "5-9",
        image: "",
        description: "Creative building blocks that help children develop imagination and problem-solving skills."
    },

    {
        id: "learning-kit",
        name: "Early Learning Activity Kit",
        category: "learning",
        categoryName: "Learning & Educational",
        price: 449,
        age: "3-7",
        image: "",
        description: "A fun educational activity kit designed for early learning and development."
    },

    {
        id: "art-kit",
        name: "Jumbo Art & Craft Kit",
        category: "learning",
        categoryName: "Learning & Educational",
        price: 549,
        age: "5-9",
        image: "",
        description: "A creative art kit packed with activities for young artists."
    },

    {
        id: "doll-house",
        name: "Dollhouse Playset",
        category: "dolls",
        categoryName: "Dolls & Roleplay",
        price: 799,
        age: "5-9",
        image: "",
        description: "A detailed roleplay playset that encourages storytelling and imagination."
    },

    {
        id: "action-hero",
        name: "Hero Action Figure",
        category: "dolls",
        categoryName: "Dolls & Roleplay",
        price: 349,
        age: "5-9",
        image: "",
        description: "An action figure for exciting adventures and imaginative roleplay."
    },

    {
        id: "board-game",
        name: "Kids Strategy Board Game",
        category: "gaming",
        categoryName: "Gaming",
        price: 499,
        age: "7-12",
        image: "",
        description: "A family-friendly strategy game designed to make playtime more interactive."
    },

    {
        id: "sports-set",
        name: "5-in-1 Sports Play Set",
        category: "sports",
        categoryName: "Sports & Outdoor",
        price: 699,
        age: "7-12",
        image: "",
        description: "A multi-activity sports set for active indoor and outdoor play."
    },

    {
        id: "musical-keyboard",
        name: "Kids Musical Keyboard",
        category: "learning",
        categoryName: "Learning & Educational",
        price: 749,
        age: "5-9",
        image: "",
        description: "A fun beginner keyboard that introduces children to music and rhythm."
    },

    {
        id: "diecast-car",
        name: "Die-Cast Vehicle Set",
        category: "cars",
        categoryName: "RC Cars",
        price: 399,
        age: "5-9",
        image: "",
        description: "A collection of detailed toy vehicles for racing and collection."
    },

    {
        id: "baby-learning",
        name: "Baby Learning Toy",
        category: "learning",
        categoryName: "Learning & Educational",
        price: 299,
        age: "0-3",
        image: "",
        description: "A colourful early-learning toy designed for toddlers."
    }

];


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("b2kCart")) || [];


function saveCart() {
    localStorage.setItem("b2kCart", JSON.stringify(cart));
}


function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    if (!countElement) {
        return;
    }

    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });

    countElement.textContent = count;
}


/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 1800);
}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId, quantity = 1) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existing = cart.find(function(item) {
        return item.id === productId;
    });

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();

    showToast("✓ " + product.name + " added to cart");
}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    displayCart();

    showToast("Product removed from cart");
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity++;

    saveCart();
    updateCartCount();
    displayCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

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


/* =========================
   CART DISPLAY
========================= */

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <br>
                <a href="products.html" class="main-button">
                    START SHOPPING
                </a>
            </div>
        `;

        cartTotal.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-product-info">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Subtotal: ₹${subtotal}</p>
            </div>

            <div class="cart-quantity">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <strong>${item.quantity}</strong>

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


/* =========================
   PRODUCT CARD
========================= */

function createProductCard(product) {

    const imageHTML = product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<div class="gaming-category category-placeholder">
                <span>${product.categoryName.split(" ")[0].toUpperCase()}</span>
           </div>`;

    return `
        <div
            class="product-card"
            data-name="${product.name.toLowerCase()}"
            data-category="${product.category}"
            data-age="${product.age}"
        >

            <a href="product.html?id=${product.id}">
                <div class="product-image">
                    ${imageHTML}
                </div>
            </a>

            <div class="product-info">

                <div class="product-category">
                    ${product.categoryName}
                </div>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price}
                    </span>

                    <div class="product-actions">

                        <a
                            href="product.html?id=${product.id}"
                            class="small-button view-button">
                            VIEW
                        </a>

                        <button
                            class="small-button"
                            onclick="addToCart('${product.id}')">
                            ADD
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;
}


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(productList = products) {

    const grid = document.getElementById("products-grid");
    const noProducts = document.getElementById("no-products");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    productList.forEach(function(product) {
        grid.innerHTML += createProductCard(product);
    });

    if (noProducts) {
        noProducts.style.display =
            productList.length === 0 ? "block" : "none";
    }
}


/* =========================
   SEARCH + AGE FILTER
========================= */

function applyProductFilters() {

    const searchInput = document.getElementById("search");
    const ageFilter = document.getElementById("age-filter");

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedAge = ageFilter
        ? ageFilter.value
        : "all";

    const activeButton = document.querySelector(".filter-btn.active");

    const selectedCategory = activeButton
        ? activeButton.dataset.category
        : "all";

    const filtered = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.categoryName.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesAge =
            selectedAge === "all" ||
            product.age === selectedAge;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesAge
        );
    });

    displayProducts(filtered);
}


/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category, clickedButton) {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    applyProductFilters();
}


/* =========================
   URL CATEGORY
========================= */

function loadCategoryFromURL() {

    const params = new URLSearchParams(
        window.location.search
    );

    const category = params.get("category");

    if (!category) {
        return;
    }

    const button = document.querySelector(
        '.filter-btn[data-category="' + category + '"]'
    );

    if (button) {
        filterCategory(category, button);
    }
}


/* =========================
   PRODUCT DETAIL
========================= */

function loadProductDetails() {

    const container = document.getElementById(
        "product-detail-container"
    );

    if (!container) {
        return;
    }

    const params = new URLSearchParams(
        window.location.search
    );

    const id = params.get("id");

    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) {

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <br>
                <a href="products.html" class="main-button">
                    BACK TO PRODUCTS
                </a>
            </div>
        `;

        return;
    }

    const imageHTML = product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<div class="gaming-category category-placeholder">
                <span>${product.categoryName.split(" ")[0].toUpperCase()}</span>
           </div>`;

    container.innerHTML = `

        <div class="product-detail-grid">

            <div class="detail-image">
                ${imageHTML}
            </div>

            <div class="detail-content">

                <p class="detail-category">
                    ${product.categoryName}
                </p>

                <h1>${product.name}</h1>

                <div class="detail-price">
                    ₹${product.price}
                </div>

                <p class="detail-description">
                    ${product.description}
                </p>

                <div class="detail-info-box">
                    <p>
                        <strong>Category:</strong>
                        ${product.categoryName}
                    </p>

                    <p>
                        <strong>Recommended Age:</strong>
                        ${product.age} Years
                    </p>

                    <p>
                        <strong>Availability:</strong>
                        In Stock
                    </p>
                </div>

                <div class="detail-actions">

                    <div class="quantity-control">

                        <button
                            onclick="changeDetailQuantity(-1)">
                            −
                        </button>

                        <span id="detail-quantity">1</span>

                        <button
                            onclick="changeDetailQuantity(1)">
                            +
                        </button>

                    </div>

                    <button
                        class="main-button"
                        onclick="addDetailProductToCart('${product.id}')">
                        ADD TO CART
                    </button>

                </div>

            </div>

        </div>
    `;

    window.currentDetailProduct = product;
}


function changeDetailQuantity(change) {

    const quantityElement =
        document.getElementById("detail-quantity");

    if (!quantityElement) {
        return;
    }

    let quantity =
        parseInt(quantityElement.textContent);

    quantity += change;

    if (quantity < 1) {
        quantity = 1;
    }

    quantityElement.textContent = quantity;
}


function addDetailProductToCart(productId) {

    const quantityElement =
        document.getElementById("detail-quantity");

    const quantity = quantityElement
        ? parseInt(quantityElement.textContent)
        : 1;

    addToCart(productId, quantity);
}


/* =========================
   CHECKOUT
========================= */

function loadCheckout() {

    const checkoutTotal =
        document.getElementById("checkout-total");

    if (!checkoutTotal) {
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    checkoutTotal.textContent = total;
}


function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }

    const name =
        document.getElementById("customer-name").value;

    const orderNumber =
        "B2K" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("b2kLastOrder", orderNumber);
    localStorage.setItem("b2kCustomer", name);

    cart = [];

    saveCart();
    updateCartCount();

    document.getElementById("order-number").textContent =
        orderNumber;

    document.getElementById("order-success").style.display =
        "block";

    document.getElementById("checkout-form").style.display =
        "none";
}


/* =========================
   TRACK ORDER
========================= */

function trackOrder(event) {

    event.preventDefault();

    const input =
        document.getElementById("tracking-number");

    const result =
        document.getElementById("track-result");

    const orderNumber =
        input.value.trim();

    if (!orderNumber) {
        return;
    }

    result.style.display = "block";

    document.getElementById("tracked-number").textContent =
        orderNumber;
}


/* =========================
   CONTACT FORM
========================= */

function submitContact(event) {

    event.preventDefault();

    const message =
        document.getElementById("contact-message");

    message.textContent =
        "✓ Thank you! Your message has been submitted.";

    message.style.display = "block";

    event.target.reset();
}


/* =========================
   INITIALIZE WEBSITE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayProducts();

        loadCategoryFromURL();

        loadProductDetails();

        displayCart();

        loadCheckout();

    }
);
