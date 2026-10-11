```javascript
"use strict";

/* B2K Toys Store — Main JavaScript */

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Teddy Bear",
    category: "Soft Toys",
    price: 499,
    oldPrice: 699,
    emoji: "🧸",
    description: "A soft and cuddly teddy bear, perfect for gifts and hugs.",
    age: "3+ years",
    rating: 4.8
  },
  {
    id: 2,
    name: "Building Blocks Set",
    category: "Educational Toys",
    price: 799,
    oldPrice: 999,
    emoji: "🧱",
    description: "Colourful building blocks that encourage creativity and learning.",
    age: "4+ years",
    rating: 4.7
  },
  {
    id: 3,
    name: "Racing Sports Car",
    category: "Remote Control",
    price: 999,
    oldPrice: 1299,
    emoji: "🏎️",
    description: "A sporty toy car for exciting racing adventures.",
    age: "6+ years",
    rating: 4.6
  },
  {
    id: 4,
    name: "Baby Elephant Plush",
    category: "Soft Toys",
    price: 599,
    oldPrice: 799,
    emoji: "🐘",
    description: "An adorable elephant plush toy for little ones.",
    age: "2+ years",
    rating: 4.8
  },
  {
    id: 5,
    name: "Kids Art Kit",
    category: "Educational Toys",
    price: 349,
    oldPrice: 499,
    emoji: "🎨",
    description: "A creative art kit for drawing, colouring and fun activities.",
    age: "5+ years",
    rating: 4.5
  },
  {
    id: 6,
    name: "Toy Aeroplane",
    category: "Vehicles",
    price: 449,
    oldPrice: 599,
    emoji: "✈️",
    description: "A lightweight toy aeroplane for imaginative adventures.",
    age: "4+ years",
    rating: 4.4
  },
  {
    id: 7,
    name: "Rainbow Stacking Rings",
    category: "Baby Toys",
    price: 299,
    oldPrice: 399,
    emoji: "🌈",
    description: "Bright stacking rings that help develop coordination.",
    age: "1+ years",
    rating: 4.6
  },
  {
    id: 8,
    name: "Dinosaur Figure",
    category: "Action Toys",
    price: 399,
    oldPrice: 549,
    emoji: "🦖",
    description: "A dinosaur figure for imaginative prehistoric adventures.",
    age: "4+ years",
    rating: 4.5
  },
  {
    id: 9,
    name: "Toy Train Set",
    category: "Vehicles",
    price: 899,
    oldPrice: 1199,
    emoji: "🚂",
    description: "A fun train set for little railway enthusiasts.",
    age: "5+ years",
    rating: 4.7
  },
  {
    id: 10,
    name: "Cute Bunny Plush",
    category: "Soft Toys",
    price: 549,
    oldPrice: 749,
    emoji: "🐰",
    description: "A cute bunny plush toy for playtime and gifting.",
    age: "3+ years",
    rating: 4.7
  },
  {
    id: 11,
    name: "Toy Basketball",
    category: "Sports Toys",
    price: 299,
    oldPrice: 399,
    emoji: "🏀",
    description: "A fun ball for active indoor and outdoor play.",
    age: "5+ years",
    rating: 4.3
  },
  {
    id: 12,
    name: "Robot Toy",
    category: "Action Toys",
    price: 699,
    oldPrice: 899,
    emoji: "🤖",
    description: "A colourful robot toy for imaginative play.",
    age: "5+ years",
    rating: 4.6
  }
];

const CART_KEY = "b2k_cart";
const CONTACT_KEY = "b2k_contact_messages";
const ORDER_KEY = "b2k_orders";

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function getStorage(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key}:`, error);
    alert("Your browser could not save this information.");
    return false;
  }
}

function getCart() {
  const savedCart = getStorage(CART_KEY, []);

  if (!Array.isArray(savedCart)) {
    return [];
  }

  return savedCart.filter(item => {
    return (
      Number.isInteger(Number(item.id)) &&
      PRODUCTS.some(product => product.id === Number(item.id)) &&
      Number.isInteger(Number(item.quantity)) &&
      Number(item.quantity) > 0
    );
  }).map(item => ({
    id: Number(item.id),
    quantity: Math.min(Number(item.quantity), 99)
  }));
}

function saveCart(cart) {
  return setStorage(CART_KEY, cart);
}

