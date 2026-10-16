// BACKEND ALTERNATIF: Google Sheets + Apps Script (tanpa Firebase)
// Cara pakai (5 menit, gratis, cocok untuk sekolah):
// 1. sheets.new → buat spreadsheet "BankMini" dengan 2 sheet: students | transactions
//    - students header: nis | nama | pinHash
//    - transactions header: id | nis | nama | jenis | nominal | tanggal | keterangan | createdAt
// 2. Extensions → Apps Script → hapus isi → paste file ini → Deploy → New deployment → Web app
//    - Execute as: Me, Who has access: Anyone → Copy URL /exec
// 3. Buka index.html → ganti konstanta SHEETS_API dengan URL tersebut.
//    Aplikasi otomatis pakai Sheets sebagai database online (nasabah bisa cek dari HP).
// Catatan: pinHash = SHA-256 dari PIN (aplikasi sudah menghitungnya otomatis).

const SHEET_STUDENTS = "students";
const SHEET_TX = "transactions";

function doGet(e) {
  const a = (e.parameter.action || "");
  if (a === "students") return json(list_(SHEET_STUDENTS));
  if (a === "transactions") return json(list_(SHEET_TX));
  return json({ ok: true, msg: "BankMini API aktif" });
}

function doPost(e) {
  const b = JSON.parse(e.postData.contents);
  if (b.action === "upsertStudent") {
    const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_STUDENTS);
    const rows = sh.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(b.nis)) {
        sh.getRange(i + 1, 2).setValue(b.nama);
        sh.getRange(i + 1, 3).setValue(b.pinHash);
        return json({ ok: true, updated: true });
      }
    }
    sh.appendRow([b.nis, b.nama, b.pinHash]);
    return json({ ok: true, updated: false });
  }
  if (b.action === "addTx") {
    SpreadsheetApp.getActive().getSheetByName(SHEET_TX).appendRow(
      [b.id, b.nis, b.nama, b.jenis, b.nominal, b.tanggal, b.keterangan, new Date().toISOString()]);
    return json({ ok: true });
  }
  if (b.action === "delTx") {
    const sh = SpreadsheetApp.getActive().getSheetByName(SHEET_TX);
    const rows = sh.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(b.id)) { sh.deleteRow(i + 1); break; }
    }
    return json({ ok: true });
  }
  return json({ ok: false });
}

function list_(name) {
  const v = SpreadsheetApp.getActive().getSheetByName(name).getDataRange().getValues();
  const h = v[0].map(String);
  return v.slice(1).map(r => Object.fromEntries(h.map((k, i) => [k, r[i]])));
}
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
