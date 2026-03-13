# Solutions de Correction - E-Commerce Product Page

## 🔧 CORRECTIONS DE CODE

### CORRECTION 1: Supprimer les balises `<br>` mal placées

**Avant (index.html ligne 27):**
```html
<p class="item-price">$125.00 x <span id="cartQuantity">0 <br></span> <strong id="cartTotal">$0.00</strong></p>
```

**Après:**
```html
<p class="item-price">
    <span>$125.00 × <span id="cartQuantity">0</span></span>
    <strong id="cartTotal">$0.00</strong>
</p>
```

---

### CORRECTION 2: Remplacement complet du Script.js

**Ancien code (problématique):**
- Gestion du panier simpliste
- Bug de suppression qui vide tout
- Pas de gestion dynamique

**Nouveau code (corrigé):**

```javascript
// =====================================================
// PRODUCT IMAGE GALLERY - ISSUE 4
// =====================================================
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    // Click handler
    thumbnail.addEventListener('click', function() {
        switchImage.call(this);
    });
    
    // Keyboard handler
    thumbnail.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchImage.call(this);
        }
    });
});

function switchImage() {
    const newImageSrc = this.getAttribute('data-image');
    mainImage.src = newImageSrc;
    mainImage.alt = this.querySelector('img').alt;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    this.classList.add('active');
}

// =====================================================
// QUANTITY SELECTOR - ISSUE 6
// =====================================================
const quantityDisplay = document.getElementById('quantityDisplay');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');

const MAX_QUANTITY = 10;
let quantity = 0;

increaseBtn.addEventListener('click', increaseQuantity);
decreaseBtn.addEventListener('click', decreaseQuantity);

// Keyboard support
[increaseBtn, decreaseBtn].forEach(btn => {
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

function increaseQuantity() {
    if (quantity < MAX_QUANTITY) {
        quantity++;
        updateQuantityDisplay();
    } else {
        showNotification('Stock limité à ' + MAX_QUANTITY + ' articles');
    }
}

function decreaseQuantity() {
    if (quantity > 0) {
        quantity--;
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    quantityDisplay.textContent = quantity;
}

// =====================================================
// CART MANAGEMENT - ISSUE 7 & 8
// =====================================================
const addToCartBtn = document.getElementById('addToCartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const cartEmpty = document.querySelector('.cart-empty');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const cartQuantity = document.getElementById('cartQuantity');

let cart = [];
const PRODUCT_ID = 1;
const PRODUCT_NAME = 'Fall Limited Edition Sneakers';
const PRODUCT_PRICE = 125.00;
const PRODUCT_IMAGE = './images/image-product-1-thumbnail.jpg';

// Add to cart
addToCartBtn.addEventListener('click', addToCart);

function addToCart() {
    if (quantity > 0) {
        const existingItem = cart.find(item => item.id === PRODUCT_ID);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: PRODUCT_ID,
                name: PRODUCT_NAME,
                price: PRODUCT_PRICE,
                quantity: quantity,
                image: PRODUCT_IMAGE
            });
        }
        
        updateCartDisplay();
        quantity = 0;
        updateQuantityDisplay();
        
        // Visual feedback
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Ajouté!';
        addToCartBtn.disabled = true;
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.disabled = false;
        }, 1500);
    } else {
        showNotification('Veuillez sélectionner une quantité');
    }
}

// Delete item from cart
function deleteFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    showNotification('Article supprimé du panier');
}

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
        cartQuantity.textContent = '0';
        cartTotal.textContent = '$0.00';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        renderCartItems();
        updateCartTotals();
    }
    
    updateCartBadge();
}

// Render cart items dynamically
function renderCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.setAttribute('data-item-id', item.id);
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">
                    $${item.price.toFixed(2)} × <span class="item-quantity">${item.quantity}</span>
                    <br>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
            </div>
            <button class="delete-btn" aria-label="Supprimer l'article">
                <img src="./images/icon-delete.svg" alt="Supprimer">
            </button>
        `;
        
        // Delete button handler
        const deleteBtn = itemElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteFromCart(item.id));
        
        cartItems.appendChild(itemElement);
    });
}

