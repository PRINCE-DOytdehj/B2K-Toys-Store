// ========================================
// B2K TOYS - CART SYSTEM
// ========================================


// Load cart from browser storage

let cart =
    JSON.parse(
        localStorage.getItem("b2kCart")
    ) || [];



// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "b2kCart",
        JSON.stringify(cart)
    );

}



// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(
    productName,
    productPrice
) {

    let existingProduct =
        cart.find(function(product) {

            return product.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            name: productName,

            price: productPrice,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    displayCart();


    alert(
        productName +
        " added to cart!"
    );

}



// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    let cartCount =
        document.getElementById(
            "cart-count"
        );


    if (!cartCount) {

        return;

    }


    let totalQuantity = 0;


    cart.forEach(function(product) {

        totalQuantity +=
            product.quantity;

    });


    cartCount.textContent =
        totalQuantity;

}



// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    let cartItems =
        document.getElementById(
            "cart-items"
        );


    let cartTotal =
        document.getElementById(
            "cart-total"
        );


    // This prevents errors on homepage

    if (
        !cartItems ||
        !cartTotal
    ) {

        return;

    }


    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;


        cartTotal.textContent = "0";


        return;

    }


    let total = 0;



    // Display every product

    cart.forEach(
        function(product, index) {


            let subtotal =
                product.price *
                product.quantity;


            total += subtotal;


            let cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Price:
                        ₹${product.price}
                    </p>

                    <p>
                        Subtotal:
                        ₹${subtotal}
                    </p>

                </div>


                <div class="quantity-buttons">

                    <button
                        onclick="
                            decreaseQuantity(
                                ${index}
                            )
                        "
                    >
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="
                            increaseQuantity(
                                ${index}
                            )
                        "
                    >
                        +
                    </button>


                    <button
                        class="remove-button"
                        onclick="
                            removeFromCart(
                                ${index}
                            )
                        "
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    cartTotal.textContent =
        total;

}



// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity++;


    saveCart();

    updateCartCount();

    displayCart();

}



// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    }

    else {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    updateCartCount();

    displayCart();

}



// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(index) {

    if (!cart[index]) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCartCount();

    displayCart();

}



// ========================================
// SEARCH PRODUCTS
// ========================================

function searchProducts() {

    let searchInput =
        document.getElementById(
            "search"
        );


    if (!searchInput) {

        return;

    }


    let searchValue =
        searchInput.value
        .toLowerCase()
        .trim();


    let products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(
        function(product) {


            let productName =
                product.dataset.name
                .toLowerCase();


            if (
                productName.includes(
                    searchValue
                )
            ) {

                product.style.display =
                    "";

            }

            else {

                product.style.display =
                    "none";

            }

        }
    );

}



// ========================================
// CATEGORY FILTER
// ========================================

function filterCategory(
    category,
    clickedButton
) {


    let products =
        document.querySelectorAll(
            ".product-card"
        );


    let buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    // Remove active from all buttons

    buttons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );


    // Add active to clicked button

    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }


    // Show/hide products

    products.forEach(
        function(product) {


            let productCategory =
                product.dataset.category;


            if (
                category === "all" ||
                productCategory === category
            ) {

                product.style.display =
                    "";

            }

            else {

                product.style.display =
                    "none";

            }

        }
    );

}



// ========================================
// LOAD CATEGORY FROM HOMEPAGE
// ========================================

function loadCategoryFromURL() {


    let params =
        new URLSearchParams(
            window.location.search
        );


    let category =
        params.get(
            "category"
        );


    if (!category) {

        return;

    }


    let button =
        document.querySelector(
            '.filter-btn[data-category="' +
            category +
            '"]'
        );


    filterCategory(
        category,
        button
    );

}



// ========================================
// CHECKOUT
// ========================================

function checkout() {


    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );


        return;

    }


    let total =
        cart.reduce(
            function(
                sum,
                product
            ) {

                return sum +
                    (
                        product.price *
                        product.quantity
                    );

            },
            0
        );


    alert(
        "Order placed successfully!\n\n" +
        "Total Amount: ₹" +
        total +
        "\n\n" +
        "Thank you for shopping at " +
        "B2K Toys Store!"
    );


    cart = [];


    saveCart();

    updateCartCount();

    displayCart();

}



// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        loadCategoryFromURL();

    }
);
