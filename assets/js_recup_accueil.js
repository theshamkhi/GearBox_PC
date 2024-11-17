 // Retrieve cart data from localStorage
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
 // Display cart details (for example)
 const cartList = document.getElementById('cart-list');
 if (cart.length > 0) {
     cart.forEach(item => {
         const cartItem = document.createElement('div');
         cartItem.innerHTML = `
             <h5>Product ID: ${item.id}</h5>
             <h5>${item.name}</h5>
             <p>Quantity: ${item.quantity}</p>
             <p>Total Price: ${item.totalPrice} dh</p>
         `;
         // 
         cartList.appendChild(cartItem);
     });
 } else {
     const message = document.createElement('p');
     message.textContent = 'Your cart is empty!';
     cartList.appendChild(message);
     
 }

