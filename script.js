let cart = [];

function addToCart(productName, productPrice) {

    // Check if product already exists
    let existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity++;

    } else {

        // Add new product
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

    }

    updateCartCount();
    displayCart();
}


function updateCartCount() {

    let totalQuantity = 0;

    cart.forEach(function(product) {
        totalQuantity += product.quantity;
    });

    document.getElementById("cart-count").textContent = totalQuantity;
}


function displayCart() {

    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product, index) {

        let item = document.createElement("div");

        let subtotal = product.price * product.quantity;

        total += subtotal;

        item.innerHTML = `
            <div class="cart-item">

                <div>
                    <h3>${product.name}</h3>
                    <p>₹${product.price} × ${product.quantity}</p>
                    <p>Subtotal: ₹${subtotal}</p>
                </div>

                <div class="quantity-buttons">

                    <button onclick="decreaseQuantity(${index})">−</button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

            </div>
        `;

        cartItems.appendChild(item);

    });

    document.getElementById("cart-total").textContent = total;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();
    displayCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCartCount();
    displayCart();
}
