// Function to get the URL parameter
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
    const messageDiv = document.createElement("div");
    messageDiv.id = "promotionMessage";
    messageDiv.style.color = "green";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.marginTop = "10px";
    messageDiv.textContent = "Vous avez reçu une promotion de 1% !";

    document.body.appendChild(messageDiv);

    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Function to add the item to the cart and calculate the total
function addToCart() {
    const quantityInput = document.getElementById("quantityInput");
    const quantity = parseInt(quantityInput.value);
    
    // Calculate base total item price
    let totalItemPrice = quantity * parseFloat(calul_prix_promotion); 
    
    // Apply additional 1% discount if quantity is 3 or more
    if (quantity ==3) {
        totalItemPrice *= 0.99; // Apply 1% discount
        totalItemPrice = parseFloat(totalItemPrice.toFixed(2)); // Round to 2 decimal places

        // Show promotion message
        showPromotionMessage();
    }

    cartTotal += totalItemPrice; // Add to cart total

    // Save cart total to localStorage
    localStorage.setItem("cartTotal", cartTotal);

    // Display cart total in the specified span
    document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;

    // Log to verify calculation
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


