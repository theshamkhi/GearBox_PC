


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

  // Fonction pour récupérer un paramètre URL
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

let maxQuantity = 1; // Valeur par défaut avant le chargement des données
let itemPrice = 0; // Prix de l'article
let cartTotal = 0; // Prix total dans le panier
let calul_prix_promotion = 0; // Prix promotionnel de l'article

// Fonction pour charger les données du panier depuis le localStorage au chargement de la page
function loadCartData() {
    const savedCartTotal = localStorage.getItem("cartTotal");
    if (savedCartTotal) {
        cartTotal = parseFloat(savedCartTotal);
        document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;
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

                    // Définir le prix de l'article
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

    // Calculer le prix total de l'article de base
    let totalItemPrice = quantity * parseFloat(calul_prix_promotion);

    // Appliquer une remise supplémentaire de 1% si la quantité est de 3 ou plus
    if (quantity == 3) {
        totalItemPrice *= 0.99; // Appliquer une remise de 1%
        totalItemPrice = parseFloat(totalItemPrice.toFixed(2)); // Arrondir à 2 décimales

        // Afficher le message de promotion
        showPromotionMessage();
    }

    // Mettre à jour le total du panier
    cartTotal += totalItemPrice;
    localStorage.setItem("cartTotal", cartTotal);

    // Récupérer les éléments du panier existant ou initialiser un tableau vide
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // L'ID commence à 1000 et s'incrémente pour chaque nouvel article
    let nextProductId = cartItems.length ? cartItems[cartItems.length - 1].id + 1 : 1000;

    // Vérifier si le produit existe déjà dans le panier
    const existingItemIndex = cartItems.findIndex(item => item.productName === name_product.innerHTML);

    if (existingItemIndex >= 0) {
        // Mettre à jour la quantité et le prix total si le produit existe déjà dans le panier
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].totalPrice = (cartItems[existingItemIndex].quantity * parseFloat(calul_prix_promotion)).toFixed(2);
    } else {
        // Ajouter un nouveau produit au panier avec un ID unique
        const itemDetails = {
            id: nextProductId, // ID commence à 1000 et s'incrémente
            productName: name_product.innerHTML,
            promotionalPrice: calul_prix_promotion,
            quantity: quantity,
            totalPrice: totalItemPrice.toFixed(2)
        };
        cartItems.push(itemDetails);
    }

    // Sauvegarder le tableau mis à jour dans localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Afficher le total mis à jour du panier
    document.getElementById("cartTotal").textContent = `${cartTotal.toFixed(2)} MAD`;

    // Log pour vérifier le calcul
    console.log("Quantité ajoutée:", quantity, "Prix unitaire (promotion):", calul_prix_promotion, "Prix total de l'article:", totalItemPrice, "Total du panier:", cartTotal);
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

// Sélectionner toutes les images avec la classe "zoomable"
const zoomableImages = document.querySelectorAll('.zoomable');

// Zone modale et image zoomée
const zoomModal = document.getElementById('zoomModal');
const zoomedImage = document.getElementById('zoomedImage');

// Fonction pour afficher l'image en zoom
zoomableImages.forEach(image => {
    image.addEventListener('click', () => {
        zoomedImage.src = image.src; // Définir la source de l'image zoomée sur celle cliquée
        zoomModal.classList.remove('hidden'); // Afficher le modal
    });
});

// Fonction pour fermer le zoom
function closeZoom() {
    document.getElementById('zoomModal').classList.add('hidden'); // Cacher le modal
}

// Appeler la fonction pour charger les images depuis l'API
loadImagesFromAPI();

