// Fonction pour récupérer un paramètre URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

let maxQuantity = 1; // Valeur par défaut avant le chargement des données
let itemPrice = 0; // Prix de l'article (pour une quantité de 1)
let cartTotal = 0; // Prix total dans le panier
let priceTotal = 0; // Prix total de l'article (calculé en fonction de la quantité)
let calul_prix_promotion = 0; // Prix promotionnel de l'article

// Fonction pour charger les données du panier depuis le localStorage au chargement de la page
function loadCartData() {
    const savedCartTotal = localStorage.getItem("cartTotal");
    if (savedCartTotal) {
        cartTotal = parseFloat(savedCartTotal);
        // document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;
    }
}

// Fonction principale pour charger les données et configurer l'interface
function fetchDataAndDisplay() {
    const urlId = getURLParameter('id');
    console.log(urlId);

    if (!urlId) {
        console.log("Pas d'ID dans l'URL, vérification dans une seconde.");
        return;
    }

    fetch('../data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du fichier data.json");
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item) => {
                if (item.id == urlId) {
                    // Mise à jour des images et des informations produit
                    img_prod_first.src = item.image_urls[2];
                    Full_image.src = item.image_urls[0];
                    quantite.innerHTML = `${item.qt}`;
                    Prix.innerHTML = ` MAD ${item.price} `;

                    // 

// Fonction pour changer l'image principale
function changeMainImage(direction) {
    const imageUrls = JSON.parse(localStorage.getItem("images")) || [];
    let currentIndex = imageUrls.indexOf(Full_image.src); // Trouver l'index de l'image actuelle

    if (direction === 'left') {
        // Aller à l'image précédente, ou revenir à la fin si on est au début
        currentIndex = (currentIndex === 0) ? imageUrls.length - 1 : currentIndex - 1;
    } else if (direction === 'right') {
        // Aller à l'image suivante, ou revenir au début si on est à la fin
        currentIndex = (currentIndex === imageUrls.length - 1) ? 0 : currentIndex + 1;
    }

    Full_image.src = imageUrls[currentIndex]; // Mettre à jour l'image principale
}

// Attacher les événements aux boutons de navigation
document.getElementById("leftButton").addEventListener("click", () => {
    changeMainImage('left');
});

document.getElementById("rightButton").addEventListener("click", () => {
    changeMainImage('right');
});


                    // 

                    // Définir le prix de l'article pour une quantité de 1
                    itemPrice = item.price;

                    // Calculer le prix promotionnel
                    calul_prix_promotion = ((item.price) - item.price * 0.39).toFixed(2);
                    prix_promotion.innerHTML = ` MAD ${calul_prix_promotion}`;
                    name_product.innerHTML = item.name;
                    description_product.innerHTML = item.short_description;

                    // Sauvegarder les détails du produit dans le localStorage
                    localStorage.setItem("productName", item.name);
                    localStorage.setItem("productDescription", item.short_description);
                    localStorage.setItem("productImage", item.image_urls[0]);

                    // Sauvegarder la description courte et le tableau d'images dans le localStorage
                    localStorage.setItem("short_description", item.short_description);
                    localStorage.setItem("images", JSON.stringify(item.image_urls));

                    // Définir la quantité maximale basée sur la quantité de l'article
                    maxQuantity = item.qt;
                    document.getElementById("availableQuantity").textContent = maxQuantity;

                    // Mise à jour des autres images et descriptions
                    prod_zome_1.src = item.image_urls[0];
                    prod_zome_2.src = item.image_urls[2];
                    prod_zome_3.src = item.image_urls[0];
                    prod_zome_4.src = item.image_urls[2];
                    img_prod_second.src = item.image_urls[0];
                    img_prod_third.src = item.image_urls[2];
                    img_prod_for.src = item.image_urls[0];

                    // Afficher des descriptions spécifiques dans le modal
                    addDescriptionElement("part_type", "Type de pièce");
                    addDescriptionElement("Socket", "Socket");
                    addDescriptionElement("GPU Model", "Modèle GPU");
                    addDescriptionElement("Memory", "Mémoire");
                    addDescriptionElement("Capacity", "Capacité");
                    addDescriptionElement("Interface", "Interface");
                    addDescriptionElement("Speed", "Vitesse");
                    addDescriptionElement("Voltage", "Voltage");
                    addDescriptionElement("Latency", "Latence");

                    // Journaliser la quantité actuelle dans la console
                    logCurrentQuantity();
                }
            });
        })
        .catch(error => console.log("Erreur:", error));

    // Contrôle de la quantité avec les boutons + et -
    document.getElementById("decreaseQuantityBtn").onclick = decreaseQuantity;
    document.getElementById("increaseQuantityBtn").onclick = increaseQuantity;
    document.getElementById("addToCartBtn").onclick = addToCart;
}