function getProduct(productId) {
  return PRODUCTS.find(product => product.id === Number(productId));
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function updateCartCount() {
  const count = getCartCount();

  getElements("[data-cart-count], #cart-count, .cart-count").forEach(element => {
    element.textContent = count;
  });
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <a
        class="product-image"
        href="product.html?id=${product.id}"
        aria-label="View ${escapeHTML(product.name)}"
      >
        <span class="product-emoji" aria-hidden="true">
          ${product.emoji}
        </span>
        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>
      </a>

      <div class="product-info">
        <div class="product-rating">
          ★ ${product.rating.toFixed(1)}
        </div>

        <h3>
          <a href="product.html?id=${product.id}">
            ${escapeHTML(product.name)}
          </a>
        </h3>

        <p class="product-description">
          ${escapeHTML(product.description)}
        </p>

        <div class="product-price">
          <strong>${formatPrice(product.price)}</strong>
          <del>${formatPrice(product.oldPrice)}</del>
        </div>

        <button
          class="btn btn-primary add-to-cart"
          type="button"
          data-add-to-cart="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `;
}

function renderProducts(products, container) {
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <p class="empty-state">
        No toys found. Try another search or category.
      </p>
    `;
    return;
  }

  container.innerHTML = products.map(createProductCard).join("");
}

function renderHomeProducts() {
  const container = getElement(
    "#featured-products, #product-list, [data-products]"
  );

  if (!container) return;

  const featuredProducts = PRODUCTS.slice(0, 8);
  renderProducts(featuredProducts, container);
}

function renderAllProducts() {
  const container = getElement(
    "#all-products, #products-grid, #product-list, [data-products]"
  );

  if (!container) return;

  const searchInput = getElement(
    "#search-input, #product-search, [data-search]"
  );

  const categorySelect = getElement(
    "#category-filter, #category-select, [data-category-filter]"
  );

  const sortSelect = getElement(
    "#sort-products, #sort-select, [data-sort]"
  );

  let filteredProducts = [...PRODUCTS];

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");

  if (requestedCategory) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === requestedCategory.toLowerCase()
    );
  }

  if (searchInput && searchInput.value.trim()) {
    const query = searchInput.value.trim().toLowerCase();

    filteredProducts = filteredProducts.filter(product =>
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(query)
    );
  }

  if (categorySelect && categorySelect.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.category === categorySelect.value
    );
  }

  if (sortSelect) {
    switch (sortSelect.value) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }
  }

  renderProducts(filteredProducts, container);

  const resultCount = getElement("#result-count");

  if (resultCount) {
    resultCount.textContent =
      `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found`;
  }
}

function renderProductDetails() {
  const container = getElement(
    "#product-details, #single-product, [data-product-details]"
  );

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = getProduct(productId);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Product not found</h2>
        <p>The toy you are looking for may not exist.</p>
        <a class="btn btn-primary" href="products.html">
          Browse Products
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-detail-image">
      <span aria-hidden="true">${product.emoji}</span>
    </div>

    <div class="product-detail-info">
      <p class="product-category">
        ${escapeHTML(product.category)}
      </p>

      <h1>${escapeHTML(product.name)}</h1>

      <p class="product-rating">
        ★ ${product.rating.toFixed(1)} / 5
      </p>

      <div class="product-price">
        <strong>${formatPrice(product.price)}</strong>
        <del>${formatPrice(product.oldPrice)}</del>
      </div>

      <p>${escapeHTML(product.description)}</p>

      <p><strong>Recommended age:</strong> ${escapeHTML(product.age)}</p>

      <label for="detail-quantity">Quantity</label>

      <input
        id="detail-quantity"
        type="number"
        min="1"
        max="99"
        value="1"
      >

      <button
        class="btn btn-primary"
        type="button"
        data-detail-add="${product.id}"
      >
        Add to Cart
      </button>

      <a class="btn btn-secondary" href="products.html">
        Continue Shopping
      </a>
    </div>
  `;
}

function addToCart(productId, quantity = 1) {
  const product = getProduct(productId);

  if (!product) {
    alert("This product could not be found.");
    return;
  }

  const amount = Math.floor(Number(quantity));

  if (!Number.isFinite(amount) || amount < 1 || amount > 99) {
    alert("Please select a quantity between 1 and 99.");
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    if (existingItem.quantity + amount > 99) {
      alert("You can add a maximum of 99 units of one product.");
      return;
    }

    existingItem.quantity += amount;
  } else {
    cart.push({
      id: product.id,
      quantity: amount
    });
  }

  if (saveCart(cart)) {
    updateCartCount();
    alert(`${product.name} added to your cart.`);
  }
}

function changeCartQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === Number(productId));

  if (!item) return;

  item.quantity += change;

  const updatedCart = cart.filter(entry => entry.quantity > 0);

  if (item.quantity > 99) {
    item.quantity = 99;
    alert("Maximum quantity is 99.");
  }

  saveCart(updatedCart);
  renderCart();
  updateCartCount();
}

