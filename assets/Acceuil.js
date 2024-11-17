let currentPage = 1;
const itemsPerPage = 4;
let productsData = [];

// Fetch the product data from JSON file
fetch('https://theshamkhi.github.io/GearBox_PC/data/data.json')
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


function exportCartToJson() {
    // Get the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Convert cart data to JSON
    const jsonData = JSON.stringify(cart, null, 2);

    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application.json' });

    // Create a download link for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cartData.json';  // Name of the file to be downloaded

    // Trigger the download
    link.click();
}

/* Example button to trigger export
const exportButton = document.createElement('button');
exportButton.innerText = 'Download Cart Data';
exportButton.onclick = exportCartToJson;
document.body.appendChild(exportButton); 

*/ 

























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
