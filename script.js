let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  let total = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach((item, index) => {

    let quantity = item.quantity || 1;  // ✅ FIX

    total += item.price * quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <span>₹${item.price}</span>
        <span>Qty: ${quantity}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}


  let total = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <span>₹${item.price}</span>
        <span>Qty: ${item.quantity}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let message = "Order Details:%0A";

  cart.forEach(item => {
    message += `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}%0A`;
  });

  message += `%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;

  window.open(`https://wa.me/919462125472?text=${message}`);
}

loadCart();