function removeFromCart(productId) {
  const updatedCart = getCart().filter(
    item => item.id !== Number(productId)
  );

  saveCart(updatedCart);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const container = getElement(
    "#cart-items, #cart-container, [data-cart-items]"
  );

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Discover toys and add your favourites.</p>
        <a class="btn btn-primary" href="products.html">
          Shop Toys
        </a>
      </div>
    `;

    updateCartSummary(0);
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProduct(item.id);

    if (!product) return "";

    return `
      <article class="cart-item">
        <div class="cart-item-image" aria-hidden="true">
          ${product.emoji}
        </div>

        <div class="cart-item-info">
          <h3>${escapeHTML(product.name)}</h3>
          <p>${formatPrice(product.price)} each</p>

          <div class="quantity-controls">
            <button
              type="button"
              aria-label="Decrease quantity"
              data-quantity-change="${product.id}"
              data-change="-1"
            >−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              aria-label="Increase quantity"
              data-quantity-change="${product.id}"
              data-change="1"
            >+</button>
          </div>

          <button
            type="button"
            class="remove-item"
            data-remove-cart="${product.id}"
          >
            Remove
          </button>
        </div>

        <strong>${formatPrice(product.price * item.quantity)}</strong>
      </article>
    `;
  }).join("");

  updateCartSummary(getCartTotal());
}

function updateCartSummary(total) {
  const subtotal = getElement("#cart-subtotal");
  const shipping = getElement("#cart-shipping");
  const grandTotal = getElement("#cart-total");

  const shippingCost = total === 0 || total >= 999 ? 0 : 49;

  if (subtotal) subtotal.textContent = formatPrice(total);
  if (shipping) {
    shipping.textContent = shippingCost === 0
      ? "FREE"
      : formatPrice(shippingCost);
  }

  if (grandTotal) {
    grandTotal.textContent = formatPrice(total + shippingCost);
  }
}

function renderCheckoutSummary() {
  const container = getElement(
    "#checkout-items, [data-checkout-items]"
  );

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="products.html">Continue shopping</a>
    `;
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProduct(item.id);

    if (!product) return "";

    return `
      <div class="checkout-item">
        <span>${escapeHTML(product.name)} × ${item.quantity}</span>
        <strong>${formatPrice(product.price * item.quantity)}</strong>
      </div>
    `;
  }).join("");

  updateCartSummary(getCartTotal());
}

function handleCheckout(event) {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty. Please add a toy before checkout.");
    window.location.href = "products.html";
    return;
  }

  const formData = new FormData(form);

  const orderId = "B2K" + Date.now().toString().slice(-8);

  const total = getCartTotal();
  const shipping = total >= 999 ? 0 : 49;

  const order = {
    id: orderId,
    date: new Date().toISOString(),
    items: cart,
    subtotal: total,
    shipping,
    total: total + shipping,
    customer: {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      address: formData.get("address") || "",
      city: formData.get("city") || "",
      pincode: formData.get("pincode") || ""
    },
    status: "Order placed (demo)"
  };

  const orders = getStorage(ORDER_KEY, []);
  orders.push(order);

  if (!setStorage(ORDER_KEY, orders)) return;

  saveCart([]);

  alert(
    `Demo order placed successfully!\n\nOrder ID: ${orderId}\nTotal: ${formatPrice(order.total)}\n\nThis is a demonstration store. No real payment was taken.`
  );

  window.location.href =
    `track-order.html?id=${encodeURIComponent(orderId)}`;
}

function handleContactForm(event) {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const formData = new FormData(form);

  const message = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    subject: formData.get("subject") || "",
    message: formData.get("message") || "",
    date: new Date().toISOString()
  };

  const messages = getStorage(CONTACT_KEY, []);
  messages.push(message);

  if (!setStorage(CONTACT_KEY, messages)) return;

  alert(
    "Your message has been saved in this browser for demonstration purposes. It has not been emailed to the store."
  );

  form.reset();
}

function renderOrderTracking() {
  const container = getElement(
    "#tracking-result, [data-tracking-result]"
  );

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const initialId = params.get("id");

  const input = getElement("#order-id");

  if (input && initialId) {
    input.value = initialId;
  }

  if (!initialId) return;

  displayOrder(initialId, container);
}

