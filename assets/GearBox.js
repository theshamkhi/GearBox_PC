let currentPageIndex = 1; // Renamed from currentPage
const productsPerPage = 4; // Renamed from itemsPerPage
let productsDataArray = []; // Renamed from productsData

// Fetch the product data from JSON file
fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Error loading data.json file");
        }
        return response.json();
    })
    .then(data => {
        productsDataArray = data; // Store the product data
        displayProducts(currentPageIndex); // Display initial page
    })
    .catch(error => console.error('Error:', error));

// Function to display products based on the current page
function displayProducts(pageIndex) {
    const startIndex = (pageIndex - 1) * productsPerPage;
    const endIndex = pageIndex * productsPerPage;
    const currentProducts = productsDataArray.slice(startIndex, endIndex);
    const productList = document.getElementById('product-list');

    // Clear previous products
    productList.innerHTML = '';

    // Loop through the current page products and create cards
    currentProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md');
        productCard.innerHTML = `
            <a href="templates/Details.html?id=${product.id}"">
                <img class="rounded-t-lg" src="${product.image_urls[0]}" alt="${product.name}">
            </a>
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${product.name}</h5>
                <p class="text-gray-700">${product.short_description}</p>
                <p class="text-lg font-semibold text-gray-900">${product.price} dh</p>
                <a href="templates/Details.html?id=${product.id}" id="bouton4" class="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7 mt-5">
                Voir Detail
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

    // Check if product already exists in cart based on product name
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        // Update quantity and add price to totalPrice if product already exists in cart
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice = (parseFloat(cart[existingProductIndex].totalPrice) + productPrice).toFixed(2);
    } else {
        // Add new product to cart with a numeric ID (not random)
        const newProduct = {
            id: cart.length + 1, // Assign numeric ID starting from 1
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
    currentPageIndex = 1;
    displayProducts(currentPageIndex);
});

document.getElementById('page2').addEventListener('click', () => {
    currentPageIndex = 2;
    displayProducts(currentPageIndex);
});

document.getElementById('page3').addEventListener('click', () => {
    currentPageIndex = 3;
    displayProducts(currentPageIndex);
});


function exportCartToJson() {
    // Get the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Convert cart data to JSON
    const jsonData = JSON.stringify(cart, null, 2);

    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cartData.json';  // Name of the file to be downloaded

    // Trigger the download
    link.click();
}

// Example button to trigger export
const exportButton = document.createElement('button');
exportButton.innerText = 'Download Cart Data';
exportButton.onclick = exportCartToJson;
document.body.appendChild(exportButton);















































































































































































































































































































































































































































































































































































































































































































































































































































































































/*Page Catalogue */
let itemsPerPage = 9;
let currentPage = 1;
let catalogData = [];
let filteredData = [];  
let totalPages = 1;



document.querySelectorAll("#affhi .items-per-page").forEach(span => {
    span.addEventListener('click', function() {
        const selectedItemsPerPage = parseInt(span.getAttribute("data-items"));
        itemsPerPage = selectedItemsPerPage;
        document.querySelectorAll("#affhi .items-per-page").forEach(item => item.classList.remove('font-bold'));
        span.classList.add('font-bold');
        renderItems('grid'); 
    });
});

async function theData() {
    try{
    const response = await fetch('https://oussamabenoujja.github.io/dataBase/data.json');  
    const data = await response.json();
    catalogData = data;
    return catalogData;  
    } catch (error) {
        console.error("Error loading catalog data:", error);
    }
}

console.log(theData());

async function loadCatalogData() {
    try {
        const response = await fetch('https://oussamabenoujja.github.io/dataBase/data.json');  
        const data = await response.json();
        catalogData = data;
        filteredData = catalogData;  

        updatePagination();  
        renderPage();        
    } catch (error) {
        console.error("Error loading catalog data:", error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category'); 
    
    if (category) {
        filteredData = catalogData.filter(item => item.part_type === category); 
        currentPage = 1; 
        updatePagination();
        renderPage();
    } else {
        loadCatalogData(); 
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const pageButtons = document.querySelectorAll('.pagination .page-btn');

    pageButtons.forEach(button => {
        button.addEventListener('click', function () {
            pageButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});



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
                    <a id="itemTitle${item.id}" href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id="item${item.id}">${item.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a id="cartButton${item.id}" href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

        document.getElementById(`item${item.id}`).addEventListener('click', function() {
            const data = { id: item.id };
            const queryString = new URLSearchParams(data).toString();
            window.location.href = `Details.html?${queryString}`;
        });

        document.getElementById(`cartButton${item.id}`).addEventListener('click', function() {
            const data = { id: item.id };
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

    
    filteredData = partType === "" ? catalogData : catalogData.filter(item => item.part_type === partType);

    
    currentPage = 1;

    
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

    
    partTypeSelect.addEventListener('change', function() {
        
        storageSelects.forEach(select => select.style.display = 'none');
        cpuSelects.forEach(select => select.style.display = 'none');
        gpuSelects.forEach(select => select.style.display = 'none');
        psuSelects.forEach(select => select.style.display = 'none');
        motherboardSelects.forEach(select => select.style.display = 'none');
        caseSelects.forEach(select => select.style.display = 'none');
        ramSelects.forEach(select => select.style.display = 'none');
        coolerSelects.forEach(select => select.style.display = 'none');

        
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
       
        return `
            <div class="item_cards w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 item-card">
                <a href="#">
                    <img class="p-8 rounded-t-lg" src="${item.image_urls[0]}" alt="product image" />
                </a>
                <div class="px-5 pb-5 text-center">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id="item${item.id}">${item.name}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a id="cartButton${item.id}" href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                <a href="#" class="listImage">
                    <img class="rounded-lg" src="${item.image_urls[0]}" alt="product image" style="width: 100px; height: auto;" />
                </a>
                <div class="thisinnerOut ml-4">
                    <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" id="item${item.id}">${item.name}</h5>
                    </a>
                    <div class="thisinnerItem flex items-center justify-between">
                    <span class="text-xl font-bold text-gray-900 dark:text-white">${(item.price*9).toFixed(2)} MAD</span>
                    <a id="cartButton${item.id}" href="#" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = filteredData.slice(start, end);

    if (viewType === 'list') {
        catalogItemsContainer.style.display = 'flex';
        catalogItemsContainer.style.flexDirection = 'column';
        catalogItemsContainer.style.gap = '10px';  
    } else {
        catalogItemsContainer.style.display = 'grid';
        catalogItemsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';  
        catalogItemsContainer.style.gap = '20px';  
    }

    itemsToDisplay.forEach(item => {
        console.log(item);  
        catalogItemsContainer.insertAdjacentHTML('beforeend', getItemHTML(item, viewType));
    
        const itemElement = document.getElementById(`item${item.id}`);
        if (itemElement) {
            itemElement.addEventListener('click', function() {
                const data = { id: item.id };
                const queryString = new URLSearchParams(data).toString();
                window.location.href = `Details.html?${queryString}`;
            });
        }
    
        const cartButton = document.getElementById(`cartButton${item.id}`);
        if (cartButton) {
            cartButton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log(`Item ${item.id} added to cart`);
            });
        }
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
    let margin = document.querySelector('#mainflex');
    if(window.innerWidth<=800){
        console.log(window.innerWidth);
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
        margin.style.marginLeft= '-30px';
        margin.style.marginRight= '-30px';
    }else{
        aff.style.display = 'block';
        closeFi.style.display = 'none';
        fitBtn.style.display = 'none';
        filterPanel.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(3, 1fr)';
        filterPanel.style.position = 'relative';
        filterPanel.style.width = '30%';
        margin.style.marginLeft= '50px';
        margin.style.marginRight= '50px';
        
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
    let margin = document.querySelector('#mainflex');
    if(window.innerWidth<=800){
        console.log(window.innerWidth);
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
        margin.style.marginLeft= '-30px';
        margin.style.marginRight= '-30px';
    }else{
        aff.style.display = 'block';
        closeFi.style.display = 'none';
        fitBtn.style.display = 'none';
        filterPanel.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(3, 1fr)';
        filterPanel.style.position = 'relative';
        filterPanel.style.width = '30%';
        margin.style.marginLeft= '50px';
        margin.style.marginRight= '50px';
        
    }
})

