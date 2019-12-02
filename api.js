const express = require('express');
const router = express.Router();


const getall = require('./Models/NhaTro');

router.get('/getnhatro', getall.getAllpost);
router.post('/InsetNhaTro',getall.InsetNhaTro);
router.post('/LayDanhSachBL',getall.LayDanhSachBL);
router.post('/getnhatroid',getall.getAllpostID);
router.post('/laythongtinnguoidung',getall.LayThongTinNguoiDung);
router.post('/ThemBinhLuan',getall.ThemBinhLuan);

module.exports = router;