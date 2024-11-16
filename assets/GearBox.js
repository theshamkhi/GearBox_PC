


function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}




var imgapi1 = document.getElementById('imgapi1')
var carte1 = document.getElementById('carte1')
var txtapi1 = document.getElementById('txtapi1')
var descriapi1 = document.getElementById('descriapi1')
var descriapi2 = document.getElementById('descriapi2')
fetch('data/data.json')
.then(response=>response.json())
.then(data=>{
    let index = 0;
    data.forEach(item => {

        let inner = `
        <a href="#" id="carte1">
                    <img id="imgapi1" class="rounded-t-lg" src="${item.image_urls[0]}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 id="txtapi1" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                        <div id="descriapi1">${(item.price * 9)} MAD</div>
                    </a>
                    <a href="#" id="bouton1" class="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7 mt-5">
                        Ajouter au panier
                    </a>
                </div>`;
        document.getElementById(`gamer${index+1}`).innerHTML = inner;

        index++;

    });
})





































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































const itemsPerPage = 9;
let currentPage = 1;
let catalogData = [];
let filteredData = [];  
let totalPages = 1;
<<<<<<< HEAD
>>>>>>> b0eedb2c0f79fd767d9b3427ebe1b34f8cd9a638
=======
>>>>>>> 8d808b37221ec5e582b7a1c39535f8d0c9c82467

async function theData() {
    try{
    const response = await fetch('../data/data.json');  
    const data = await response.json();
    catalogData = data;
    return catalogData;  
    } catch (error) {
        console.error("Error loading catalog data:", error);
    }
}

console.log(theData());

<<<<<<< HEAD






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































<<<<<<< HEAD
=======
<<<<<<< HEAD
/* Page Détails du Produit */
>>>>>>> 17f628aab90189e7018028638bafd2df6df25784



=======
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


>>>>>>> 66b11ebf80795ca77165f7e43e666e375903026b











































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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

async function loadCatalogData() {
    try {
        const response = await fetch('../data/data.json');  
        const data = await response.json();
        catalogData = data;
        filteredData = catalogData;  

        updatePagination();  
        renderPage();        
    } catch (error) {
        console.error("Error loading catalog data:", error);
    }

}


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

async function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = filteredData.slice(start, end);  
    const catalogItemsContainer = document.querySelector('.catalogItems');
    catalogItemsContainer.innerHTML = '';

    for (const item of items) {
        const imageUrl = item.image_urls[0]; 

        const itemHTML = `
            <div class="item_cards w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 item-card" id="${item.part_type}">
                <a href="#">
                    <img class="p-8 rounded-t-lg" src="${imageUrl}" alt="product image" />
                </a>
                <div class="atSec px-5 ">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id="item${item.id}">${item.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                    </div>
                </div>

            </div>`;

        catalogItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        document.getElementById(`item${item.id}`).addEventListener('click', function() {
            const data = { id: item.id};
            const queryString = new URLSearchParams(data).toString();
            window.location.href = `Details.html?${queryString}`;
        });
    } 
}








































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Panier */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Devis */


<<<<<<< HEAD






















































function loadCartDataOnDevisPage() {
    const savedCartTotal = localStorage.getItem("cartTotal");
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // let TTotal=item.totalPrice;
    // Display each item in the cart
    const cartContainer = document.getElementById("tbd");
    savedCartItems.forEach(item => {
        const itemElement = document.createElement("tr");
        itemElement.innerHTML = `
            <td> ${item.productName}</td>
            <td> ${item.promotionalPrice} MAD</td>
            <td> ${item.quantity}</td>
            <td> ${item.totalPrice}</td>
        `;
        cartContainer.appendChild(itemElement);
    });
}

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page À Propos */

/* Page Devis */
document.addEventListener('DOMContentLoaded',() => {
    const boutton = document.getElementById('boutton');
    let tbody = document.getElementById('tbd');
        tbody.innerHTML=`
        <tr>
            <td>Produit1 - Description</td>
            <td>3</td>
            <td>150MAD</td>
            <td>red</td>
        </tr>
        `

    const a=document.getElementById('download');

// Call the function to load data when the page loads
window.onload = loadCartDataOnDevisPage;
const a=document.getElementById('download');

    a.addEventListener('click',funprint);
    function funprint () {
        window.print();
    }

})

