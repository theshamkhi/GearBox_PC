function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

let maxQuantity = 1; // Default value before loading data
let itemPrice = 0; // Original item price
let cartTotal = 0; // Total price in the cart
let calul_prix_promotion = 0; // Promotional price for the item

// Function to load cart data from localStorage on page load
function loadCartData() {
    const savedCartTotal = localStorage.getItem("cartTotal");
    if (savedCartTotal) {
        cartTotal = parseFloat(savedCartTotal);
        document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;
    }
}

// Main function to load data and set up the interface
function fetchDataAndDisplay() {
    const urlId = getURLParameter('id');
    console.log(urlId);

    if (!urlId) {
        console.log("No ID in URL, checking again in a second.");
        return;
    }

    fetch('../data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading data.json file");
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item) => {
                if (item.id == urlId) {
                    // Update product images and information
                    img_prod_first.src = item.image_urls[2];
                    Full_image.src = item.image_urls[0];
                    quantite.innerHTML = `${item.qt}`;
                    Prix.innerHTML = ` MAD ${item.price} `;

                    // Set itemPrice to the loaded item price
                    itemPrice = item.price;

                    // Calculate promotional price
                    calul_prix_promotion = ((item.price) - item.price * 0.39).toFixed(2);
                    prix_promotion.innerHTML = ` MAD ${calul_prix_promotion}`;
                    name_product.innerHTML = item.name;
                    description_product.innerHTML = item.short_description;

                    // Save product details to localStorage (part of your existing code)
                    localStorage.setItem("productName", item.name);
                    localStorage.setItem("productDescription", item.short_description);
                    localStorage.setItem("productImage", item.image_urls[0]);

                    // Save short_description and images array to localStorage
                    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

                    // Create an updated product object
                    const updatedProduct = {
                        productName: item.name,
                        productDescription: item.short_description,
                        productImages: item.image_urls,
                        price: item.price,
                        qt: item.qt
                    };

                    // Add or update product in the localStorage array
                    const productIndex = storedProducts.findIndex(product => product.productName === item.name);
                    if (productIndex >= 0) {
                        // Update the existing product
                        storedProducts[productIndex] = updatedProduct;
                    } else {
                        // Add a new product
                        storedProducts.push(updatedProduct);
                    }

                    // Save the updated products array back to localStorage
                    localStorage.setItem("products", JSON.stringify(storedProducts));

                    // Set maxQuantity based on item quantity
                    maxQuantity = item.qt;
                    document.getElementById("availableQuantity").textContent = maxQuantity;

                    // Update other images and descriptions
                    prod_zome_1.src = item.image_urls[0];
                    prod_zome_2.src = item.image_urls[2];
                    prod_zome_3.src = item.image_urls[0];
                    prod_zome_4.src = item.image_urls[2];
                    img_prod_second.src = item.image_urls[0];
                    img_prod_third.src = item.image_urls[2];
                    img_prod_for.src = item.image_urls[0];

                    // Display specific descriptions in the modal
                    addDescriptionElement("part_type", "Type de pièce");
                    addDescriptionElement("Socket", "Socket");
                    addDescriptionElement("GPU Model", "Modèle GPU");
                    addDescriptionElement("Memory", "Mémoire");
                    addDescriptionElement("Capacity", "Capacité");
                    addDescriptionElement("Interface", "Interface");
                    addDescriptionElement("Speed", "Vitesse");
                    addDescriptionElement("Voltage", "Voltage");
                    addDescriptionElement("Latency", "Latence");

                    // Log current quantity in the console
                    logCurrentQuantity();
                }
            });
        })
        .catch(error => console.log("Error:", error));

    // Quantity control with + and - buttons
    document.getElementById("decreaseQuantityBtn").onclick = decreaseQuantity;
    document.getElementById("increaseQuantityBtn").onclick = increaseQuantity;
    document.getElementById("addToCartBtn").onclick = addToCart;
}

// Function to display a temporary promotion message
function showPromotionMessage() {
    const modal = document.createElement("div");
    modal.id = "promotionModal";
    modal.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-800", "bg-opacity-50", "flex", "items-center", "justify-center");

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-6", "rounded", "shadow-lg", "text-center");

    const message = document.createElement("p");
    message.classList.add("text-green-500", "font-bold", "text-lg");
    message.textContent = "Vous avez reçu une promotion de 1% !";

    modalContent.appendChild(message);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Remove the modal after 3 seconds
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 3000);
}

// Function to add the item to the cart and calculate the total
function addToCart() {
    const quantityInput = document.getElementById("quantityInput");
    const quantity = parseInt(quantityInput.value);

    // Calculate base total item price
    let totalItemPrice = quantity * parseFloat(calul_prix_promotion);

    // Apply additional 1% discount if quantity is 3 or more
    if (quantity == 3) {
        totalItemPrice *= 0.99; // Apply 1% discount
        totalItemPrice = parseFloat(totalItemPrice.toFixed(2)); // Round to 2 decimal places

        // Show promotion message
        showPromotionMessage();
    }

    // Update cart total
    cartTotal += totalItemPrice;
    localStorage.setItem("cartTotal", cartTotal);

    // Retrieve the current cart items or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.productName === name_product.innerHTML);

    if (existingItemIndex >= 0) {
        // Update quantity and total price if the product exists in the cart
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].totalPrice = (cartItems[existingItemIndex].quantity * parseFloat(calul_prix_promotion)).toFixed(2);
    } else {
        // Add new product to the cart with additional properties
        const itemDetails = {
            productName: name_product.innerHTML,
            promotionalPrice: calul_prix_promotion,
            quantity: quantity,
            totalPrice: totalItemPrice.toFixed(2),
            shortDescription: description_product.innerHTML, // Adding short description
            images: [Full_image.src] // Adding the main image or an array of images if needed
        };
        cartItems.push(itemDetails);
    }

    // Save the updated cart array to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Display updated cart total
    document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;

    // Log to verify calculation and structure
    console.log("Added to Cart:", cartItems);
    console.log("Added Quantity:", quantity, "Unit Price (Promotion):", calul_prix_promotion, "Total Item Price:", totalItemPrice, "Cart Total:", cartTotal);
}

// Toggle modal visibility
function toggleModal() {
    const modal = document.getElementById("descriptionModal");
    modal.classList.toggle("hidden");
}

// Function to add description elements to the modal
function addDescriptionElement(key, value) {
    const contentDiv = document.getElementById("descriptionContent");
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("text-black");
    descriptionElement.innerHTML = `<strong>${key}:</strong> ${value}`;
    contentDiv.appendChild(descriptionElement);
}

// Log the current quantity
function logCurrentQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    console.log("Current Quantity:", quantityInput.value);
}

// Quantity control functions with + and - buttons
function decreaseQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        logCurrentQuantity(); // Log new quantity in the console
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity < maxQuantity) {
        currentQuantity++;
        quantityInput.value = currentQuantity;
        logCurrentQuantity(); // Log new quantity in the console
    }
}

// Load cart data on page load
loadCartData();

// Start loading data once the ID is retrieved
const checkInterval = setInterval(() => {
    const urlId = getURLParameter('id');

    if (urlId) {
        clearInterval(checkInterval);
        fetchDataAndDisplay();
    } else {
        console.log("Checking for ID every second...");
    }
}, 1000);

localStorage.clear();
