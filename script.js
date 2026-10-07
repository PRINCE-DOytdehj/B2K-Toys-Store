```javascript
/* =========================
   B2K TOYS STORE
   CART SYSTEM
========================= */


/* LOAD CART FROM LOCAL STORAGE */

let cart = JSON.parse(localStorage.getItem("b2kCart")) || [];


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "b2kCart",
        JSON.stringify(cart)
    );
}


/* =========================
   ADD TO CART
========================= */

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
}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let totalQuantity = 0;


    cart.forEach(function(product) {

        totalQuantity += product.quantity;

    });


    document.getElementById("cart-count").textContent =
        totalQuantity;
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    let cartItems =
        document.getElementById("cart-items");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("cart-total").textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(product, index) {

        let subtotal =
            product.price * product.quantity;


        total += subtotal;


        let item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <h3>${product.name}</h3>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Subtotal: ₹${subtotal}
                </p>

            </div>


            <div class="quantity-buttons">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>


                <span>
                    ${product.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    🗑️ Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    document.getElementById("cart-total").textContent =
        total;
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;


    saveCart();

    updateCartCount();

    displayCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

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
   REMOVE PRODUCT
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);


    saveCart();

    updateCartCount();

    displayCart();
}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

    let searchInput =
        document.getElementById("search-input")
        .value
        .toLowerCase()
        .trim();


    let products =
        document.querySelectorAll(".product-card");


    let foundProducts = 0;


    products.forEach(function(product) {

        let productName =
            product
            .getAttribute("data-name")
            .toLowerCase();


        if (productName.includes(searchInput)) {

            product.style.display = "";

            foundProducts++;

        } else {

            product.style.display = "none";

        }

    });


    let noProducts =
        document.getElementById("no-products");


    if (foundProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total =
        cart.reduce(function(sum, product) {

            return sum +
                (product.price * product.quantity);

        }, 0);


    alert(
        "Order placed successfully!\n\n" +
        "Total Amount: ₹" + total +
        "\n\nThank you for shopping at B2K Toys Store!"
    );


    cart = [];


    saveCart();

    updateCartCount();

    displayCart();
}


/* =========================
   INITIALIZE WEBSITE
========================= */

updateCartCount();

displayCart();
```