async function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = filteredData.slice(start, end);  
    const catalogItemsContainer = document.querySelector('.catalogItems');
    catalogItemsContainer.innerHTML = '';

    for (const item of items) {
        const imageUrl = item.image_urls[0]; 

        const itemHTML = `
            <div class="item_cards w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 item-card" id="${item.part_type}">
                <a href="#">
                    <img class="p-8 rounded-t-lg" src="${imageUrl}" alt="product image" />
                </a>
                <div class="atSec px-5 ">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id="item${item.id}">${item.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                    </div>
                </div>

            </div>`;

        catalogItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        document.getElementById(`item${item.id}`).addEventListener('click', function() {
            const data = { id: item.id};
            const queryString = new URLSearchParams(data).toString();
            window.location.href = `Details.html?${queryString}`;
        });
    } 
}


document.querySelector('#sort-select').addEventListener('change', function () {
    const sortOption = this.value;
    sortCatalog(sortOption);
});



function sortCatalog(sortOption) {
    if (sortOption === 'price-asc') {
        // Sort by price in ascending order
        filteredData.sort((a, b) => (a.price * 9) - (b.price * 9));
    } else if (sortOption === 'price-desc') {
        // Sort by price in descending order
        filteredData.sort((a, b) => (b.price * 9) - (a.price * 9));
    }

    // Re-render items with the current view type
    currentPage = 1;  // Reset to first page after sorting
    renderItems(whichState);
}


function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';  

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-btn', 'px-3', 'py-2', 'mx-1', 'bg-blue-500', 'text-white', 'rounded');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;  
            renderPage();  
        });
        if (i === currentPage) {
            pageButton.classList.add('bg-blue-900');  // Highlight the active page
        }
        paginationContainer.appendChild(pageButton);
    }
}

function filterCatalog() {
    const partType = document.querySelector('#part-type').value;

    // Filter catalogData based on selected partType
    filteredData = partType === "" ? catalogData : catalogData.filter(item => item.part_type === partType);

    // Reset to the first page after filtering
    currentPage = 1;

    // Re-render items and pagination with the current view type (list or grid)
    updatePagination();
    renderItems(whichState);
}

document.querySelector('#part-type').addEventListener('change', filterCatalog);

document.addEventListener('DOMContentLoaded', function() {    
    filterPrice();

});

function filterCatalogByCapacityAndType() {
    const capacitySelect = document.querySelector('#storage-capacity');
    const typeSelect = document.querySelector('#storage-type');

    if (!capacitySelect || !typeSelect) return;

                                                                                                                                
    capacitySelect.addEventListener('change', applyFilters);
    typeSelect.addEventListener('change', applyFilters);

    function applyFilters() {
        const selectedCapacity = parseInt(capacitySelect.value);
        const selectedType = typeSelect.value;

        
        filteredData = catalogData.filter(item => {
            const matchesCapacity = isNaN(selectedCapacity) || item.Capacity >= selectedCapacity;
            const matchesType = !selectedType || item["Storage Type"] === selectedType;
            return matchesCapacity && matchesType;
        });

      
        currentPage = 1;
        updatePagination();
        renderPage();
    }
}

filterCatalogByCapacityAndType();

function filterPrice() {
    const priceSlider = document.getElementById('priceSlider');
    priceSlider.addEventListener('change', () => {
        const maxPrice = (5000 / 100) * priceSlider.value;
        document.getElementById('maxprice').innerText = maxPrice;
        
        filteredData = catalogData.filter(item => (item.price * 9) <= maxPrice);

        
        currentPage = 1;
        updatePagination();
        renderPage();
    });
}

function updatePagination() {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);  
    renderPagination();  
}

document.addEventListener('DOMContentLoaded', loadCatalogData);
document.querySelector('#part-type').addEventListener('change', filterCatalog);

