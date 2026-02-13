let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

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
        alert("Please fill all customer details!");
        return;
    }

    let message = "🚴 Roadmaster Order\n\n";
    message += "Customer Name: " + name + "\n";
    message += "Customer Phone: " + phoneInput + "\n";
    message += "Address: " + address + "\n\n";
    message += "Ordered Items:\n";

    let total = 0;

    cart.forEach(item => {
        message += "- " + item.name + " ₹" + item.price + "\n";
        total += item.price;
    });

    message += "\nTotal Amount: ₹" + total;
    message += "\n\nPayment Screenshot Attached Separately.";

    let phone = "91XXXXXXXXXX"; // PUT YOUR NUMBER HERE

    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