// Update cart totals
function updateCartTotals() {
    let total = 0;
    let totalQty = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        totalQty += item.quantity;
    });
    
    cartQuantity.textContent = totalQty;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// =====================================================
// CART DROPDOWN TOGGLE
// =====================================================
const cartBtn = document.getElementById('cartBtn') || document.querySelector('.cart-icon');

if (cartBtn) {
    cartBtn.addEventListener('click', toggleCartDropdown);
}

function toggleCartDropdown() {
    const isHidden = cartDropdown.hasAttribute('hidden');
    
    if (isHidden) {
        cartDropdown.removeAttribute('hidden');
        cartDropdown.setAttribute('aria-hidden', 'false');
    } else {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    if (cartBtn && !cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
});

// Close cart on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !cartDropdown.hasAttribute('hidden')) {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
});

// =====================================================
// CHECKOUT
// =====================================================
const checkoutBtn = document.querySelector('.checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', processCheckout);
}

function processCheckout() {
    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Showing a modal instead of alert
        const confirmCheckout = confirm(
            `Commande confirmée!\n\n` +
            `Nombre d'articles: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n` +
            `Total: $${total.toFixed(2)}\n\n` +
            `Cliquez OK pour valider votre commande.`
        );
        
        if (confirmCheckout) {
            cart = [];
            updateCartDisplay();
            cartDropdown.setAttribute('hidden', '');
            cartDropdown.setAttribute('aria-hidden', 'true');
            showNotification('✓ Commande validée avec succès!');
        }
    } else {
        showNotification('Votre panier est vide');
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
console.log('✓ Script loaded successfully');
```

---

### CORRECTION 3: Ajouter les styles pour les notifications dans CSS

**À ajouter dans `CSS/styles.css`:**

```css
/* ================================
   NOTIFICATIONS
   ================================ */

.notification {
    position: fixed;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-very-dark-blue);
    color: var(--color-white);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transition: bottom 0.3s ease;
    font-weight: var(--font-weight-bold);
    max-width: 90%;
}

.notification.show {
    bottom: 2rem;
}

@media (max-width: 768px) {
    .notification {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
    }
}
```

---

### CORRECTION 4: Ajouter section HEADER manquante

**À ajouter en début du `<body>` dans index.html (avant la ligne 18):**

```html
<!-- HEADER NAVIGATION -->
<header class="header">
    <div class="logo">
        <h2>Sneakers</h2>
    </div>
    
    <nav class="navbar">
        <ul>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    
    <div class="header-icons">
        <div class="cart-icon" id="cartBtn" role="button" tabindex="0" aria-label="Panier de commandes">
            <img src="./images/icon-cart.svg" alt="Panier">
            <div class="cart-badge" id="cartBadge" aria-label="Nombre d'articles dans le panier"></div>
        </div>
        <img src="./images/avatar.png" alt="Avatar" class="avatar">
    </div>
</header>
```

---

### CORRECTION 5: Supprimer le fichier style.css

- Gardez uniquement `CSS/styles.css`
- Supprimez `style.css` (redondant et conflictuel)

---

## 📋 CHECKLIST DE VALIDATION

- [ ] Pour chaque correction:
  1. Supprimer les anciens fichiers CSS
  2. Remplacer Script.js par la version corrigée
  3. Ajouter le header dans index.html
  4. Tester sur navigateur
  5. Vérifier la console pour les erreurs
  6. Tester la responsivité (mobile, tablet, desktop)
  7. Tester l'accessibilité (clavier, lecteur d'écran)
  8. Tester les fonctionnalités du panier

---

## 🎯 PROCHAINES ÉTAPES

1. **localStorage** - Sauvegarder le panier entre sessions
2. **API Backend** - Connecter à une vraie base de données
3. **Authentification** - Ajouter login/register
4. **Paiement** - Intégrer Stripe ou PayPal
5. **Admin Panel** - Gérer les produits
6. **Tests** - Ajouter Jest/Vitest pour tests unitaires

