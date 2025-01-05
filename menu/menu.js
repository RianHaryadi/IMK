document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cartItems')) || []; // Use 'cartItems' key

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to the clicked menu item
            this.classList.add('active');
            
            // Handle menu item click
            const contentId = this.getAttribute('data-content');
            const contentSections = document.querySelectorAll('.content-section');
            
            contentSections.forEach(section => {
                if (section.id === contentId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    window.navigateToPage = function(page) {
        window.location.href = page;
    };

    window.showProductDetails = function(name, description, price, image) {
        console.log('Image URL:', image); // Debugging line to check the image URL
        document.getElementById('popupProductName').innerText = name;
        document.getElementById('popupProductDescription').innerText = description;
        document.getElementById('popupProductPrice').innerText = price;
        document.getElementById('popupProductImage').src = image;
        document.getElementById('productpopup').style.display = 'block';
    };

    window.closepopup = function() {
        document.getElementById('productpopup').style.display = 'none';
    };

    window.updateQuantity = function(button, change) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.innerText);
        quantity = Math.max(1, quantity + change);
        quantityElement.innerText = quantity;
    };

    window.addToCart = function(name, price, image) {
        const quantity = parseInt(document.querySelector('#popupQuantity').innerText);
        const item = { name, price, quantity, image };
        console.log('Adding to cart:', item); // Debug log
        cart.push(item);
        saveCart();
        updateCartCount();
        closepopup();
        syncCart();
    };

    window.confirmAddToCart = function(name, price, image, button) {
        if (!button) {
            console.error('Button element is not provided');
            return;
        }
        const quantityElement = button.parentElement.querySelector('.quantity');
        const quantity = parseInt(quantityElement.innerText);
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const item = { name, price, quantity, image };
            console.log('Confirming add to cart:', item); // Debug log
            cart.push(item);
        }

        saveCart();
        updateCartCount();
        button.style.display = 'none';
        button.previousElementSibling.style.display = 'block';
        syncCart();
    };

    function saveCart() {
        console.log('Saving cart:', cart); // Debug log
        localStorage.setItem('cartItems', JSON.stringify(cart)); // Use 'cartItems' key
    }

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = count;
        cartCount.style.display = count > 0 ? 'inline' : 'none';
        console.log('Cart count updated:', count); // Debug log
    }

    function syncCart() {
        console.log('Syncing cart:', cart); // Debug log
        localStorage.setItem('cartItems', JSON.stringify(cart)); // Use 'cartItems' key
    }

    window.showQuantityControls = function(button) {
        const quantityControls = button.previousElementSibling;
        quantityControls.style.display = 'block';
        button.style.display = 'none';
        button.nextElementSibling.style.display = 'block';
    };
    
    window.updateQuantityInCart = function(button, change, name) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        const quantity = parseInt(quantityElement.innerText);
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const item = { name, price, quantity, image };
            cart.push(item);
        }

        saveCart();
        updateCartCount();
        button.style.display = 'none';
        button.previousElementSibling.style.display = 'block';
        syncCart();
    };

    // Load cart count on page load
    updateCartCount();

    // Event listener for navigation based on filter buttons
    document.querySelectorAll('.filter-buttons button').forEach((button, index) => {
        button.addEventListener('click', () => {
            switch (index) {
                case 0:
                    window.location.href = 'Buger.html'; // Navigate to Pizza page
                    break;
                case 1:
                    window.location.href = 'Hotdog.html'; // Navigate to Drink page
                    break;
                case 2:
                    window.location.href = 'Kentang.html'; // Navigate to Lasagna page
                    break;
                case 3:
                    window.location.href = 'Minuman.html'; // Navigate to Dessert page
                    break;
            }
        });
    });

    // Function to mark items as sold out
    function markItemsAsSoldOut() {
        const soldOutItems = JSON.parse(localStorage.getItem('soldOutItems')) || [];
        soldOutItems.forEach(name => {
            const itemElement = document.querySelector(`.pizza-item:has(img[alt="${name}"])`);
            if (itemElement) {
                itemElement.classList.add('sold-out');
                const addToCartButton = itemElement.querySelector('.cart-button');
                if (addToCartButton) {
                    addToCartButton.disabled = true;
                }
            }
        });
    }

    // Function to reset the menu to be available again
    function resetMenu() {
        const soldOutItems = document.querySelectorAll('.pizza-item.sold-out');
        soldOutItems.forEach(item => {
            item.classList.remove('sold-out');
            const addToCartButton = item.querySelector('.cart-button');
            if (addToCartButton) {
                addToCartButton.disabled = false;
            }
        });
        localStorage.removeItem('soldOutItems');
        updateCartCount();
        location.reload(); // Reload the page without delay
    }

    // Simulate successful payment
    function simulatePaymentSuccess() {
        // ...payment code...
        markItemsAsSoldOut();
    }

    // Event listener for reset menu button
    const resetButton = document.getElementById('reset-menu-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetMenu);
    }

    // Update cart count and mark sold out items on page load
    updateCartCount();
    markItemsAsSoldOut();
});
