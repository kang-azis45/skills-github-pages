// Fungsi untuk membuka dan menutup sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  }
  
  // Tutup sidebar saat mengklik di luar sidebar
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");
  
    // Jika yang diklik bukan sidebar atau tombol menu, tutup sidebar
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.classList.remove("active");
    }
  });
  
  // Pastikan sidebar tidak memiliki class active saat halaman dimuat
  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("active");
  });
  
  // Fungsi untuk toggle dark mode
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    // Simpan preferensi dark mode di localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  }
  
  // Cek preferensi dark mode saat halaman dimuat
  function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }
  
  // Panggil fungsi loadDarkMode saat halaman dimuat
  document.addEventListener("DOMContentLoaded", loadDarkMode);
  
  // Fungsi untuk membuka modal
  function bukaModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
  }
  
  // Fungsi untuk menutup modal
  function tutupModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("active");
    setTimeout(() => modal.style.display = "none", 300);
  }
  
  // Fungsi untuk memproses pembayaran
  function prosesPembayaran(metode) {
    const inputs = document.querySelectorAll(".modal-content input[type='text']");
    const nomorHP = document.getElementById("nomorhp").value.trim();
  
    for (let input of inputs) {
      if (input.value.trim() === "") {
        alert("Harap isi semua kolom sebelum melanjutkan pembayaran.");
        return;
      }
    }
  
    if (!/^\d{10,13}$/.test(nomorHP)) {
      alert("Nomor HP harus terdiri dari 10-13 digit angka.");
      return;
    }
  
    if (metode === 'Dana') {
      const konfirmasi = confirm("Anda akan diarahkan ke aplikasi Dana. Lanjutkan?");
      if (konfirmasi) {
        window.location.href = "https://link.dana.id/085694556026";
      }
    } else {
      alert("Pembayaran dengan " + metode + " sedang diproses.");
    }
    tutupModal();
  }
  
  // Fungsi untuk mengubah gambar produk berdasarkan warna
  function ubahGambarProduk(idGambar, warna, produk) {
    const gambar = document.getElementById(idGambar);
    const basePath = "image/";
  
    const gambarMap = {
      "Produk1": {
        "Merah": "kaosmerah.jpg",
        "Biru": "kaosbiru.jpg",
        "Hitam": "kaoshitam.jpg"
      },
      "Produk2": {
        "Abu-abu": "kaosabu.jpg",
        "Putih": "kaosputih.jpg",
        "Hitam": "kaoshitam.jpg"
      },
      "Produk3": {
        "Abu-abu": "abu.jpg",
        "Cream": "Cream.jpg",
        "Hitam": "HITAM.jpg"
      },
      "Produk4": {
        "Mesin 1": "mesin1.png",
        "Mesin 2": "mesin2.png",
        "Mesin 3": "mesin3.png"
      }
    };
  
    gambar.onerror = function () {
      gambar.src = basePath + "default.jpg"; // Gambar default jika gambar tidak ditemukan
    };
  
    if (gambarMap[produk] && gambarMap[produk][warna]) {
      gambar.src = basePath + gambarMap[produk][warna];
    } else {
      console.error("Gambar tidak ditemukan untuk produk dan warna yang dipilih.");
    }
  }
  
  // Fungsi untuk mencari produk
  function cariProduk() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const produkItems = document.querySelectorAll(".produk-item");
  
    produkItems.forEach((item) => {
      const namaProduk = item.querySelector("h3").textContent.toLowerCase();
      const deskripsiProduk = item.querySelector("p").textContent.toLowerCase();
      if (namaProduk.includes(input) || deskripsiProduk.includes(input)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  
  // Fungsi untuk membuka detail produk
  function bukaDetailProduk(produkId) {
    const modal = document.getElementById("detail-produk-modal");
    const produk = document.getElementById(produkId);
  
    // Isi detail produk ke dalam modal
    const namaProduk = produk.querySelector("h3").textContent;
    const gambarProduk = produk.querySelector("img").src;
    const deskripsiProduk = produk.querySelector("p").textContent;
  
    document.getElementById("detail-produk-nama").textContent = namaProduk;
    document.getElementById("detail-produk-gambar").src = gambarProduk;
    document.getElementById("detail-produk-deskripsi").textContent = deskripsiProduk;
  
    // Tampilkan modal
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
  
    // Muat komentar untuk produk ini
    const komentarListElement = document.getElementById("komentar-list");
    muatKomentar(produkId, komentarListElement);
  
    // Set atribut data-produk-id untuk modal
    modal.setAttribute("data-produk-id", produkId);
  }
  
  // Fungsi untuk menutup detail produk
  function tutupDetailProduk() {
    const modal = document.getElementById("detail-produk-modal");
    modal.classList.remove("active");
    setTimeout(() => modal.style.display = "none", 300);
  }
  
  // Tutup modal saat mengklik di luar modal detail produk
  document.getElementById("detail-produk-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      tutupDetailProduk();
    }
  });
  // Tutup modal saat mengklik di luar modal form registrasi
  document.getElementById("checkout-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      tutupCheckout();
    }
  });
  // Tutup modal saat mengklik di luar modal keranjang
  document.getElementById("cart-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      tutupKeranjang();
    }
  });
  // Tutup modal saat mengklik di luar modal wilshit
  document.getElementById("wishlist-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      tutupWishlist();
    }
  });
  
  // Fungsi untuk menyimpan komentar ke localStorage
  function simpanKomentar(produkId, komentar) {
    let komentarList = JSON.parse(localStorage.getItem(produkId)) || [];
    komentarList.push(komentar);
    localStorage.setItem(produkId, JSON.stringify(komentarList));
  }
  
  // Fungsi untuk memuat komentar dari localStorage
  function muatKomentar(produkId, komentarListElement) {
    const komentarList = JSON.parse(localStorage.getItem(produkId)) || [];
    komentarListElement.innerHTML = ""; // Kosongkan daftar komentar
    komentarList.forEach((komentar, index) => {
      const komentarItem = document.createElement("div");
      komentarItem.classList.add("komentar-item");
  
      // Tambahkan rating
      const ratingElement = document.createElement("div");
      ratingElement.classList.add("rating");
      ratingElement.innerHTML = "&#9733;".repeat(komentar.rating);
      komentarItem.appendChild(ratingElement);
  
      // Tambahkan komentar
      const komentarElement = document.createElement("p");
      komentarElement.textContent = komentar.text;
      komentarItem.appendChild(komentarElement);
  
      // Tambahkan tombol hapus (hanya untuk komentar pengguna yang sama)
      if (komentar.penggunaId === "pengguna-1") { // Ganti dengan ID pengguna yang sesuai
        const hapusButton = document.createElement("button");
        hapusButton.classList.add("hapus-komentar");
        hapusButton.textContent = "×";
        hapusButton.addEventListener("click", () => {
          hapusKomentar(produkId, index);
          komentarItem.remove();
        });
        komentarItem.appendChild(hapusButton);
      }
  
      komentarListElement.appendChild(komentarItem);
    });
  }
  
  // Fungsi untuk menghitung rating rata-rata
  function hitungRatingRataRata(produkId) {
    const komentarList = JSON.parse(localStorage.getItem(produkId)) || [];
    if (komentarList.length === 0) return 0;

    const totalRating = komentarList.reduce((sum, komentar) => sum + (komentar.rating || 0), 0); // Tambahkan rating dengan benar
    const rataRata = totalRating / komentarList.length;
    return rataRata.toFixed(1);
}
  
  // Fungsi untuk memperbarui rating rata-rata di halaman
  function perbaruiRatingRataRata(produkId) {
    const ratingRataRataElement = document.getElementById(`rating-rata-rata-${produkId}`);
    if (ratingRataRataElement) {
      const rataRata = hitungRatingRataRata(produkId);
      ratingRataRataElement.textContent = rataRata;
    }
  }
  
  // Fungsi untuk menghapus komentar dari localStorage
  function hapusKomentar(produkId, index) {
    let komentarList = JSON.parse(localStorage.getItem(produkId)) || [];
    komentarList.splice(index, 1);
    localStorage.setItem(produkId, JSON.stringify(komentarList));
  
    // Perbarui rating rata-rata setelah menghapus komentar
    perbaruiRatingRataRata(produkId);
  }
  
  // Fungsi untuk mengirim komentar di detail produk
  function submitKomentar() {
    const produkId = document.getElementById("detail-produk-modal").getAttribute("data-produk-id");
    const selectedStars = document.querySelectorAll("#detail-produk-modal .rating-stars .star.active").length;
    const komentar = document.getElementById("komentar-input").value.trim();

    if (selectedStars === 0) {
        alert("Harap berikan rating terlebih dahulu.");
        return;
    }

    if (komentar === "") {
        alert("Harap tulis ulasan Anda.");
        return;
    }

    // Simpan komentar ke localStorage
    const komentarData = {
        rating: selectedStars,  // Pastikan rating tersimpan dengan benar
        text: komentar,
        penggunaId: "pengguna-1"
    };

    let komentarList = JSON.parse(localStorage.getItem(produkId)) || [];
    komentarList.push(komentarData);
    localStorage.setItem(produkId, JSON.stringify(komentarList));

    // Muat ulang daftar komentar
    const komentarListElement = document.getElementById("komentar-list");
    muatKomentar(produkId, komentarListElement);

    // Perbarui rating rata-rata
    perbaruiRatingRataRata(produkId);

    // Reset form
    document.querySelectorAll("#detail-produk-modal .rating-stars .star").forEach((star) => star.classList.remove("active"));
    document.getElementById("komentar-input").value = "";

    alert("Terima kasih atas ulasan Anda!");
}

  // Fungsi untuk menangani rating bintang
  document.querySelectorAll(".rating-stars .star").forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      const ratingContainer = this.closest(".rating-stars");
      ratingContainer.querySelectorAll(".star").forEach((s, index) => {
        if (index < value) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });
  
  // Muat rating rata-rata saat halaman dimuat
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".produk-item").forEach((produk) => {
      const produkId = produk.id;
      perbaruiRatingRataRata(produkId); // Perbarui rating rata-rata untuk setiap produk
    });
  });
  
  // Variabel global untuk slider
  let gambarProdukList = []; // Daftar gambar produk
  let indeksGambarSaatIni = 0; // Indeks gambar yang sedang ditampilkan
  
  // Fungsi untuk membuka detail produk
  function bukaDetailProduk(produkId) {
    const modal = document.getElementById("detail-produk-modal");
    const produk = document.getElementById(produkId);
  
    // Isi detail produk ke dalam modal
    const namaProduk = produk.querySelector("h3").textContent;
    const deskripsiProduk = produk.querySelector("p").textContent;
  
    document.getElementById("detail-produk-nama").textContent = namaProduk;
    document.getElementById("detail-produk-deskripsi").textContent = deskripsiProduk;
  
    // Muat gambar produk
    const warna = produk.querySelector("select").value;
    gambarProdukList = ambilDaftarGambar(produkId, warna); // Ambil daftar gambar berdasarkan produk dan warna
    indeksGambarSaatIni = 0; // Reset indeks gambar
    tampilkanGambar(indeksGambarSaatIni); // Tampilkan gambar pertama
  
    // Tampilkan modal
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
  
    // Muat komentar untuk produk ini
    const komentarListElement = document.getElementById("komentar-list");
    muatKomentar(produkId, komentarListElement);
  
    // Set atribut data-produk-id untuk modal
    modal.setAttribute("data-produk-id", produkId);
  }
  
  // Fungsi untuk mengambil daftar gambar berdasarkan produk dan warna
  function ambilDaftarGambar(produkId, warna) {
    const gambarMap = {
      "produk1": {
        "Merah": ["image/kaosmerah.jpg", "image/kaosbiru.jpg", "image/kaoshitam.jpg"],
        "Biru": ["image/kaosbiru.jpg", "image/kaoshitam.jpg", "image/kaosmerah.jpg"],
        "Hitam": ["image/kaoshitam.jpg", "image/kaosmerah.jpg", "image/kaosbiru.jpg"]
      },
      "produk2": {
        "Abu-abu": ["image/kaosabu.jpg", "image/kaosputih.jpg", "image/kaoshitam.jpg"],
        "Putih": ["image/kaosputih.jpg", "image/kaoshitam.jpg", "image/kaosabu.jpg"],
        "Hitam": ["image/kaoshitam.jpg", "image/kaosabu.jpg", "image/kaosputih.jpg"]
      },
      "produk3": {
        "Abu-abu": ["image/abu.jpg", "image/Cream.jpg", "image/HITAM.jpg"],
        "Cream": ["image/Cream.jpg", "image/HITAM.jpg", "image/abu.jpg"],
        "Hitam": ["image/HITAM.jpg", "image/abu.jpg", "image/Cream.jpg"]
      },
      "produk4": {
        "Mesin 1": ["image/mesin1.png", "image/mesin2.png", "image/mesin3.png"],
        "Mesin 2": ["image/mesin2.png", "image/mesin3.png", "image/mesin1.png"],
        "Mesin 3": ["image/mesin3.png", "image/mesin1.png", "image/mesin2.png"]
      }
      // Tambahkan produk lain di sini
    };
  
    return gambarMap[produkId][warna] || []; // Kembalikan daftar gambar atau array kosong jika tidak ada
  }
  
  // Fungsi untuk menampilkan gambar berdasarkan indeks
  function tampilkanGambar(indeks) {
    const sliderGambar = document.getElementById("slider-gambar");
    if (gambarProdukList[indeks]) {
      sliderGambar.src = gambarProdukList[indeks];
    }
  }
  
  // Fungsi untuk menggeser gambar
  function geserGambar(arah) {
    indeksGambarSaatIni += arah;
  
    // Handle batas indeks
    if (indeksGambarSaatIni < 0) {
      indeksGambarSaatIni = gambarProdukList.length - 1;
    } else if (indeksGambarSaatIni >= gambarProdukList.length) {
      indeksGambarSaatIni = 0;
    }
  
    tampilkanGambar(indeksGambarSaatIni); // Tampilkan gambar yang baru
  }
  
  // Fungsi untuk menambahkan produk ke keranjang
  let keranjang = [];