// Fonction pour afficher un message de promotion temporaire
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

    // Supprimer le modal après 3 secondes
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 3000);
}

// Fonction pour ajouter l'article au panier et calculer le total
function addToCart() {
    const quantityInput = document.getElementById("quantityInput");
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert("La quantité doit être supérieure à 0.");
        return;
    }

    // Calculer le prix total de l'article en fonction de la quantité
    priceTotal = quantity * parseFloat(calul_prix_promotion);

    // Appliquer une remise supplémentaire de 1% si la quantité est de 3 ou plus
    if (quantity === 3) {
        priceTotal *= 0.99; // Appliquer une remise de 1%
        priceTotal = parseFloat(priceTotal.toFixed(2)); // Arrondir à 2 décimales
        showPromotionMessage(); // Afficher un message de promotion
    }

    // Charger les articles existants ou initialiser un tableau vide
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Vérifier si l'article existe déjà
    const existingItemIndex = cartItems.findIndex(
        (item) => item.productName === name_product.innerHTML
    );

    if (existingItemIndex >= 0) {
        // Mettre à jour la quantité et le prix total de l'article existant
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].priceTotal = (
            parseFloat(cartItems[existingItemIndex].priceTotal) +
            priceTotal
        ).toFixed(2);
    } else {
        // Ajouter un nouvel article au tableau
        const newItem = {
            id: cartItems.length > 0
                ? Math.max(...cartItems.map((item) => item.id)) + 1
                : 1000, // ID unique basé sur le tableau existant
            productName: name_product.innerHTML,
            unitPrice: calul_prix_promotion,
            quantity: quantity,
            priceTotal: priceTotal.toFixed(2),
            productImage: localStorage.getItem("productImage"),
            shortDescription: localStorage.getItem("short_description")
        };
        cartItems.push(newItem); // Ajouter le nouvel article au tableau
    }

    // Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Mettre à jour le total du panier dans le `span` HTML
    updateCartItemCount();
    

    // Afficher des logs dans la console
    console.log("Panier mis à jour :", cartItems);
    console.log("Nombre total d'articles dans le tableau :", cartItems.length);
}

// Fonction pour mettre à jour le compteur d'articles dans le span
function updateCartItemCount() {
    // Charger les articles existants ou initialiser un tableau vide
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Compter le nombre total d'articles
    const itemCount = cartItems.length;

    // Mettre à jour le contenu du span HTML
    const cartTotalElement = document.getElementById("cartTotal");
    if (cartTotalElement) {
        cartTotalElement.textContent = itemCount; // Mettre le nombre total dans le span
       
    }
   
}

// Charger les données du panier et mettre à jour le compteur au chargement de la page
document.addEventListener("DOMContentLoaded", updateCartItemCount);

// Fonction pour basculer la visibilité du modal
function toggleModal() {
    const modal = document.getElementById("descriptionModal");
    modal.classList.toggle("hidden");
}

// Fonction pour ajouter des éléments de description au modal
function addDescriptionElement(key, value) {
    const contentDiv = document.getElementById("descriptionContent");
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("text-black");
    descriptionElement.innerHTML = `<strong>${key}:</strong> ${value}`;
    contentDiv.appendChild(descriptionElement);
}

// Journaliser la quantité actuelle
function logCurrentQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    console.log("Quantité actuelle:", quantityInput.value);
}

// Fonctions de contrôle de la quantité avec les boutons + et -
function decreaseQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        logCurrentQuantity(); // Journaliser la nouvelle quantité dans la console
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById("quantityInput");
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity < maxQuantity) {
        currentQuantity++;
        quantityInput.value = currentQuantity;
        logCurrentQuantity(); // Journaliser la nouvelle quantité dans la console
    }
}

// Charger les données du panier au chargement de la page
loadCartData();

// Commencer à charger les données une fois l'ID récupéré
const checkInterval = setInterval(() => {
    const urlId = getURLParameter('id');

    if (urlId) {
        clearInterval(checkInterval);
        fetchDataAndDisplay();
    } else {
        console.log("Vérification de l'ID toutes les secondes...");
    }
}, 1000);

// 

// Fonction pour afficher l'image agrandie
function showImage(imageSrc) {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = imageSrc; // Mettre à jour la source de l'image

    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.remove('hidden'); // Affiche le conteneur
}

// Fonction pour fermer l'image agrandie
function closeImage() {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.add('hidden'); // Cache le conteneur
}