document.addEventListener('DOMContentLoaded', function() {
    const partTypeSelect = document.querySelector('#part-type');

    const storageSelects = document.querySelectorAll('#storage-capacity, #storage-type');
    const cpuSelects = document.querySelectorAll('#cpu-brand, #cpu-core-count, #cpu-core-clock');
    const gpuSelects = document.querySelectorAll('#gpu-brand, #gpu-memory, #gpu-core-clock');
    const psuSelects = document.querySelectorAll('#psu-efficiency, #psu-wattage');
    const motherboardSelects = document.querySelectorAll('#motherboard-socket, #motherboard-form-factor');
    const caseSelects = document.querySelectorAll('#case-type, #case-color');
    const ramSelects = document.querySelectorAll('#ram-speed, #ram-modules');
    const coolerSelects = document.querySelectorAll('#cooling-rpm, #cooling-noise-level');

    // Initially hide all selects
    storageSelects.forEach(select => select.style.display = 'none');
    cpuSelects.forEach(select => select.style.display = 'none');
    gpuSelects.forEach(select => select.style.display = 'none');
    psuSelects.forEach(select => select.style.display = 'none');
    motherboardSelects.forEach(select => select.style.display = 'none');
    caseSelects.forEach(select => select.style.display = 'none');
    ramSelects.forEach(select => select.style.display = 'none');
    coolerSelects.forEach(select => select.style.display = 'none');

    // Event listener for when part type is changed
    partTypeSelect.addEventListener('change', function() {
        // Hide all selects first
        storageSelects.forEach(select => select.style.display = 'none');
        cpuSelects.forEach(select => select.style.display = 'none');
        gpuSelects.forEach(select => select.style.display = 'none');
        psuSelects.forEach(select => select.style.display = 'none');
        motherboardSelects.forEach(select => select.style.display = 'none');
        caseSelects.forEach(select => select.style.display = 'none');
        ramSelects.forEach(select => select.style.display = 'none');
        coolerSelects.forEach(select => select.style.display = 'none');

        // Show the related selects based on part type
        if (partTypeSelect.value === 'storage') {
            storageSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'cpu') {
            cpuSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'gpu') {
            gpuSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'psu') {
            psuSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'motherboard') {
            motherboardSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'case') {
            caseSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'ram') {
            ramSelects.forEach(select => select.style.display = 'block');
        } else if (partTypeSelect.value === 'cooler') {
            coolerSelects.forEach(select => select.style.display = 'block');
        }
    });
});

let iconbtnList = document.getElementById('listIcon');
let iconbtnGrid = document.getElementById('gridIcon');
let whichState = 'grid';

function getItemHTML(item, viewType) {
    if (viewType === 'grid') {
        // Grid view template (square card)
        return `
            <div class="item_cards w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 item-card">
                <a href="#">
                    <img class="p-8 rounded-t-lg" src="${item.image_urls[0]}" alt="product image" />
                </a>
                <div class="px-5 pb-5 text-center">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="item_cards w-1000px bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 item-card flex flex-row items-center p-4" style="height: 200px;">
                <a href="#" class="listImage flex-shrink-0">
                    <img class="rounded-lg" src="${item.image_urls[0]}" alt="product image" style="width: 100px; height: auto;" />
                </a>
                <div class="thisinnerOut ml-4">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                    </a>
                    <div class="thisinnerItem flex items-center justify-between">
                    <span class="text-xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                    </div>
                    </div>
            </div>
        `;
    }
}

function renderItems(viewType) {
    const catalogItemsContainer = document.querySelector('.catalogItems');
    catalogItemsContainer.innerHTML = '';

    // Determine the start and end indices for the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = filteredData.slice(start, end);

    // Adjust parent container layout based on view type
    if (viewType === 'list') {
        catalogItemsContainer.style.display = 'flex';
        catalogItemsContainer.style.flexDirection = 'column';
        catalogItemsContainer.style.gap = '10px';  // Add spacing between items for list view
    } else {
        catalogItemsContainer.style.display = 'grid';
        catalogItemsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';  // Three columns for grid view
        catalogItemsContainer.style.gap = '20px';  // Space between items for grid view
    }

    // Generate HTML for each item based on the view type
    itemsToDisplay.forEach(item => {
        catalogItemsContainer.insertAdjacentHTML('beforeend', getItemHTML(item, viewType));
    });
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
}

iconbtnList.addEventListener('click', function () {
    renderItems('list');
    whichState = 'list';
});

iconbtnGrid.addEventListener('click', function () {
    renderItems('grid');
    whichState = 'grid';
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
});

document.addEventListener('DOMContentLoaded', function () {
    renderItems('grid');
    renderPagination();
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}  // Ensure pagination buttons are displayed
});

function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-btn', 'px-3', 'py-2', 'mx-1', 'bg-blue-500', 'text-white', 'rounded');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderItems(whichState);  
        });
        if (i === currentPage) {
            pageButton.classList.add('bg-blue-900');   
        }
        paginationContainer.appendChild(pageButton);
    }
}

document.getElementById('searchBar').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    filteredData = catalogData.filter(item => item.name.toLowerCase().includes(searchQuery));

   
    currentPage = 1;
    
  
    updatePagination();
    renderPage();
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
});

function updatePagination() {
    // Calculate total pages based on filtered data length
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    renderPagination();
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
}


