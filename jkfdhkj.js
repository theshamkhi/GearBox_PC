function DisplayProducts() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length) {
        const ProductsDiv = document.querySelector('.ProductsDiv');
        const CartSidebarDiv = document.querySelector('.CartSidebarDiv');

        ProductsDiv.innerHTML = '';
        CartSidebarDiv.innerHTML = '';

        cartItems.forEach(item => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('border-b', 'rounded-lg', 'bg-white', 'shadow-lg', 'mb-6', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-2', 'items-center');

            // Main Products Div
            newProduct.innerHTML = `
                <div class="col-span-1">
                    <img src="${item.image || '../assets/media/Product1.png'}" alt="${item.productName}" class="w-full h-full object-cover rounded-l-lg max-h-56 md:max-h-64">
                </div>
                <div class="col-span-1 md:col-span-2 flex flex-col space-y-4 p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg md:text-xl font-semibold text-gray-800">${item.productName}</h3>
                        <button class="text-red-500 text-xl hover:text-red-600 transition duration-150" title="Remove" data-id="${item.id}">&#128465;</button>
                    </div>
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed">${item.shortDescription || 'No description available'}</p>
                    <div class="flex justify-between items-center">
                        <p class="text-lg md:text-xl font-bold text-gray-900" id="Price-${item.id}">${item.totalPrice} MAD</p>
                        <div class="flex items-center space-x-2">
                            <button class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg" data-id="${item.id}" id="MinusBtn-${item.id}">-</button>
                            <input type="number" value="1" class="w-12 text-center border rounded-md text-base md:text-lg" id="quantity">
                            <button class="px-3 py-1 text-gray-500 border rounded-md hover:bg-gray-100 text-base md:text-lg" data-id="${item.id}" id="PlusBtn-${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `;

            ProductsDiv.appendChild(newProduct);

            // Cart Sidebar Div
            const sidebarProduct = document.createElement('div');
            sidebarProduct.classList.add('flex', 'items-center', 'space-x-4', 'border-b', 'pb-4');

            sidebarProduct.innerHTML = `
                <img src="${item.image || '../assets/media/Product1.png'}" alt="${item.productName}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${item.productName}</h4>
                    <div class="flex justify-between items-center">
                        <p class="text-gray-600 text-sm">${item.totalPrice} MAD</p>
                        <button class="text-md" title="Remove" data-id="${item.id}">&#128465;</button>
                    </div>
                </div>
            `;

            CartSidebarDiv.appendChild(sidebarProduct);

            // Add event listeners for the quantity buttons
            const PlusBtn = document.getElementById(PlusBtn-`${item.id}`);
            const MinusBtn = document.getElementById(MinusBtn-`${item.id}`);
            const Quantity = document.getElementById('quantity`');
            const Price = document.getElementById(Price-`${item.id}`);

            PlusBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(Quantity.value);
                currentQuantity++;
                Quantity.value = currentQuantity;
                Price.textContent = `${(currentQuantity * item.price).toFixed(2)} MAD`;
                Summary(cartItems);
            });

            MinusBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(Quantity.value);
                if (currentQuantity > 1) {
                    currentQuantity--;
                    Quantity.value = currentQuantity;
                    Price.textContent = `${(currentQuantity * item.price).toFixed(2)} MAD`;
                    Summary(cartItems);
                }
            });
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('button[title="Remove"]').forEach(button => {
            button.addEventListener('click', function () {
                const ProductId = parseInt(this.getAttribute('data-id'));
                DeleteProduct(ProductId);
            });
        });
    } else {
        console.log('No products found in local storage.');
    }
}

function DeleteProduct(ProductId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const RemainingProducts = cartItems.filter(item => item.id !== ProductId);
    localStorage.setItem('cartItems', JSON.stringify(RemainingProducts));
    DisplayProducts();
}

function Summary(cartItems) {
    const SubTotal = document.getElementById("SubTotal");
    const Total = document.getElementById("Total");

    let subtotal = 0;
    cartItems.forEach(item => {
        const Quantity = parseInt(document.getElementById('quantity').value) || 1;
        subtotal += item.price * Quantity;
    });

    const DeliveryFee = 21.30;
    const total = subtotal + DeliveryFee;

    SubTotal.textContent = `${subtotal.toFixed(2)} MAD`;
    Total.textContent = `${total.toFixed(2)} MAD`;
}

document.addEventListener('DOMContentLoaded', DisplayProducts);