closeFi.addEventListener('click', function(){
    let filterPanel = document.querySelector('.rightSide');
    filterPanel.style.display = 'none';
})






































































































































































































































































































































































































































































































/* Page Détails du Produit */
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
// Wait for the DOM to fully load before running the functions
function toggleCart() {
    const cartDropdown = document.getElementById('CartBar');
    cartDropdown.classList.toggle('translate-x-0');
    cartDropdown.classList.toggle('translate-x-full');
}

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

// Fonction pour charger les produits du panier depuis le localStorage et afficher
function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Récupérer l'élément container où afficher les produits
    const cartItemsContainer = document.getElementById("cartItemsContainer");

    // S'assurer que la section est vide avant d'ajouter les produits
    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    // Parcourir les produits dans le panier et afficher chaque produit
    cartItems.forEach(item => {
        // Appeler la fonction pour récupérer la quantité disponible dans data.json
        getProductData(item.productName).then(availableQuantity => {
            // Calcul de la quantité disponible dans le stock en fonction de la quantité déjà achetée
            const quantityAvailableAfterPurchase = availableQuantity - item.quantity; // Quantité restante après achat

            // Créer le HTML pour afficher cet item
            const itemHTML = `
                <div class="border-b rounded-lg bg-white shadow-lg p-4 grid grid-cols-3 gap-4 items-start">
                    <div class="col-span-1">
                        <img src="${item.productImage}" alt="${item.productName}" class="w-full h-full object-cover rounded-md">
                    </div>
                    <div class="col-span-2 flex flex-col space-y-3 p-4">
                        <h3 class="text-base font-medium mb-3">${item.productName}</h3>
                        <p class="text-gray-600 text-sm">${item.shortDescription}</p>
                        <p class="text-lg font-semibold">${item.priceTotal} MAD</p>
                        <div class="flex justify-between items-center mt-4">
                            <div class="flex items-center space-x-2">
                                <button aria-label="Decrease quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100" onclick="decreaseQuantity(${item.id}, ${availableQuantity}, ${item.quantity})">-</button>
                                <input type="text" value="${item.quantity}" class="w-12 text-center border rounded-md" aria-label="Quantity" disabled>
                                <button aria-label="Increase quantity" class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100" onclick="increaseQuantity(${item.id}, ${availableQuantity}, ${item.quantity})">+</button>
                            </div>
                            <p class="text-sm text-gray-500 mt-2">Quantité disponible : ${quantityAvailableAfterPurchase}</p>
                            <button class="text-red-500 text-xl hover:text-red-600 transition duration-150" title="Retirer" onclick="removeItem(${item.id})">&#128465;</button>
                        </div>
                    </div>
                </div>
            `;

            cartItemsContainer.innerHTML += itemHTML; // Ajouter l'élément dans le container
        });
    });

    // Appeler la fonction pour mettre à jour le résumé du panier
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

    // Mettre à jour l'affichage dans le résumé
    document.getElementById("subtotal").textContent = `${subTotal.toFixed(2)} MAD`;
    document.getElementById("shippingCost").textContent = `${shippingCost.toFixed(2)} MAD`;
    document.getElementById("totalEstimated").textContent = `${totalEstimated.toFixed(2)} MAD`;
}