function displayOrder(orderId, container) {
  const orders = getStorage(ORDER_KEY, []);

  const order = orders.find(item =>
    item.id.toLowerCase() === String(orderId).trim().toLowerCase()
  );

  if (!order) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Order not found</h2>
        <p>
          Check the order ID. Orders created in this demo are saved
          only in the browser where checkout was completed.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="tracking-card">
      <h2>Order Details</h2>

      <p><strong>Order ID:</strong> ${escapeHTML(order.id)}</p>

      <p>
        <strong>Order date:</strong>
        ${new Date(order.date).toLocaleString("en-IN")}
      </p>

      <p><strong>Status:</strong> ${escapeHTML(order.status)}</p>

      <h3>Items</h3>

      <ul>
        ${order.items.map(item => {
          const product = getProduct(item.id);

          return product
            ? `<li>${escapeHTML(product.name)} × ${item.quantity}</li>`
            : "";
        }).join("")}
      </ul>

      <p><strong>Total:</strong> ${formatPrice(order.total)}</p>

      <p class="notice">
        Demonstration order only. This website does not have a
        real delivery or payment integration.
      </p>
    </div>
  `;
}

function setupCategoryLinks() {
  getElements("[data-category-link]").forEach(link => {
    link.addEventListener("click", event => {
      const category = link.getAttribute("data-category-link");

      if (!category) return;

      event.preventDefault();

      window.location.href =
        `products.html?category=${encodeURIComponent(category)}`;
    });
  });
}

function setupMobileNavigation() {
  const toggle = getElement(
    "#menu-toggle, [data-menu-toggle]"
  );

  const navigation = getElement(
    "#main-nav, .main-nav, [data-main-nav]"
  );

  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function setupSearchAndFilters() {
  const searchInput = getElement(
    "#search-input, #product-search, [data-search]"
  );

  const categorySelect = getElement(
    "#category-filter, #category-select, [data-category-filter]"
  );

  const sortSelect = getElement(
    "#sort-products, #sort-select, [data-sort]"
  );

  if (searchInput) {
    searchInput.addEventListener("input", renderAllProducts);
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", renderAllProducts);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", renderAllProducts);
  }
}

function setupGlobalClickHandlers() {
  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-to-cart]");

    if (addButton) {
      addToCart(addButton.dataset.addToCart);
      return;
    }

    const detailButton = event.target.closest("[data-detail-add]");

    if (detailButton) {
      const quantityInput = getElement("#detail-quantity");
      const quantity = quantityInput ? quantityInput.value : 1;

      addToCart(detailButton.dataset.detailAdd, quantity);
      return;
    }

    const removeButton = event.target.closest("[data-remove-cart]");

    if (removeButton) {
      removeFromCart(removeButton.dataset.removeCart);
      return;
    }

    const quantityButton = event.target.closest(
      "[data-quantity-change]"
    );

    if (quantityButton) {
      changeCartQuantity(
        quantityButton.dataset.quantityChange,
        Number(quantityButton.dataset.change)
      );
    }
  });
}

function setupForms() {
  const checkoutForm = getElement(
    "#checkout-form, [data-checkout-form]"
  );

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckout);
  }

  const contactForm = getElement(
    "#contact-form, [data-contact-form]"
  );

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  const trackingForm = getElement(
    "#tracking-form, [data-tracking-form]"
  );

  if (trackingForm) {
    trackingForm.addEventListener("submit", event => {
      event.preventDefault();

      const input = getElement("#order-id");
      const result = getElement(
        "#tracking-result, [data-tracking-result]"
      );

      if (input && result && input.value.trim()) {
        displayOrder(input.value, result);
      }
    });
  }
}

function setupNewsletterForm() {
  const form = getElement(
    "#newsletter-form, [data-newsletter-form]"
  );

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = form.querySelector('input[type="email"]');

    if (!input || !input.checkValidity()) {
      input?.reportValidity();
      return;
    }

    alert(
      "Thank you for your interest! Newsletter subscriptions are not connected to a mailing service yet."
    );

    form.reset();
  });
}

function initializeStore() {
  updateCartCount();
  renderHomeProducts();
  renderAllProducts();
  renderProductDetails();
  renderCart();
  renderCheckoutSummary();
  renderOrderTracking();

  setupCategoryLinks();
  setupMobileNavigation();
  setupSearchAndFilters();
  setupGlobalClickHandlers();
  setupForms();
  setupNewsletterForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStore);
} else {
  initializeStore();
}
```
