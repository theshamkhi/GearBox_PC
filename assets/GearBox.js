











































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































const itemsPerPage = 9;
let currentPage = 1;
let catalogData = [];
let filteredData = [];  
let totalPages = 1;

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


































































































































































































































































































































































































































































































/* Page Détails du Produit */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Panier */

// Wait for the DOM to fully load before running the functions
document.addEventListener('DOMContentLoaded', () => {
    DisplayProducts();
    Quantity();
    Summary();
    DeleteProduct();
});

function toggleCart() {
    const cartDropdown = document.getElementById('CartBar');
    cartDropdown.classList.toggle('translate-x-0');
    cartDropdown.classList.toggle('translate-x-full');
}

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

function DisplayProducts() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length) {
        const ProductsDiv = document.querySelector('.ProductsDiv');
        const CartSidebarDiv = document.querySelector('.CartSidebarDiv');

        ProductsDiv.innerHTML = '';
        CartSidebarDiv.innerHTML = '';

        cartItems.forEach((item, index) => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('border-b', 'rounded-lg', 'bg-white', 'shadow-lg', 'mb-6', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-2', 'items-center');

            newProduct.innerHTML = `
                <div class="col-span-1">
                    <img src="${item.image || 'https://via.placeholder.com/200'}" class="w-full h-full object-cover rounded-l-lg max-h-56 md:max-h-64"> 
                </div>
                <div class="col-span-1 md:col-span-2 flex flex-col space-y-4 p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg md:text-xl font-semibold text-gray-800">${item.productName}</h3>
                        <button class="text-red-500 text-xl hover:text-red-600 transition duration-150" title="Remove" data-index="${index}">&#128465;</button>
                    </div>
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed">${item.shortDescription || 'No description available'}</p>
                    <div class="flex justify-between items-center">
                        <p class="text-lg md:text-xl font-bold text-gray-900" id="Price-${index}">${item.totalPrice} MAD</p>
                        <div class="flex items-center space-x-2">
                            <button 
                                class="quantityBtn decrease px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg" 
                                data-index="${index}">
                                -
                            </button>
                            <span 
                                class="quantity-display w-12 text-center border rounded-md text-base md:text-lg" 
                                id="quantity-${index}">
                                ${item.quantity}
                            </span>
                            <button 
                                class="quantityBtn increase px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg" 
                                data-index="${index}">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            `;

            ProductsDiv.appendChild(newProduct);

            // Cart Sidebar Div
            const sidebarProduct = document.createElement('div');
            sidebarProduct.classList.add('flex', 'items-center', 'space-x-4', 'border-b', 'pb-4');

            sidebarProduct.innerHTML = `
                <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.productName}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${item.productName}</h4>
                    <div class="flex justify-between items-center">
                        <p class="text-gray-600 text-sm">${item.totalPrice} MAD</p>
                        <button class="text-md" title="Remove" data-index="${index}">&#128465;</button>
                    </div>
                </div>
            `;

            CartSidebarDiv.appendChild(sidebarProduct);
        }); // Closing forEach
    } else {
        console.log('No products found in local storage.');
    }
}

function Quantity() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("quantityBtn")) {
            const index = event.target.getAttribute("data-index");
            const action = event.target.classList.contains("increase") ? "increase" : "decrease";

            // Update quantity based on action
            if (action === "increase") {
                cartItems[index].quantity++;
            } else if (action === "decrease" && cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            }

            // Update total price
            cartItems[index].totalPrice = (
                parseFloat(cartItems[index].promotionalPrice) * cartItems[index].quantity
            ).toFixed(2);

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            document.querySelector(`#quantity-${index}`).textContent = cartItems[index].quantity;
            document.querySelector(`#Price-${index}`).textContent = `${cartItems[index].totalPrice} MAD`;

            // Refresh summary
            Summary();
        }
    });
}

// Function for Summary Section
const DELIVERY_FEE = 20;

function Summary() {

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let subtotal = 0;

    // Calculate Subtotal
    cartItems.forEach(item => {
        subtotal += parseFloat(item.promotionalPrice) * item.quantity;
    });

    // Calculate Total
    const total = subtotal + DELIVERY_FEE;

    document.getElementById("SubTotal").textContent = `${subtotal.toFixed(2)} MAD`;
    document.getElementById("Total").textContent = `${total.toFixed(2)} MAD`;
}

// Function for product deletion
function DeleteProduct() {
    document.addEventListener("click", (event) => {
        // Check if the clicked element is a delete button
        if (event.target.matches('button[title="Remove"]')) {
            const index = event.target.getAttribute("data-index");

            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

            if (index >= 0 && index < cartItems.length) {
                cartItems.splice(index, 1);

                // Save updated cart to localStorage for Devis
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                // The display is updated immediately
                DisplayProducts();
                Summary();
            }
        }
    });
}