// Fonction pour diminuer la quantité d'un produit dans le panier
function decreaseQuantity(itemId, availableQuantity, currentQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex >= 0 && cartItems[itemIndex].quantity > 1) {
        // Diminuer la quantité
        cartItems[itemIndex].quantity--;
        cartItems[itemIndex].priceTotal = (cartItems[itemIndex].quantity * parseFloat(cartItems[itemIndex].unitPrice)).toFixed(2);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems(); // Rafraîchir l'affichage
    }
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function increaseQuantity(itemId, availableQuantity, currentQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
        // Vérifier si la quantité actuelle est inférieure à la quantité disponible
        if (currentQuantity < availableQuantity) {
            cartItems[itemIndex].quantity++;
            cartItems[itemIndex].priceTotal = (cartItems[itemIndex].quantity * parseFloat(cartItems[itemIndex].unitPrice)).toFixed(2);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            displayCartItems(); // Rafraîchir l'affichage
        } else {
            alert("Quantité maximale atteinte !");
        }
    }
}

// Fonction pour supprimer un produit du panier
function DeleteProduct(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    displayCartItems(); // Rafraîchir l'affichage
}

// Fonction pour récupérer les données du produit depuis data.json
function getProductData(productName) {
    return fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(item => item.name === productName);
            if (product) {
                return product.qt; // Retourne la quantité du produit par son nom
            } else {
                console.error("Produit non trouvé");
                return 0; // Retourner 0 si le produit n'est pas trouvé
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données du produit:", error);
            return 0; // Retourner 0 en cas d'erreur
        });
}

// Fonction pour charger les produits du panier au chargement de la page
displayCartItems();


































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Devis */
// Fonction pour charger les données du panier depuis localStorage et les afficher dans le tableau
function loadCartItems() {
    // Récupérer les articles du panier depuis localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartTotal = localStorage.getItem("cartTotal") || 0;

    // Sélectionner le corps du tableau
    const tableBody = document.getElementById("tbd");

    // Vider le tableau avant de le remplir
    tableBody.innerHTML = "";

    // Parcourir les articles du panier
    cartItems.forEach((item, index) => {
        // Créer une nouvelle ligne pour chaque produit
        const row = document.createElement("tr");
        row.classList.add("border-b"); // Ajouter une bordure entre les lignes

        // Ajouter les colonnes
        row.innerHTML = `
            <td class="px-6 py-4 font-medium">${index + 1}</td>
            <td class="px-6 py-4">${item.productName}</td>
            <td class="px-6 py-4">${item.unitPrice} MAD</td>
            <td class="px-6 py-4">${item.quantity}</td>
            <td class="px-6 py-4">${item.priceTotal} MAD</td>
        `;

        // Ajouter la ligne au tableau
        tableBody.appendChild(row);
    });

    // Ajouter le total global dans le pied du tableau
    const totalRow = document.createElement("tr");
    totalRow.classList.add("font-bold", "text-lg");
    totalRow.innerHTML = `
        <td colspan="4" class="px-6 py-4 text-right">Total :</td>
        <td class="px-6 py-4">${parseFloat(cartTotal).toFixed(2)} MAD</td>
    `;
    tableBody.appendChild(totalRow);
}

// Charger les données au chargement de la page
document.addEventListener("DOMContentLoaded", loadCartItems);
























































































































































































































































































































































































































































































































































































/* Page À Propos */

document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.getElementById('carousel-wrapper');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const items = document.querySelectorAll('#carousel-wrapper .group');
    const visibleItems = 3;
    const itemWidth = items[0].offsetWidth + 24; 
    let currentIndex = 0;

    const updateCarousel = () => {
        const offset = -currentIndex * itemWidth;
        carouselWrapper.style.transform = `translateX(${offset}px)`; // Fixed the template literal
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });
});













































































































































































































































































































































































































































/* Page À Propos */