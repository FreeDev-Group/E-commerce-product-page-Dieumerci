# 🎯 PLAN D'ACTION - Checklist Interactive

## 📌 PHASE 1: CORRECTIONS URGENTES (Priorité: 🔴 CRITIQUE)
*Durée estimée: 3-4 heures*

### Étape 1.1: Supprimer la duplication CSS
```
[ ] Localiser: /CSS/styles.css (le fichier à GARDER)
[ ] Localiser: /style.css (le fichier à SUPPRIMER)
[ ] Vérifier que index.html importe CSS/styles.css
[ ] Confirmer que style.css n'est importé nulle part
[ ] ❌ SUPPRIMER: style.css
[ ] ✅ Tester le site dans le navigateur
[ ] ✅ Vérifier la console pour les erreurs
```

**Fichier à supprimer:**
- ❌ `/style.css`

**Fichier à garder:**
- ✅ `/CSS/styles.css`

---

### Étape 1.2: Corriger le HTML - Balise <br> mal placée

**Fichier:** `index.html` ligne 27

**AVANT:**
```html
<p class="item-price">$125.00 x <span id="cartQuantity">0 <br></span> <strong id="cartTotal">$0.00</strong></p>
```

**APRÈS:**
```html
<p class="item-price">
    <span>$125.00 × <span id="cartQuantity">0</span></span>
    <strong id="cartTotal">$0.00</strong>
</p>
```

**Checklist:**
```
[ ] Ouvrir index.html
[ ] Naviguer à la ligne 25-30
[ ] Remplacer le code
[ ] Sauvegarder
[ ] Tester dans le navigateur
```

---

### Étape 1.3: Ajouter le Header manquant

**Fichier:** `index.html` - à ajouter avant la ligne 18

**Code à ajouter:**
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

**Checklist:**
```
[ ] Ouvrir index.html
[ ] Localiser la ligne 18 (avant <!-- CART DROPDOWN -->)
[ ] Copier et coller le code du header
[ ] Vérifier que les chemins des images sont corrects
[ ] Sauvegarder
[ ] Tester visuellement
```

---

### Étape 1.4: Remplacer Script.js par la version corrigée

**Fichier:** `JS/Script.js`

**À faire:**
```
[ ] Sauvegarder l'ancien Script.js comme backup (Script.js.backup)
[ ] Remplacer complètement le contenu du fichier
[ ] Utiliser le code de SOLUTIONS_TECHNIQUES.md
[ ] Sauvegarder
[ ] Vérifier la console (F12) pour les erreurs
```

**Points clés du nouveau code:**
- ✅ Gestion dynamique du panier
- ✅ Suppression par ID (pas de vider tout)
- ✅ Support clavier complet
- ✅ Notifications toast
- ✅ Gestion d'erreurs

---

## 🟡 PHASE 2: CORRECTIONS IMPORTANTES (Priorité: 🟡 MOYEN)
*Durée estimée: 4-5 heures*

### Étape 2.1: Ajouter les styles pour les notifications

**Fichier:** `CSS/styles.css` - ajouter à la fin

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

**Checklist:**
```
[ ] Ouvrir CSS/styles.css
[ ] Aller à la fin du fichier
[ ] Ajouter le code CSS
[ ] Sauvegarder
[ ] Tester en ajoutant un article au panier
```

---

### Étape 2.2: Tester toutes les fonctionnalités

**Checklist de test (Desktop):**
```
[ ] Accueil - Header visible avec navigation
[ ] Galerie - Cliquer sur chaque thumbnail
[ ] Galerie - Changer l'image principale
[ ] Quantité - Augmenter de 1
[ ] Quantité - Diminuer de 1
[ ] Quantité - Vérifier max 10
[ ] Ajouter au panier - Notification apparaît
[ ] Panier - Badge de quantité s'affiche
[ ] Panier - Voir le montant total
[ ] Panier - Supprimer l'article (TEST CRITIQUE!)
[ ] Checkout - Valider la commande
```

**Checklist de test (Mobile):**
```
[ ] Responsive - Vue mobile OK
[ ] Hamburger menu - Affichage correct
[ ] Galerie - Thumbnails en mobile
[ ] Quantité - Bien visible
[ ] Panier - Position fixe en bas
[ ] Touch - Tous les boutons cliquables
```

**Checklist de test (A11y - Accessibilité):**
```
[ ] Clavier - Tab navigue les éléments
[ ] Clavier - Enter/Space sur les boutons
[ ] Clavier - Escape ferme le panier
[ ] Screen reader - Texte alternatif présent
[ ] Focus - Visible sur tous les éléments
[ ] Contraste - Texte lisible
```

---

## 🔵 PHASE 3: AMÉLIORATIONS FUTURES (Priorité: 🔵 FAIBLE)
*Durée estimée: 6-8 heures*

