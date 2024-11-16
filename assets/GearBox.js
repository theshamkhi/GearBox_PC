/* Page Accueil */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/*Page Catalogue */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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






































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page Devis */







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































/* Page À Propos */

const carouselWrapper = document.getElementById('carousel-wrapper');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
const itemsPerSlide = 2; 
const totalItems = document.querySelectorAll('#carousel-wrapper .group').length;
const totalSlides = Math.ceil(totalItems / itemsPerSlide);

function updateCarousel() {
    const translateX = -(currentIndex * 100) / itemsPerSlide;
    carouselWrapper.style.transform = `translateX(${translateX}%)`;  
}

nextButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateCarousel();
    }
}); 