// ISSUE 4: PRODUCT IMAGE GALLERY
// Image switching functionality
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const newImageSrc = this.getAttribute('data-image');
        mainImage.src = newImageSrc;
        
        // Update active thumbnail state
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
    });
});

// ISSUE 6: QUANTITY SELECTOR

const quantityDisplay = document.getElementById('quantityDisplay');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
let quantity = 0;

// Increase quantity
increaseBtn.addEventListener('click', function() {
    quantity++;
    quantityDisplay.textContent = quantity;
});

// Decrease quantity (prevent negative)
decreaseBtn.addEventListener('click', function() {
    if (quantity > 0) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});

// ISSUE 7: ADD TO CART FUNCTIONALITY

const addToCartBtn = document.getElementById('addToCartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const cartEmpty = document.querySelector('.cart-empty');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const cartQuantity = document.getElementById('cartQuantity');
let cart = [];

addToCartBtn.addEventListener('click', function() {
    if (quantity > 0) {
        // Product data
        const product = {
            id: 1,
            name: 'Fall Limited Edition Sneakers',
            price: 125.00,
            quantity: quantity,
            image: './images/image-product-1-thumbnail.jpg'
        };

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push(product);
        }

        // Update cart display
        updateCartDisplay();
        
        // Reset quantity to 0
        quantity = 0;
        quantityDisplay.textContent = quantity;

        // Show visual feedback
        addToCartBtn.textContent = 'Added!';
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to cart';
        }, 1500);
    }
});

// ISSUE 8: CART DROPDOWN

function updateCartDisplay() {
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        
        // Calculate total price
        let total = 0;
        let totalQty = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            totalQty += item.quantity;
        });

        // Update cart info
        cartQuantity.textContent = totalQty;
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Update cart badge
        updateCartBadge(totalQty);
    }
}

// Update cart badge number in header (handled by other team)
function updateCartBadge(count) {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        if (count > 0) {
            cartBadge.textContent = count;
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Delete item from cart
const deleteBtn = document.querySelector('.delete-btn');
if (deleteBtn) {
    deleteBtn.addEventListener('click', function() {
        cart = [];
        updateCartDisplay();
    });
}

// Toggle cart dropdown visibility (header handled by other team)
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', function() {
        const isHidden = cartDropdown.hasAttribute('hidden');
        
        if (isHidden) {
            cartDropdown.removeAttribute('hidden');
        } else {
            cartDropdown.setAttribute('hidden', '');
        }
    });
}

// Close cart dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (cartDropdown && cartBtn) {
        if (!cartDropdown.contains(event.target) && !cartBtn.contains(event.target)) {
            cartDropdown.setAttribute('hidden', '');
        }
    }
});
// CHECKOUT FUNCTIONALITY

const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert(`Order confirmed!\nTotal: ${document.getElementById('cartTotal').textContent}\nThank you for your purchase!`);
            cart = [];
            updateCartDisplay();
            cartDropdown.setAttribute('hidden', '');
        }
    });
}

// ACCESSIBILITY: KEYBOARD NAVIGATION
     
// Allow thumbnail selection with keyboard
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Quantity buttons keyboard support
[increaseBtn, decreaseBtn].forEach(btn => {
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});