### Étape 3.1: Ajouter localStorage (Persistance du panier)

```javascript
// Charger le panier au démarrage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Sauvegarder à chaque modification
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Appeler dans addToCart et deleteFromCart
saveCartToStorage();

// Au chargement de la page
window.addEventListener('DOMContentLoaded', loadCartFromStorage);
```

**Checklist:**
```
[ ] Ajouter les fonctions localStorage dans Script.js
[ ] Tester: ajouter au panier → rafraîchir → panier persiste
[ ] Tester: nettoyer après checkout
[ ] Tester sur navigateur privé (localStorage n'existe pas)
```

---

### Étape 3.2: Améliorer le Checkout (Modal au lieu d'Alert)

```html
<!-- Ajouter à la fin du body -->
<div class="modal" id="checkoutModal" hidden>
    <div class="modal-content">
        <h2>Commande Confirmée!</h2>
        <p>Merci pour votre achat</p>
        <p id="confirmationDetails"></p>
        <button class="modal-close">Fermer</button>
    </div>
</div>
```

**Checklist:**
```
[ ] Ajouter le HTML du modal
[ ] Ajouter le CSS du modal
[ ] Remplacer confirm() par le modal
[ ] Tester le modal sur mobile
[ ] Vérifier l'accessibilité du modal
```

---

### Étape 3.3: Ajouter des Tests Unitaires

```javascript
// Exemple avec Jest
describe('Cart Functions', () => {
    test('should add item to cart', () => {
        // ...
    });
    
    test('should delete item from cart', () => {
        // ...
    });
    
    test('should calculate total', () => {
        // ...
    });
});
```

**Checklist:**
```
[ ] Installer Jest: npm install --save-dev jest
[ ] Créer fichier __tests__/cart.test.js
[ ] Écrire 5-10 tests
[ ] Lancer les tests: npm test
[ ] Atteindre 80%+ de couverture
```

---

## 📊 MATRICE DE PRIORITÉ

```
┌─ CRITIQUE ───────────────────────────────────┐
│                                              │
│  1. Supprimer style.css duplicata            │
│  2. Corriger balise <br> dans index.html     │
│  3. Ajouter header manquant                  │
│  4. Remplacer Script.js (panier bug)         │
│                                              │
└──────────────────────────────────────────────┘

┌─ IMPORTANT ───────────────────────────────────┐
│                                               │
│  5. Ajouter styles notifications              │
│  6. Tester toutes les fonctionnalités         │
│  7. Vérifier accessibilité                    │
│  8. Ajouter localStorage                      │
│                                               │
└───────────────────────────────────────────────┘

┌─ BONUS ──────────────────────────────────────┐
│                                              │
│  9. Améliorer checkout (modal)               │
│ 10. Ajouter tests unitaires                  │
│ 11. Optimiser performance                    │
│ 12. Créer backend API                        │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 🎯 VUE D'ENSEMBLE

```
Jour 1 (Urgent)        ████░░░░░░ 4h
├─ CSS duplication
├─ HTML correction
├─ Header ajout
└─ Script remplacement

Jour 2 (Important)     ██████░░░░ 5h
├─ Styles notifications
├─ Tests fonctionnalités
├─ Tests accessibilité
└─ localStorage (bonus)

Jour 3+ (Futur)        ████░░░░░░ 8h+
├─ Modal checkout
├─ Tests unitaires
├─ Backend API
└─ Paiement intégration
```

---

## ✅ VALIDATION FINALE

Une fois tout terminé, vérifier:

```
FONCTIONNALITÉ
[ ] Galerie d'images fonctionne
[ ] Quantité peut être modifiée
[ ] Ajout au panier fonctionne
[ ] Suppression d'un article fonctionne (PAS TOUS!)
[ ] Checkout fonctionne
[ ] Total calcule correctement

ACCESSIBILITÉ
[ ] Navigation au clavier complète
[ ] Lecteur d'écran fonctionne
[ ] Contraste des couleurs OK
[ ] Focus visible partout
[ ] ARIA labels présents

RESPONSIVITÉ
[ ] Desktop (1440px) ✓
[ ] Tablet (768px) ✓
[ ] Mobile (375px) ✓
[ ] Touch friendly ✓

PERFORMANCE
[ ] Aucune erreur console
[ ] Chargement < 3s
[ ] Pas de layout shift
[ ] Images optimisées
```

---

## 📞 SUPPORT

Si vous êtes bloqué:

1. Vérifier la console (F12) pour les erreurs
2. Consulter SOLUTIONS_TECHNIQUES.md
3. Comparer avec ANALYSE_BUGS_ET_SOLUTIONS.md
4. Tester isolé chaque correction

---

**Last Updated:** 13 Mars 2026  
**Status:** ✅ Prêt à être suivi  
**Estimated Completion:** 8-10 heures de travail
