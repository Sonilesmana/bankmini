# Bank Mini SMK YP.79 Majalaya — v2

2 halaman:
- **`index.html`** — khusus NASABAH: cek saldo (NIS + PIN), preview & cetak buku tabungan.
- **`petugas.html`** — khusus PETUGAS (1 operator, login `admin`): input transaksi, reset PIN, import CSV 120 akun, ubah login, rekap harian + cetak, export CSV.

- PIN awal = 4 digit terakhir NIS (120 akun bawaan dibuat otomatis saat database kosong).
- Database: lokal (offline) → isi `SHEETS_API` (Google Apps Script, lihat `Code.gs`) atau `firebaseConfig` untuk online.
- Deploy: Vercel static — `vercel.json` sudah siap.
