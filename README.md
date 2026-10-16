# Bank Mini SMK YP.79 Majalaya — struktur peran (lihat Rancangan_Struktur_Web_Administrasi)

- **`index.html`** — NASABAH: cek saldo (NIS + PIN), cetak buku tabungan.
- **`cs.html`** — CUSTOMER SERVICE (cs/cs12345): pendaftaran nasabah (NIS, nama, jurusan, alamat, HP, PIN + tanggal-jam otomatis).
- **`teller.html`** — TELLER (teller/teller12345): setor/tarik per NIS + scan, preview nota struk → kunci & simpan → cetak struk.
- **`backoffice.html`** — BACK OFFICE (admin/83mJENda): all access (edit/hapus nasabah & transaksi), laporan harian/mingguan/bulanan + cetak, pengaturan nota, kelola akun peran.
- PIN tersimpan sebagai hash SHA-256. Segera ganti semua password default di Back Office.