// Fungsi untuk menambah produk ke keranjang
function tambahKeKeranjang(namaProduk, idProduk, warnaId, ukuranId) {
  const warna = document.getElementById(warnaId).value;
  const ukuran = document.getElementById(ukuranId).value;
  const harga = parseInt(ukuran.split(" - ")[1].replace("Rp", "").replace(".", ""));

  const produk = {
    id: idProduk,
    nama: namaProduk,
    warna: warna,
    ukuran: ukuran,
    harga: harga,
    dipilih: false // Status checkbox, awalnya false
  };

  keranjang.push(produk);
  updateKeranjang();
  bukaKeranjang();
}

// Fungsi untuk mengupdate tampilan keranjang
function updateKeranjang() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  cartItems.innerHTML = "";

  keranjang.forEach((produk, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
  <button onclick="hapusDariKeranjang(${index})">🗑️</button>
  <input type="checkbox" id="produk-${index}" onchange="updateTotal(${index})" ${produk.dipilih ? "checked" : ""}>
  <label for="produk-${index}">${produk.nama} - ${produk.warna} - ${produk.ukuran}</label>
`;

    cartItems.appendChild(item);

    if (produk.dipilih) {
      total += produk.harga;
    }
  });

  cartTotal.textContent = `Rp${total.toLocaleString()}`;
  document.getElementById("cart-count").textContent = keranjang.length;
  simpanKeranjang();
}

// Fungsi untuk mengupdate total harga
function updateTotal(index) {
  keranjang[index].dipilih = !keranjang[index].dipilih;
  updateKeranjang();
}

// Fungsi untuk menghapus produk dari keranjang
function hapusDariKeranjang(index) {
  keranjang.splice(index, 1);
  updateKeranjang();
}

// Fungsi untuk membuka modal keranjang
function bukaKeranjang() {
  document.getElementById("cart-modal").style.display = "flex";
}

// Fungsi untuk menutup modal keranjang
function tutupKeranjang() {
  document.getElementById("cart-modal").style.display = "none";
}

// Fungsi untuk menampilkan form checkout
function tampilkanFormCheckout() {
  const produkDipilih = keranjang.some(produk => produk.dipilih);

  if (!produkDipilih) {
    tampilkanNotifikasi("Pilih produk terlebih dahulu!");
    return;
  }

  document.getElementById("checkout-modal").style.display = "flex";
}

// Fungsi untuk menutup modal checkout
function tutupCheckout() {
  document.getElementById("checkout-modal").style.display = "none";
}

// Fungsi untuk memproses pembayaran
function prosesPembayaran() {
  const nama = document.getElementById("nama").value;
  const kota = document.getElementById("kota").value;
  const provinsi = document.getElementById("provinsi").value;
  const alamat = document.getElementById("alamat").value;
  const nomorhp = document.getElementById("nomorhp").value;

  if (!nama || !kota || !provinsi || !alamat || !nomorhp) {
    tampilkanNotifikasi("Harap isi semua field!");
    return;
  }

  // Hapus produk yang sudah dipilih dari keranjang
  keranjang = keranjang.filter(produk => !produk.dipilih);
  updateKeranjang();

  // Tutup modal checkout
  tutupCheckout();

  // Tampilkan notifikasi sukses
  tampilkanNotifikasi("Pembayaran berhasil! Produk akan segera dikirim.");
}

// Fungsi untuk menampilkan notifikasi
function tampilkanNotifikasi(pesan) {
  const notifikasi = document.createElement("div");
  notifikasi.className = "notifikasi-item";
  notifikasi.textContent = pesan;

  document.getElementById("notifikasi").appendChild(notifikasi);

  setTimeout(() => {
    notifikasi.remove();
  }, 3000);
}

// Fungsi untuk menyimpan keranjang ke localStorage
function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// Fungsi untuk memuat keranjang dari localStorage
function muatKeranjang() {
  const data = localStorage.getItem("keranjang");
  if (data) {
    keranjang = JSON.parse(data);
    updateKeranjang();
  }
}

// Memuat keranjang saat halaman dimuat
window.onload = muatKeranjang;

function ubahGambarProduk(idGambar, warna, produk) {
  const gambar = document.getElementById(idGambar);
  const basePath = "image/";

  const gambarMap = {
    "Produk1": {
      "Merah": "kaosmerah.jpg",
      "Biru": "kaosbiru.jpg",
      "Hitam": "kaoshitam.jpg"
    },
    "Produk2": {
      "Abu-abu": "kaosabu.jpg",
      "Putih": "kaosputih.jpg",
      "Hitam": "kaoshitam.jpg"
    },
    "Produk3": {
      "Abu-abu": "abu.jpg",
      "Cream": "Cream.jpg",
      "Hitam": "HITAM.jpg"
    },
    "Produk4": {
      "Mesin 1": "mesin1.png",
      "Mesin 2": "mesin2.png",
      "Mesin 3": "mesin3.png"
    }
  };

  gambar.onerror = function () {
    gambar.src = basePath + "default.jpg"; // Gambar default jika gambar tidak ditemukan
  };

  if (gambarMap[produk] && gambarMap[produk][warna]) {
    gambar.src = basePath + gambarMap[produk][warna];
  } else {
    console.error("Gambar tidak ditemukan untuk produk dan warna yang dipilih.");
  }
}

function perbaruiKeranjang() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
      <p>${item.nama} (${item.warna}) - Rp${item.harga}</p>
      <button onclick="hapusDariKeranjang(${index})">Hapus</button>
    `;
    cartItems.appendChild(itemElement);
    total += item.harga;
  });

  cartCount.textContent = keranjang.length;
  cartTotal.textContent = `Rp${total}`;
}

