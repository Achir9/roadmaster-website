// Get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart function
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalPrice.innerText = "Total: ₹" + total;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// WhatsApp order
function orderOnWhatsApp() {
    let message = "Hello Roadmaster, I want to order:\n";
    let total = 0;

    cart.forEach(item => {
        message += item.name + " - ₹" + item.price + "\n";
        total += item.price;
    });

    message += "\nTotal: ₹" + total;

    let phone = "919876543210"; // Replace with your number
    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
