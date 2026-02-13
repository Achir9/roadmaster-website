let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert("Item added to cart");
}

// LOAD CART
function loadCart() {

    let cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
                <hr>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

// INCREASE
function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    loadCart();
}

// DECREASE
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadCart();
}

// REMOVE
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// WHATSAPP CHECKOUT
function checkout() {

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Order Details:\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });

    let encodedMessage = encodeURIComponent(message);

    window.location.href =
        `https://wa.me/919876543210?text=${encodedMessage}`;
}

// RUN ON PAGE LOAD
loadCart();