function applyFilters() {
    // Get selected values for each filter
    const cpuBrand = document.querySelector('#cpu-brand').value;
    const cpuCoreCount = parseInt(document.querySelector('#cpu-core-count').value);
    const cpuCoreClock = parseFloat(document.querySelector('#cpu-core-clock').value);
    const gpuBrand = document.querySelector('#gpu-brand').value;
    const gpuMemory = parseInt(document.querySelector('#gpu-memory').value);
    const gpuCoreClock = parseInt(document.querySelector('#gpu-core-clock').value);
    const psuEfficiency = document.querySelector('#psu-efficiency').value;
    const psuWattage = parseInt(document.querySelector('#psu-wattage').value);
    const motherboardSocket = document.querySelector('#motherboard-socket').value;
    const motherboardFormFactor = document.querySelector('#motherboard-form-factor').value;
    const caseType = document.querySelector('#case-type').value;
    const caseColor = document.querySelector('#case-color').value;
    const ramSpeed = parseInt(document.querySelector('#ram-speed').value);
    const ramModules = document.querySelector('#ram-modules').value;
    const coolingRpm = parseInt(document.querySelector('#cooling-rpm').value);
    const coolingNoiseLevel = parseInt(document.querySelector('#cooling-noise-level').value);
    
    filteredData = catalogData.filter(item => {
        const matchesCpuBrand = !cpuBrand || item["Model"]?.includes(cpuBrand);
        const matchesCpuCoreCount = isNaN(cpuCoreCount) || item["Cores"] === cpuCoreCount;
        const matchesCpuCoreClock = isNaN(cpuCoreClock) || item["Base Clock"] >= cpuCoreClock;

        const matchesGpuBrand = !gpuBrand || item["GPU Model"]?.includes(gpuBrand);
        const matchesGpuMemory = isNaN(gpuMemory) || item["Memory"] === gpuMemory;
        const matchesGpuCoreClock = isNaN(gpuCoreClock) || item["Core Clock"] >= gpuCoreClock;

        const matchesPsuEfficiency = !psuEfficiency || item["Efficiency"] === psuEfficiency;
        const matchesPsuWattage = isNaN(psuWattage) || item["Wattage"] >= psuWattage;

        const matchesMotherboardSocket = !motherboardSocket || item["Socket"] === motherboardSocket;
        const matchesMotherboardFormFactor = !motherboardFormFactor || item["Form Factor"] === motherboardFormFactor;

        const matchesCaseType = !caseType || item["Form Factor"] === caseType;
        const matchesCaseColor = !caseColor || item["Color"] === caseColor;

        const matchesRamSpeed = isNaN(ramSpeed) || item["Speed"] >= ramSpeed;
        const matchesRamModules = !ramModules || item["Capacity"] === parseInt(ramModules.split('x')[1]);

        const matchesCoolingRpm = isNaN(coolingRpm) || parseInt(item["Max Fan Speed"]) >= coolingRpm;
        const matchesCoolingNoiseLevel = isNaN(coolingNoiseLevel) || parseInt(item["Noise Level"]) <= coolingNoiseLevel;

        return matchesCpuBrand && matchesCpuCoreCount && matchesCpuCoreClock &&
               matchesGpuBrand && matchesGpuMemory && matchesGpuCoreClock &&
               matchesPsuEfficiency && matchesPsuWattage &&
               matchesMotherboardSocket && matchesMotherboardFormFactor &&
               matchesCaseType && matchesCaseColor &&
               matchesRamSpeed && matchesRamModules &&
               matchesCoolingRpm && matchesCoolingNoiseLevel;
    });

  
    currentPage = 1;
    updatePagination();
    renderPage();
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
}




document.querySelectorAll('#cpu-brand, #cpu-core-count, #cpu-core-clock, #gpu-brand, #gpu-memory, #gpu-core-clock, #psu-efficiency, #psu-wattage, #motherboard-socket, #motherboard-form-factor, #case-type, #case-color, #ram-speed, #ram-modules, #cooling-rpm, #cooling-noise-level')
    .forEach(select => select.addEventListener('change', applyFilters));
document.addEventListener('DOMContentLoaded', applyFilters);

window.addEventListener('load',function(){
    document.querySelector('#filterBtn').style.display = 'none';
    let filterPanel = document.querySelector('.rightSide');
    let fitBtn = document.querySelector('#filterBtn');
    let cat = document.querySelector('.catalogItems');
    let aff = document.querySelector('#affhi');
    if(window.innerWidth<=800){
        console.log(window.innerWidth);
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
    }else{
        aff.style.display = 'block';
        closeFi.style.display = 'none';
        fitBtn.style.display = 'none';
        filterPanel.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(3, 1fr)';
        filterPanel.style.position = 'relative';
        filterPanel.style.width = '30%';
        
    }
})

