const express = require('express');
const router = express.Router();


const getall = require('./Models/NhaTro');

router.get('/getnhatro', getall.getAllpost);

module.exports = router;