// Fonction pour attacher les gestionnaires d'événements aux miniatures
function initializeThumbnailClicks() {
    const thumbnails = [
        document.getElementById('img_prod_first'),
        document.getElementById('img_prod_second'),
        document.getElementById('img_prod_third'),
        document.getElementById('img_prod_for')
    ];

    thumbnails.forEach(thumbnail => {
        if (thumbnail) {
            thumbnail.addEventListener('click', () => {
                showImage(thumbnail.src); // Passer la source de l'image cliquée
            });
        }
    });
}

// Appeler la fonction lorsque les images sont chargées dynamiquement
window.onload = initializeThumbnailClicks;
if (item.id == urlId) {
    // Mise à jour des miniatures
    img_prod_first.src = item.image_urls[2];
    img_prod_second.src = item.image_urls[0];
    img_prod_third.src = item.image_urls[2];
    img_prod_for.src = item.image_urls[0];

    // Mettre à jour l'image principale (optionnel)
    Full_image.src = item.image_urls[0];

    // Initialiser les clics sur les miniatures
    initializeThumbnailClicks();
}

/*Page Panier*/
function toggleCart() {
    const cartDropdown = document.getElementById('CartBar'); // Supposons que ce soit votre menu de panier
    if (cartDropdown) {
        cartDropdown.classList.toggle('translate-x-0');
        cartDropdown.classList.toggle('translate-x-full');
    }

    // Attendre 3 secondes avant de rafraîchir la page
   
}

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

// Fonction pour ajouter un article au panier
function addToCart() {
    const quantityInput = document.getElementById("quantityInput");
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert("La quantité doit être supérieure à 0.");
        return;
    }

    // Calculer le prix total en fonction de la quantité
    priceTotal = quantity * parseFloat(calul_prix_promotion);

    if (quantity >= 3) {
        priceTotal *= 0.99; // Appliquer une remise de 1%
        priceTotal = parseFloat(priceTotal.toFixed(2));
        showPromotionMessage();
    }

    // Charger les articles existants ou initialiser un tableau
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Vérifier si l'article existe déjà
    const existingItemIndex = cartItems.findIndex(
        (item) => item.productName === name_product.innerHTML
    );

    if (existingItemIndex >= 0) {
        // Mettre à jour la quantité et le prix total de l'article existant
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].priceTotal = (
            parseFloat(cartItems[existingItemIndex].priceTotal) + priceTotal
        ).toFixed(2);
    } else {
        // Ajouter un nouvel article au tableau
        const newItem = {
            id: cartItems.length > 0
                ? Math.max(...cartItems.map((item) => item.id)) + 1
                : 1000, // ID unique basé sur le tableau existant
            productName: name_product.innerHTML,
            unitPrice: calul_prix_promotion,
            quantity: quantity,
            priceTotal: priceTotal.toFixed(2),
            productImage: localStorage.getItem("productImage"),
            shortDescription: localStorage.getItem("productDescription")
        };
        cartItems.push(newItem);
    }

    // Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Mettre à jour le total du panier dans l'interface
    cartTotal += priceTotal;
    localStorage.setItem("cartTotal", cartTotal);
    // document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;

    // Log pour vérifier les données
    console.log("Panier mis à jour :", cartItems);
}


function addToCartWithMessage() {
    // Appeler la fonction existante pour ajouter l'article au panier
    addToCart();

    // Afficher le message de succès
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("hidden");

    // Masquer le message après 3 secondes
    setTimeout(() => {
        successMessage.classList.add("hidden");
    }, 3000);
}

// Count nombre de produit 



// Charger les images depuis data.json
function loadImages() {
    fetch('../data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des données');
            }
            return response.json();
        })
        .then(data => {
            // Associer les images aux balises <img>
            const imageMappings = [
                { id: 'prod_zome_1', index: 0 },
                { id: 'prod_zome_2', index: 1 },
                { id: 'prod_zome_3', index: 2 },
                { id: 'prod_zome_4', index: 3 }
            ];

            imageMappings.forEach(mapping => {
                const imgElement = document.getElementById(mapping.id);
                if (imgElement && data[mapping.index]) {
                    imgElement.src = data[mapping.index].image_urls[0]; // Associe la première image
                }
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des images :', error));
}

// Ouvrir le modal avec l'image
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc; // Définit l'image dans le modal
    modal.classList.remove('hidden'); // Affiche le modal
}

// Fermer le modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden'); // Cache le modal
}

// Charger les images au chargement de la page
document.addEventListener('DOMContentLoaded', loadImages);
