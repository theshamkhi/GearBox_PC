/*Page Panier*/

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

function toggleCart() {
    const cartSidebar = document.getElementById("CartBar");
    const isVisible = cartSidebar.style.transform === "translateX(0px)";
    
    if (isVisible) {
        cartSidebar.style.transform = "translateX(100%)";
    } else {
        cartSidebar.style.transform = "translateX(0)";
        CartSidebar(); 
    }
}

// Common function to update the Cart Sidebar on all pages
function CartSidebar() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const CartSidebarDivs = document.querySelectorAll('.CartSidebarDiv'); // Target all CartSidebarDiv elements

    // Clear the product list in the sidebar before updating
    CartSidebarDivs.forEach(CartSidebarDiv => {
        CartSidebarDiv.innerHTML = ""; // Clear each CartSidebarDiv
    });

    if (cartItems.length === 0) {
        // If no items in the cart, display a message
        CartSidebarDivs.forEach(CartSidebarDiv => {
            CartSidebarDiv.innerHTML = "<p class='text-gray-500'>Votre panier est vide.</p>";
        });
    } else {
        // Loop through each cart item and create HTML to display it in the sidebar
        cartItems.forEach(item => {
            const sidebarItemHTML = `
                <div class="flex items-center space-x-4 border-b pb-4">
                    <img src="${item.productImage || 'https://via.placeholder.com/80'}" alt="${item.productName}" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-bold text-white">${item.productName}</h4>
                        <div class="flex justify-between items-center">
                            <p class="text-white text-sm">${item.priceTotal} MAD</p>
                            <button class="text-md text-white hover:text-red-600" title="Remove" onclick="RemoveItem(${item.id})">&#128465;</button>
                        </div>
                    </div>
                </div>
            `;
            // Add the item HTML to each CartSidebarDiv
            CartSidebarDivs.forEach(CartSidebarDiv => {
                CartSidebarDiv.innerHTML += sidebarItemHTML;
            });
        });
    }
}

// Fonction pour charger les produits du panier depuis le localStorage et afficher
async function DisplayItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cartItemsContainer");

    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    // Loop through each cart item
    for (let item of cartItems) {
        // Fetch product data (qt) dynamically for each item in the cart
        const availableQuantity = await getData(item.productName); // Fetch available quantity from data.json
        const currentQuantity = item.quantity || 0; // The quantity in the cart for this item
        const remainingQuantity = availableQuantity - currentQuantity;

        const itemHTML = `
            <div class="border-b rounded-lg bg-white shadow-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <!-- Product Image -->
                <div class="col-span-1">
                    <img src="${item.productImage}" alt="${item.productName}" class="w-full h-full object-cover max-h-56 md:max-h-64">
                </div>
                
                <!-- Product Details -->
                <div class="col-span-1 md:col-span-2 flex flex-col space-y-3 p-4">
                    <h3 class="text-base font-medium mb-3">${item.productName}</h3>
                    <p class="text-gray-600 text-sm">${item.shortDescription}</p>
                    <p class="text-lg font-semibold">${item.priceTotal} MAD</p>
                    
                    <!-- Quantity Controls and Available Quantity -->
                    <div class="flex flex-col md:flex-row justify-between items-center mt-4 space-y-3 md:space-y-0">
                        <div class="flex items-center space-x-2">
                            <button aria-label="Decrease quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100" onclick="PlusQ(${item.id})">-</button>
                            <input type="text" value="${currentQuantity}" class="w-12 text-center border rounded-md" aria-label="Quantity" disabled>
                            <button aria-label="Increase quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100" onclick="MinusQ(${item.id}, ${availableQuantity})">+</button>
                        </div>
                        <p class="text-sm text-gray-500 mt-2 md:mt-0">Quantité disponible : ${remainingQuantity}</p>
                        
                        <!-- Remove Button -->
                        <button class="text-red-500 text-xl hover:text-red-600 transition duration-150" title="Retirer" onclick="RemoveItem(${item.id})">&#128465;</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    }

    // Call the function to update the cart summary
    Summary();
}

// Fonction pour calculer le sous-total et afficher le résumé dans la div
function Summary() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let subTotal = 0;
    cartItems.forEach(item => {
        subTotal += parseFloat(item.priceTotal); // Somme des prix totaux des produits
    });

    const shippingCost = 21.30; // Frais de livraison fixes
    const totalEstimated = subTotal + shippingCost; // Total estimé = sous-total + frais de livraison

    // Summary
    document.getElementById("subtotal").textContent = `${subTotal.toFixed(2)} MAD`;
    document.getElementById("shippingCost").textContent = `${shippingCost.toFixed(2)} MAD`;
    document.getElementById("totalEstimated").textContent = `${totalEstimated.toFixed(2)} MAD`;
}


// Fonction pour récupérer la quantité disponible du produit depuis le fichier JSON
function getData(productName) {
    return fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(item => item.name === productName);
            if (product) {
                return product.qt; // Retourne la quantité du produit par son nom
            } else {
                console.error("Produit non trouvé");
                return 0;
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données du produit:", error);
            return 0;
        });
}

// Fonction pour diminuer la quantité d'un produit dans le panier
function PlusQ(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex >= 0 && cartItems[itemIndex].quantity > 1) {
        
        cartItems[itemIndex].quantity--;
        cartItems[itemIndex].priceTotal = (cartItems[itemIndex].quantity * parseFloat(cartItems[itemIndex].unitPrice)).toFixed(2);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        DisplayItems();
    }
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function MinusQ(itemId, availableQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
        const currentQuantity = cartItems[itemIndex].quantity;

        if (currentQuantity < availableQuantity) {
            cartItems[itemIndex].quantity++;
            cartItems[itemIndex].priceTotal = (cartItems[itemIndex].quantity * parseFloat(cartItems[itemIndex].unitPrice)).toFixed(2);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            DisplayItems();
        } else {
            alert("Quantité maximale atteinte !");
        }
    }
}

// Fonction pour supprimer un produit du panier
function RemoveItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    DisplayItems();
}

// Fonction pour charger les produits du panier au chargement de la page
DisplayItems();
