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

    // Calculer le prix total de l'article en fonction de la quantité
    priceTotal = quantity * parseFloat(calul_prix_promotion);

    // Appliquer une remise supplémentaire de 1% si la quantité est de 3 ou plus
    if (quantity == 3) {
        priceTotal *= 0.99; // Appliquer une remise de 1%
        priceTotal = parseFloat(priceTotal.toFixed(2)); // Arrondir à 2 décimales

        // Afficher le message de promotion
        showPromotionMessage();
    }

    // Mettre à jour le total du panier
    cartTotal += priceTotal;
    localStorage.setItem("cartTotal", cartTotal);

    // Récupérer les éléments du panier existant ou initialiser un tableau vide
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Vérifier si le produit existe déjà dans le panier
    const existingItemIndex = cartItems.findIndex(item => item.productName === name_product.innerHTML);

    if (existingItemIndex >= 0) {
        // Si le produit existe, récupérer le prix précédent et ajouter le prix actuel
        let previousPriceTotal = parseFloat(cartItems[existingItemIndex].priceTotal);
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].priceTotal = (previousPriceTotal + (quantity * parseFloat(calul_prix_promotion))).toFixed(2);
    } else {
        // Ajouter un nouveau produit au panier avec son prix total
        const itemDetails = {
            id: 1000 + cartItems.length, // ID commence à 1000 et s'incrémente
            productName: name_product.innerHTML,
            unitPrice: calul_prix_promotion, // Le prix de l'unité
            quantity: quantity,
            priceTotal: priceTotal.toFixed(2), // Le prix total en fonction de la quantité
            productImage: localStorage.getItem("productImage"),
            shortDescription: localStorage.getItem("short_description")
        };
        cartItems.push(itemDetails);
    }

    // Sauvegarder le tableau mis à jour dans localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Afficher le total mis à jour du panier
    document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;

    // Log pour vérifier le calcul
    console.log("Quantité ajoutée:", quantity, "Prix unitaire (promotion):", calul_prix_promotion, "Prix total de l'article:", priceTotal, "Total du panier:", cartTotal);
}

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

// here

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
    imagePreview.classList.remove('hidden'); // Afficher le conteneur
}

// Fonction pour fermer l'image agrandie
function closeImage() {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.classList.add('hidden'); // Cacher le conteneur
}

// Fonction pour charger les images dans le div depuis data.json
function loadImageThumbnails() {
    fetch('../data/data.json') // Chemin vers le fichier JSON
        .then((response) => response.json())
        .then((data) => {
            const urlId = getURLParameter('id'); // Récupérer l'ID depuis l'URL
            const item = data.find((item) => item.id == urlId);
            if (!item) return; // Si aucun élément correspondant n'est trouvé, arrêter

            // Associer les images aux miniatures
            const thumbnails = [
                { id: 'prod_zome_1', src: item.image_urls[0] },
                { id: 'prod_zome_2', src: item.image_urls[2] },
                { id: 'prod_zome_3', src: item.image_urls[0] },
                { id: 'prod_zome_4', src: item.image_urls[2] }
            ];

            thumbnails.forEach(({ id, src }) => {
                const imgElement = document.getElementById(id);
                if (imgElement) {
                    imgElement.src = src; // Définir la source de l'image
                    imgElement.addEventListener('click', () => showImage(src)); // Ajouter un clic pour afficher l'image agrandie
                }
            });
        })
        .catch((error) => console.error("Erreur lors du chargement des données :", error));
}

// Fonction pour récupérer un paramètre d'URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Charger les miniatures au chargement de la page
document.addEventListener('DOMContentLoaded', loadImageThumbnails);
// 

// Fonction pour compter les éléments dans le panier
function countCartItems() {
    // Récupérer les articles du panier depuis localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Si aucun article, renvoie un tableau vide

    // Retourner le nombre d'éléments dans le panier
    return cartItems.length;
}

// Exemple d'utilisation
console.log("Nombre d'articles dans le panier:", countCartItems());
// Fonction pour mettre à jour l'affichage du nombre d'articles dans le panier
function updateCartCount() {
    const totalCount = countCartItems(); // Compter les articles dans le panier

    // Mettre à jour l'affichage du nombre d'articles
    const cartCountElement = document.getElementById("cartTotal");
    if (cartCountElement) {
        cartCountElement.textContent = totalCount; // Afficher le nombre d'articles
    }
}

// Appeler cette fonction au chargement de la page pour afficher le nombre d'articles
document.addEventListener('DOMContentLoaded', updateCartCount);
