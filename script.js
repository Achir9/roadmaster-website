let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    if (!cartItems) return;

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

    totalDisplay.innerText = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function orderOnWhatsApp() {
    const name = document.getElementById("customerName").value;
    const phoneInput = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    if (!name || !phoneInput || !address) {
        alert("Please fill all details");
        return;
    }

    let message = "🚴 Roadmaster Order\n\n";
    message += "Name: " + name + "\n";
    message += "Phone: " + phoneInput + "\n";
    message += "Address: " + address + "\n\n";

    let total = 0;

    cart.forEach(item => {
        message += "- " + item.name + " ₹" + item.price + "\n";
        total += item.price;
    });

    message += "\nTotal: ₹" + total;

    let phone = "919462125472"; // PUT YOUR NUMBER HERE

    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
