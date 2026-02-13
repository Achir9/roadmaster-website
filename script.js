// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price) {

    // Check if item already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
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

// Load cart items
function loadCart() {

    let container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        // Safety check (prevents null/undefined issues)
        if (!item.quantity) item.quantity = 1;

        total += item.price * item.quantity;

        container.innerHTML += `
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

// Increase quantity
function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    loadCart();
}

// Decrease quantity
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// Clear cart manually (optional but useful)
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    loadCart();
}

// WhatsApp checkout
function checkout() {

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Order Details:%0A";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}%0A`;
    });

    // Replace with YOUR WhatsApp number (no +, no spaces)
    let phoneNumber = "919876543210";

    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadCart);
