let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");
}

// LOAD CART ITEMS
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
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
            <hr>
        `;
    });

    document.getElementById("total").innerText = total;
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
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
        `https://wa.me/919462125472?text=${encodedMessage}`;
}

loadCart();
