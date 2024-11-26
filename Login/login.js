document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password) {
        if (validateEmail(email)) {
            // Simulasi login sukses
            alert("Login berhasil! Anda akan diarahkan ke halaman notifikasi.");
            window.location.href = "/Login/succes.html"; // Arahkan ke halaman notifikasi
        } else {
            alert("Masukkan email yang valid.");
        }
    } else {
        alert("Email dan password tidak boleh kosong.");
    }
});

// Fungsi untuk validasi email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}