let closeFi = document.getElementById('closeFi');

document.querySelector('#filterBtn').addEventListener('click',function(){
    let filterPanel = document.querySelector('.rightSide');
    filterPanel.style.position = 'fixed';
    filterPanel.style.display = 'block';
    filterPanel.style.width = '70%';
    closeFi.style.display = 'block';
})

window.addEventListener('resize', function(){
    let filterPanel = document.querySelector('.rightSide');
    let fitBtn = document.querySelector('#filterBtn');
    let cat = document.querySelector('.catalogItems');
    let aff = document.querySelector('#affhi');
    if(window.innerWidth<=800){
        console.log(window.innerWidth);
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
    }else{
        aff.style.display = 'block';
        closeFi.style.display = 'none';
        fitBtn.style.display = 'none';
        filterPanel.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(3, 1fr)';
        filterPanel.style.position = 'relative';
        filterPanel.style.width = '30%';
        
    }
})

closeFi.addEventListener('click', function(){
    let filterPanel = document.querySelector('.rightSide');
    filterPanel.style.display = 'none';
})

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page À Propos */

let currentPage = 1;
const itemsPerPage = 4;
let productsData = [];

// Fetch the product data from JSON file
fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Error loading data.json file");
        }
        return response.json();
    })
    .then(data => {
        productsData = data; // Store the product data
        displayProducts(currentPage); // Display initial page
    })
    .catch(error => console.error('Error:', error));

// Function to display products based on the current page
function displayProducts(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentProducts = productsData.slice(startIndex, endIndex);
    const productList = document.getElementById('product-list');

    // Clear previous products
    productList.innerHTML = '';

    // Loop through the current page products and create cards
    currentProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md');
        productCard.innerHTML = `
            <a href="#">
                <img class="rounded-t-lg" src="${product.image_urls[0]}" alt="${product.name}">
            </a>
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${product.name}</h5>
                <p class="text-gray-700">${product.short_description}</p>
                <p class="text-lg font-semibold text-gray-900">${product.price} dh</p>
                <a href="#" id="bouton4" class="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7 mt-5" onclick="addToCart('${product.id}', '${product.name}', '${product.image_urls[0]}', '${product.price}', '${product.short_description}')">
                    Ajouter au panier
                </a>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add product to cart and save to localStorage
function addToCart(id, name, image, price, shortDescription) {
    const productPrice = parseFloat(price);

    // Get existing cart from localStorage, or create a new array if none exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Start the ID from 1000 for the first product and increment after
    let nextProductId = cart.length ? cart[cart.length - 1].id + 1 : 1000;

    // Check if product already exists in cart based on product name
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        // Update quantity and add price to totalPrice if product already exists in cart
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice = (parseFloat(cart[existingProductIndex].totalPrice) + productPrice).toFixed(2);
    } else {
        // Add new product to cart with a unique numeric ID starting at 1000
        const newProduct = {
            id: nextProductId, // Numeric ID starting from 1000
            name: name,
            image: image,
            price: productPrice,
            shortDescription: shortDescription,
            quantity: 1,
            totalPrice: productPrice.toFixed(2)
        };
        cart.push(newProduct);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Inform the user
    alert(`${name} a été ajouté au panier!`);
}

// Event listeners for pagination buttons
document.getElementById('page1').addEventListener('click', () => {
    currentPage = 1;
    displayProducts(currentPage);
});

document.getElementById('page2').addEventListener('click', () => {
    currentPage = 2;
    displayProducts(currentPage);
});

document.getElementById('page3').addEventListener('click', () => {
    currentPage = 3;
    displayProducts(currentPage);
});

//Lignes : oumayma 
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

                    // Save product details to localStorage
                    localStorage.setItem("productName", item.name);
                    localStorage.setItem("productDescription", item.short_description);
                    localStorage.setItem("productImage", item.image_urls[0]);

                    // Save short_description and images array to localStorage
                    localStorage.setItem("short_description", item.short_description);
                    localStorage.setItem("images", JSON.stringify(item.image_urls));  // Store image URLs as a JSON array

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
function closeZoom() {
    document.getElementById('zoomModal').classList.add('hidden'); // Cache le modal
}

// Appel de la fonction pour charger les images depuis l'API
loadImagesFromAPI();

localStorage.clear()
