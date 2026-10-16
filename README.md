# Bank Mini SMK YP.79 Majalaya — v2

Aplikasi Bank Mini sekolah: 1 file HTML (`index.html`).

- **Nasabah:** cek saldo sendiri pakai NIS + PIN, preview & cetak buku tabungan.
- **Petugas:** login username + password (1 operator), input transaksi, rekap harian + cetak, export CSV.
- Login default: `admin` / `bankmini123` (segera ganti di tab Petugas).
- Database: lokal (offline) → isi `SHEETS_API` (Google Apps Script, lihat `Code.gs`) atau `firebaseConfig` di `index.html` untuk online.
- Deploy: Vercel (static, root = `index.html`) — lihat `vercel.json`.