function hapusDariKeranjang(index) {
  keranjang.splice(index, 1);
  perbaruiKeranjang();
}

function bukaKeranjang() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
}

function tutupKeranjang() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("active");
  setTimeout(() => modal.style.display = "none", 300);
}
  
  function checkout() {
    if (keranjang.length === 0) {
      alert("Keranjang belanja kosong!");
      return;
    }
    alert("Checkout berhasil! Total pembayaran: Rp" + keranjang.reduce((sum, item) => sum + item.harga, 0));
    keranjang = [];
    perbaruiKeranjang();
    tutupKeranjang();
  }
  
  // Fungsi untuk menambahkan produk ke wishlist
  let wishlist = [];
  
  function tambahKeWishlist(namaProduk) {
    wishlist.push(namaProduk);
    perbaruiWishlist();
    tampilkanNotifikasi(`${namaProduk} telah ditambahkan ke wishlist!`);
  }
  
  function perbaruiWishlist() {
    const wishlistItems = document.getElementById("wishlist-items");
    const wishlistCount = document.getElementById("wishlist-count");
  
    wishlistItems.innerHTML = "";
    wishlist.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.innerHTML = `
        <p>${item}</p>
        <button onclick="hapusDariWishlist(${index})">Hapus</button>
      `;
      wishlistItems.appendChild(itemElement);
    });
  
    wishlistCount.textContent = wishlist.length;
  }
  
  function hapusDariWishlist(index) {
    wishlist.splice(index, 1);
    perbaruiWishlist();
  }
  
  function bukaWishlist() {
    const modal = document.getElementById("wishlist-modal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
  }
  
  function tutupWishlist() {
    const modal = document.getElementById("wishlist-modal");
    modal.classList.remove("active");
    setTimeout(() => modal.style.display = "none", 300);
  }
  
  // Fungsi untuk menampilkan notifikasi
  function tampilkanNotifikasi(pesan) {
    const notifikasi = document.createElement("div");
    notifikasi.classList.add("notifikasi-item");
    notifikasi.textContent = pesan;
    document.getElementById("notifikasi").appendChild(notifikasi);
  
    setTimeout(() => {
      notifikasi.remove();
    }, 3000);
  }
  // Fungsi untuk menampilkan form checkout
function tampilkanFormCheckout() {
    tutupKeranjang(); // Tutup modal keranjang
    const checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.style.display = "flex";
    setTimeout(() => checkoutModal.classList.add("active"), 10);
  }
  
  // Fungsi untuk menutup form checkout
  function tutupCheckout() {
    const checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.classList.remove("active");
    setTimeout(() => checkoutModal.style.display = "none", 300);
  }
  
  // Fungsi untuk memproses pembayaran
  function prosesPembayaran(metode) {
    const inputs = document.querySelectorAll("#checkout-modal input[type='text']");
    const nomorHP = document.getElementById("nomorhp").value.trim();
  
    // Validasi form
    for (let input of inputs) {
      if (input.value.trim() === "") {
        alert("Harap isi semua kolom sebelum melanjutkan pembayaran.");
        return;
      }
    }
  
    // Validasi nomor HP
    if (!/^\d{10,13}$/.test(nomorHP)) {
      alert("Nomor HP harus terdiri dari 10-13 digit angka.");
      return;
    }
  
    // Proses pembayaran
    if (metode === 'Dana') {
      const konfirmasi = confirm("Anda akan diarahkan ke aplikasi Dana. Lanjutkan?");
      if (konfirmasi) {
        window.location.href = "https://link.dana.id/085694556026";
      }
    } else {
      alert("Pembayaran dengan " + metode + " sedang diproses.");
    }
  
    // Reset keranjang setelah pembayaran
    keranjang = [];
    perbaruiKeranjang();
    tutupCheckout();
  }
  // Fungsi untuk toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    // Simpan preferensi dark mode di localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  }
  
  // Cek preferensi dark mode saat halaman dimuat
  function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }
  
  // Panggil fungsi loadDarkMode saat halaman dimuat
  document.addEventListener("DOMContentLoaded", loadDarkMode);
  function filterDanSortProduk() {
    const kategori = document.getElementById("filter-kategori").value;
    const sortBy = document.getElementById("sort-by").value;
    const produkItems = document.querySelectorAll(".produk-item");
  
    produkItems.forEach((item) => {
      const produkKategori = item.getAttribute("data-kategori");
      if (kategori === "semua" || produkKategori === kategori) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  
    // Sorting produk
    const produkArray = Array.from(produkItems);
    produkArray.sort((a, b) => {
      const hargaA = parseInt(a.querySelector("select").value.split(" - ")[1].replace("Rp", ""));
      const hargaB = parseInt(b.querySelector("select").value.split(" - ")[1].replace("Rp", ""));
      const ratingA = parseFloat(a.querySelector(".rating-rata-rata span").textContent);
      const ratingB = parseFloat(b.querySelector(".rating-rata-rata span").textContent);
  
      if (sortBy === "harga-asc") return hargaA - hargaB;
      if (sortBy === "harga-desc") return hargaB - hargaA;
      if (sortBy === "rating") return ratingB - ratingA;
      return 0;
    });
  
    const produkContainer = document.querySelector(".produk-container");
    produkContainer.innerHTML = "";
    produkArray.forEach((item) => produkContainer.appendChild(item));
  }
  
  document.getElementById("filter-kategori").addEventListener("change", filterDanSortProduk);
  document.getElementById("sort-by").addEventListener("change", filterDanSortProduk);
  let riwayatTransaksi = [];

function tambahKeRiwayat(produk, total) {
  riwayatTransaksi.push({ produk, total, tanggal: new Date().toLocaleString() });
  localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayatTransaksi));
}

function muatRiwayat() {
  const riwayatList = document.getElementById("riwayat-list");
  riwayatList.innerHTML = "";

  riwayatTransaksi.forEach((transaksi) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <p><strong>${transaksi.tanggal}</strong></p>
      <p>${transaksi.produk} - Total: Rp${transaksi.total}</p>
    `;
    riwayatList.appendChild(item);
  });
}

function bukaRiwayat() {
  const modal = document.getElementById("riwayat-modal");
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
  muatRiwayat();
}

function tutupRiwayat() {
  const modal = document.getElementById("riwayat-modal");
  modal.classList.remove("active");
  setTimeout(() => modal.style.display = "none", 300);
}