const express = require('express');
const router = express.Router();


const getall = require('./Models/NhaTro');

router.get('/getnhatro', getall.getAllpost);
router.post('/InsetNhaTro',getall.InsetNhaTro);
router.post('/LayDanhSachBL',getall.LayDanhSachBL);

module.exports = router;