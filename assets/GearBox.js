/* Page Accueil */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/*Page Catalogue */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Détails du Produit */ // les lignes JS : oumayma 
// recupere id de image de prod Numero 1
var img_prod_first = document.getElementById('img_prod_first');
var Full_image=document.getElementById('Full_image');
var Prix=document.getElementById('Prix');
var prix_promotion=document.getElementById('prix_promotion');
var name_product=document.getElementById('name_product');
var description_product=document.getElementById('description_product');
var prod_zome_1=document.getElementById('prod_zome_1');
var prod_zome_2=document.getElementById('prod_zome_2');
var prod_zome_3=document.getElementById('prod_zome_3');
var prod_zome_4=document.getElementById('prod_zome_4');
var img_prod_second=document.getElementById('img_prod_second');
var img_prod_third=document.getElementById('img_prod_third');
var img_prod_for=document.getElementById('img_prod_for');
//div pour description sur Product
var product_description=document.getElementById('product_description'); 



console.log(img_prod_first);

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchDataAndDisplay() {
    const urlId = getURLParameter('id'); 
    console.log(urlId);

    if (!urlId) {
        console.log("Aucun ID dans l'URL, nouvelle vérification dans une seconde.");
        return;
    }
    fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier data.json");
        }
        return response.json();
    })
    .then(data => {
        data.forEach((item) => {
            if (item.id == urlId) {
                img_prod_first.src = item.image_urls[2];
                Full_image.src = item.image_urls[0];
                Prix.innerHTML = ` MAD${item.price} `;
    
                // Calculate promotion price
                let calul_prix_promotion = ((item.price) - item.price * (0.39)).toFixed(2);
                prix_promotion.innerHTML = ` MAD ${calul_prix_promotion}`;
                name_product.innerHTML = `${item.name}`;
                description_product.innerHTML = `${item.short_description}`;
    
                // Zoom images
                prod_zome_1.src = item.image_urls[0];
                prod_zome_2.src = item.image_urls[2];
                prod_zome_3.src = item.image_urls[0];
                prod_zome_4.src = item.image_urls[2];
    
                // Left-side product images
                img_prod_second.src = item.image_urls[0];
                img_prod_third.src = item.image_urls[2];
                img_prod_for.src = item.image_urls[0];
    
                // Display part_type if available
                if (item.part_type) {
                    let partTypeElement = document.createElement('div');
                    partTypeElement.innerHTML = `<p>Type de pièce: ${item.part_type}</p>`;
                    product_description.appendChild(partTypeElement);
                }
    
                // Display Socket if available
                if (item.Socket) {
                    let socketElement = document.createElement('div');
                    socketElement.innerHTML = `<p>Socket: ${item.Socket}</p>`;
                    product_description.appendChild(socketElement);
                }
    
                // Display GPU Model if available
                if (item["GPU Model"]) {
                    let gpuModelElement = document.createElement('div');
                    gpuModelElement.innerHTML = `<p>Modèle GPU: ${item["GPU Model"]}</p>`;
                    product_description.appendChild(gpuModelElement);
                }
    
                // Display Memory if available
                if (item.Memory) {
                    let memoryElement = document.createElement('div');
                    memoryElement.innerHTML = `<p>Mémoire: ${item.Memory}GB</p>`;
                    product_description.appendChild(memoryElement);
                }
    
                // Display any other properties like Capacity, Interface, etc.
                if (item.Capacity) {
                    let capacityElement = document.createElement('div');
                    capacityElement.innerHTML = `<p>Capacité: ${item.Capacity}GB</p>`;
                    product_description.appendChild(capacityElement);
                }
    
                if (item.Interface) {
                    let interfaceElement = document.createElement('div');
                    interfaceElement.innerHTML = `<p>Interface: ${item.Interface}</p>`;
                    product_description.appendChild(interfaceElement);
                }
            }
        });
    });
    
  

}

// Set up a repeating check every second
const checkInterval = setInterval(() => {
    const urlId = getURLParameter('id');

    if (urlId) {
        clearInterval(checkInterval);  // Stop checking once ID is found
        fetchDataAndDisplay();         // Fetch data and display content
    } else {
        console.log("Vérification de l'ID chaque seconde...");
    }
}, 1000);  // Check every 1000ms (1 second)






































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Panier */

function toggleCart() {
    const cartDropdown = document.getElementById('CartBar');
    cartDropdown.classList.toggle('translate-x-0');
    cartDropdown.classList.toggle('translate-x-full');
}
function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

let products = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description for product 1', image: '../assets/media/Product1.png' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description for product 2', image: '../assets/media/Product1.png' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description for product 3', image: '../assets/media/Product1.png' }
];

// Store the products in local storage
localStorage.setItem('products', JSON.stringify(products));

function DisplayProducts() {
    // Get the products from local storage
    let products = JSON.parse(localStorage.getItem('products'));

    if (products) {
        const ProductsDiv = document.querySelector('.ProductsDiv'); // Main products section
        const CartSidebarDiv = document.querySelector('.CartSidebarDiv'); // Cart sidebar section

        // Clear both containers first
        ProductsDiv.innerHTML = '';
        CartSidebarDiv.innerHTML = '';

        // Loop through the products and display them
        products.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('border-b', 'rounded-lg', 'bg-white', 'shadow-lg', 'mb-6', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-2', 'items-center');

            // Main Products Div
            newProduct.innerHTML = `
                <!-- Product Item -->
                <div class="col-span-1">
                    <!-- Image Section -->
                    <img src="${product.image || '../assets/media/Product1.png'}" alt="${product.name}" class="w-full h-full object-cover rounded-l-lg max-h-56 md:max-h-64">
                </div>
                <!-- Content Section -->
                <div class="col-span-1 md:col-span-2 flex flex-col space-y-4 p-4">
                    <!-- Title and Remove Button -->
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg md:text-xl font-semibold text-gray-800">${product.name}</h3>
                        <button class="text-red-500 text-xl hover:text-red-600 transition duration-150" title="Remove">&#128465;</button>
                    </div>
                    <!-- Description -->
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed">${product.description || 'No description available'}</p>
                    <!-- Price and Quantity Section -->
                    <div class="flex justify-between items-center">
                        <p class="text-lg md:text-xl font-bold text-gray-900">${product.price} MAD</p>
                        <div class="flex items-center space-x-2">
                            <button aria-label="Decrease quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg">-</button>
                            <input type="text" value="1" class="w-12 text-center border rounded-md text-base md:text-lg" aria-label="Quantity">
                            <button aria-label="Increase quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg">+</button>
                        </div>
                    </div>
                </div>
            `;

            // Append to the main Products Div
            ProductsDiv.appendChild(newProduct);

            // Sidebar format
            const sidebarProduct = document.createElement('div');
            sidebarProduct.classList.add('flex', 'items-center', 'space-x-4', 'border-b', 'pb-4');

            sidebarProduct.innerHTML = `
                <img src="${product.image || '../assets/media/Product1.png'}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${product.name}</h4>
                    <div class="flex justify-between items-center">
                        <p class="text-gray-600 text-sm">${product.price} MAD</p>
                        <button class="text-md" title="Remove">&#128465;</button>
                    </div>
                </div>
            `;

            // Append to the Cart Sidebar Div
            CartSidebarDiv.appendChild(sidebarProduct);
        });
    } else {
        console.log('No products found in local storage.');
    }
}

document.addEventListener('DOMContentLoaded', DisplayProducts);



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Devis */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page À Propos */