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
        // Add new product to the cart
        const itemDetails = {
            productName: name_product.innerHTML,
            promotionalPrice: calul_prix_promotion,
            quantity: quantity,
            totalPrice: totalItemPrice.toFixed(2)
        };
        cartItems.push(itemDetails);
    }

    // Save the updated cart array to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Display updated cart total
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

// Sélectionnez toutes les images avec la classe "zoomable"
const zoomableImages = document.querySelectorAll('.zoomable');

// Zone modale et image zoomée
const zoomModal = document.getElementById('zoomModal');
const zoomedImage = document.getElementById('zoomedImage');

// Fonction pour afficher l'image en zoom
zoomableImages.forEach(image => {
    image.addEventListener('click', () => {
        zoomedImage.src = image.src; // Définit la source de l'image zoomée sur celle cliquée
        zoomModal.classList.remove('hidden'); // Affiche le modal
    });
});

// Fonction pour fermer le zoom
// Fonction pour charger les images via l'API
function loadImagesFromAPI() {
    fetch('../data/data.json') // Remplacez l'URL par celle de votre API
        .then(response => response.json())
        .then(data => {
            // Assurez-vous que les données de l'API contiennent les images nécessaires
            if (data && data.length > 0) {
                document.getElementById('prod_zome_1').src = data[0].image_urls[0];
                document.getElementById('prod_zome_2').src = data[0].image_urls[1];
                document.getElementById('prod_zome_3').src = data[0].image_urls[2];
                document.getElementById('prod_zome_4').src = data[0].image_urls[3];

                // Ajouter les événements de zoom après le chargement des images
                addZoomEventListeners();
            }
        })
        .catch(error => console.log("Erreur lors du chargement des images :", error));
}

// Fonction pour ajouter des écouteurs d'événements de zoom aux images
function addZoomEventListeners() {
    const zoomableImages = document.querySelectorAll('.zoomable');
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImage = document.getElementById('zoomedImage');

    zoomableImages.forEach(image => {
        image.addEventListener('click', () => {
            zoomedImage.src = image.src; // Définit la source de l'image zoomée sur celle cliquée
            zoomModal.classList.remove('hidden'); // Affiche le modal
        });
    });
}

// Fonction pour fermer le zoom
function closeZoom() {
    document.getElementById('zoomModal').classList.add('hidden'); // Cache le modal
}

// Appel de la fonction pour charger les images depuis l'API
loadImagesFromAPI();




// localStorage.clear()

