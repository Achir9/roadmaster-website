const products = [
    {
        name: "Carbon Road Bike",
        price: 1200,
        image: "images/cycle.jpeg"
    },
    {
        name: "Magene T200 Smart Trainer",
        price: 650,
        image: "images/MageneT200SmartTrainer.jpeg"
    },
    {
        name: "Smart Bike Trainer",
        price: 500,
        image: "images/SmartBikeTrainer.jpeg"
    },
    {
        name: "Smart Brake Rear Light",
        price: 80,
        image: "images/Smartbrakerearlight.jpeg"
    },
    {
        name: "LED Rear Light",
        price: 40,
        image: "images/rearlight.jpeg"
    },
    {
        name: "Smart Radar Tail Light",
        price: 150,
        image: "images/smartradartaillight.jpeg"
    }
];

const productList = document.getElementById("product-list");

products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button>Add to Cart</button>
    `;

    productList.appendChild(productCard);
});
