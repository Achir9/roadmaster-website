let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartStorage();
  alert("Added to cart");
}

function increaseQty(index) {
  cart[index].quantity += 1;
  updateCartStorage();
  loadCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCartStorage();
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartStorage();
  loadCart();
}

function loadCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  let total = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <span>₹${item.price}</span>
        <div class="qty-controls">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">🗑</button>
      </div>
    `;
  });

  document.getElementById("total").textContent = total;
}

function updateCartCount() {
  let countElement = document.getElementById("cart-count");
  if (!countElement) return;

  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElement.textContent = totalQty;
}

function checkout() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let message = "Order Details:\n";

  cart.forEach(item => {
    message += `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
  });

  message += `\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;

  let encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/919462125472?text=${encodedMessage}`, "_blank");
}

// Initialize cart display
updateCartCount();
loadCart();
