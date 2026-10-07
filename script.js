let cartCount = 0;

let cart = [];

function addToCart(productName, productPrice) {

    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    cart.push({
        name: productName,
        price: productPrice
    });

    displayCart();
}

function displayCart() {

    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product) {

        let item = document.createElement("p");

        item.textContent = product.name + " - ₹" + product.price;

        cartItems.appendChild(item);

        total = total + product.price;

    });

    document.getElementById("cart-total").textContent = total;
}
