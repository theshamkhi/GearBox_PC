const slides = document.getElementById('carousel-images');
    slides.addEventListener("wheel",(evnt)=>{
    slides.scrollLeft += evnt.deltaX
    })

    function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
    }
        let AcurrentPage = 1;
        const AitemsPerPage = 4;
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
                displayProducts(AcurrentPage); // Display initial page
            })
            .catch(error => console.error('Error:', error));

        // Function to display products based on the current page
        function displayProducts(page) {
            const startIndex = (page - 1) * AitemsPerPage;
            const endIndex = page * AitemsPerPage;
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
                       
                          <a href="#" id="bouton4" class="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7 mt-5"  onclick="addToCart('${product.id}', '${product.name}', '${product.image_urls[0]}', '${product.price}', '${product.short_description}')">
                Ajouter au panier
            </a>
                    </div>
                  
                `;
                productList.appendChild(productCard);
            });
        }

function addToCart(id, name, image, price, shortDescription) {
       
        const productPrice = parseFloat(price);

        const productId = `product-${Math.random().toString(36).substring(7)}`;

      
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

       
        const existingProductIndex = cart.findIndex(item => item.id === id);

        if (existingProductIndex > -1) {
            // Update quantity and price if product already exists in cart
            cart[existingProductIndex].quantity += 1;
            cart[existingProductIndex].totalPrice = (productPrice * cart[existingProductIndex].quantity).toFixed(2);
        } else {
            // Add new product to cart
            const newProduct = {
                id: productId,
                name: name,
                image: image,
                price: productPrice,
                shortDescription: shortDescription,
                quantity: 1,
                totalPrice: productPrice.toFixed(2) 
            };
            cart.push(newProduct);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${name} a été ajouté au panier!`);
    }

   
    document.getElementById('page1').addEventListener('click', () => {
        AcurrentPage = 1;
        displayProducts(AcurrentPage);
    });

    document.getElementById('page2').addEventListener('click', () => {
        currentPage = 2;
        displayProducts(AcurrentPage);
    });

    document.getElementById('page3').addEventListener('click', () => {
        currentPage = 3;
        displayProducts(AcurrentPage);
    });




































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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