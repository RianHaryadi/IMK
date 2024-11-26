// Fungsi untuk navigasi antar halaman kategori (Burger, Hotdog, Kentang, Minuman)
document.querySelectorAll('.filter-buttons button').forEach((button, index) => {
    button.addEventListener('click', () => {
        switch (index) {
            case 0:
                window.location.href = 'Burger.html'; // Menuju halaman Burger
                break;
            case 1:
                window.location.href = 'Hotdog.html'; // Menuju halaman Hot Dog
                break;
            case 2:
                window.location.href = 'Kentang.html'; // Menuju halaman Kentang
                break;
            case 3:
                window.location.href = 'Minuman.html'; // Menuju halaman Minuman
                break;
        }
    });
});

// Ambil data keranjang dari localStorage atau inisialisasi jika kosong
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Fungsi untuk memperbarui jumlah item di navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Update angka di DOM secara langsung
    if (totalQuantity > 0) {
        cartCountElement.style.display = 'inline'; // Tampilkan angka cart
        cartCountElement.textContent = totalQuantity; // Update angka
    } else {
        cartCountElement.style.display = 'none'; // Sembunyikan jika kosong
    }
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productName, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if product already exists in cart
    const existingProduct = cartItems.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product exists
    } else {
        cartItems.push({ name: productName, price: price, quantity: 1 }); // Add new product
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to localStorage
    alert(`${productName} has been added to your cart.`);
    
    updateCartCount(); // Update cart count in navbar
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');

    if (totalQuantity > 0) {
        cartCountElement.style.display = 'inline';
        cartCountElement.textContent = totalQuantity;
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Call updateCartCount on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Fungsi untuk memperbarui jumlah produk di dalam elemen (di popup atau di menu)
function updateQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity = Math.max(1, currentQuantity + change); // Pastikan jumlah tidak kurang dari 1
    quantityElement.textContent = currentQuantity;
}

// Fungsi untuk menampilkan detail produk di dalam modal
function showProductDetails(name, description, price, imageSrc) {
    const popup = document.getElementById('productpopup');

    // Tampilkan popup
    popup.classList.add('active');

    // Perbarui konten popup
    document.getElementById('popupProductName').textContent = name;
    document.getElementById('popupProductDescription').textContent = description;
    document.getElementById('popupProductPrice').textContent = price;
    document.getElementById('popupProductImage').src = imageSrc;
    document.getElementById('popupQuantity').textContent = '1';

    // Tambahkan fungsi untuk tombol Add to Cart
    document.getElementById('addToCartpopupBtn').onclick = function () {
        addToCart(name, price);
        closeModal(); // Tutup popup setelah menambahkan ke keranjang
    };
}

function closepopup() {
    const popup = document.getElementById('productpopup');
    popup.classList.remove('active'); // Sembunyikan popup
}


// Sinkronisasi data keranjang saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount(); // Perbarui angka di navbar
});
