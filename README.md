# Atomize Planner Frontend

Ini adalah repositori untuk frontend aplikasi Atomize Planner. Dibangun dengan React dan Vite, aplikasi ini dirancang untuk membantu pengguna mengelola tugas, meningkatkan fokus, dan melacak produktivitas mereka.

## Fitur

-   Manajemen Tugas dan Sasaran (Goals)
-   Mode Fokus Mendalam (Deep Focus Mode) dengan timer
-   Pelacakan Riwayat dan Statistik Produktivitas
-   Manajemen Profil Pengguna
-   Antarmuka yang bersih dan modern

## Teknologi yang Digunakan

-   **Framework**: React.js
-   **Build Tool**: Vite
-   **Package Manager**: npm
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **Linting**: ESLint

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:

-   [Node.js](https://nodejs.org/) (v18 atau lebih baru direkomendasikan)
-   [npm](https://npmjs.com/)

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/username/atomize-planner-frontend.git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd atomize-planner-frontend
    ```

3.  **Instal semua dependensi menggunakan pnpm:**
    ```bash
    npm install
    ```

## Menjalankan Aplikasi

### **Mode Pengembangan**

Untuk menjalankan aplikasi dalam mode pengembangan dengan hot-reloading:

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan).

### **Mode Produksi**

1.  **Build aplikasi untuk produksi:**
    ```bash
    npm run build
    ```
    Perintah ini akan membuat direktori `dist` yang berisi file-file statis yang siap untuk di-deploy.

2.  **Pratinjau hasil build secara lokal:**
    ```bash
    npm run preview
    ```
    Perintah ini akan menjalankan server lokal untuk menayangkan file dari direktori `dist`.

## Skrip yang Tersedia

Dalam file `package.json`, Anda akan menemukan beberapa skrip:

-   `npm run dev`: Menjalankan server pengembangan Vite.
-   `npm run build`: Mem-build aplikasi untuk lingkungan produksi.
-   `npm run lint`: Menjalankan ESLint untuk menganalisis kode dan menemukan masalah.
-   `npm run preview`: Menjalankan pratinjau lokal dari build produksi.

## Struktur Folder

Berikut adalah gambaran umum struktur folder dalam proyek ini:

```
/
├── public/         # Aset statis
├── src/
│   ├── assets/       # Gambar, ikon, dan aset lainnya
│   ├── components/   # Komponen React yang dapat digunakan kembali
│   ├── constants/    # Konstanta global
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Komponen tata letak halaman
│   ├── mock/         # Data dan layanan mock untuk pengembangan
│   ├── pages/        # Komponen utama untuk setiap halaman/rute
│   ├── routes/       # Konfigurasi routing aplikasi
│   ├── services/     # Logika untuk berinteraksi dengan API
│   └── utils/        # Fungsi utilitas
├── .gitignore
├── eslint.config.js  # Konfigurasi ESLint
├── index.html        # Template HTML utama
├── package.json
├── README.md
└── vite.config.js    # Konfigurasi Vite
```

## Lisensi

Proyek ini dilisensikan di bawah ketentuan yang terdapat dalam file `LICENSE`.