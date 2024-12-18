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
    const partType = document.getElementById('part-type'); 
    
    if (category) {
        console.log('done');
        partType.value = 'category';
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
        filteredData.sort((a, b) => (a.price * 9) - (b.price * 9));
    } else if (sortOption === 'price-desc') {
        filteredData.sort((a, b) => (b.price * 9) - (a.price * 9));
    }
    currentPage = 1;  
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
            pageButton.classList.add('bg-blue-900');  
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
if(document.getElementById('searchBar')){
document.getElementById('searchBar').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    filteredData = catalogData.filter(item => item.name.toLowerCase().includes(searchQuery));


    currentPage = 1;
    

    updatePagination();
    renderPage();
    let cat = document.querySelector('.catalogItems');
    if(window.innerWidth<=800){cat.style.gridTemplateColumns = 'repeat(1, 1fr)';}
});}

function updatePagination() {
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
    let searchbar = document.querySelector('#searchBar');
    let searchBtn = document.querySelector('#srchBtn');
    let aff = document.querySelector('#affhi');
    let margin = document.querySelector('#mainflex');
    if(window.innerWidth<=800){
        searchbar.style.display = 'none';
        searchBtn.style.display = 'block';
        console.log(window.innerWidth);
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
        margin.style.marginLeft= '-30px';
        margin.style.marginRight= '-30px';
    }else{
        searchBtn.style.display = 'none';
        searchbar.style.display = 'block';
        searchbar.style.width = '60%';
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
    let searchbar = document.querySelector('#searchBar');
    let searchBtn = document.querySelector('#srchBtn');
    let cat = document.querySelector('.catalogItems');
    let aff = document.querySelector('#affhi');
    let margin = document.querySelector('#mainflex');
    if(window.innerWidth<=800){
        console.log(window.innerWidth);
        searchbar.style.display = 'none';
        searchBtn.style.display = 'block';
        filterPanel.style.display = 'none';
        fitBtn.style.display = 'block';
        cat.style.gridTemplateColumns = 'repeat(1, 1fr)';
        cat.style.justifyContent = "center";
        aff.style.display = 'none';
        margin.style.marginLeft= '-30px';
        margin.style.marginRight= '-30px';
    }else{
        searchBtn.style.display = 'none';
        searchbar.style.display = 'block';
        searchbar.style.width = '60%';
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


document.querySelector('#srchBtn').addEventListener('click',function(){
    document.querySelector('#searchBar').style.display = 'block';
})


























/*Page Panier*/
function toggleCart() {
    const cartDropdown = document.getElementById('CartBar');
    cartDropdown.classList.toggle('translate-x-0');
    cartDropdown.classList.toggle('translate-x-full');
}

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}