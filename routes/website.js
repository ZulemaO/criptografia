const express = require('express');
const router = express.Router();



router.get('/', function (req, res) {
    res.status(200).render('index')
})
router.get('/login', function (req, res) {
    res.status(200).render('login')
})
router.get('/crearCuenta', function (req, res) {
    res.status(200).render('crearCuenta')
})






module.exports = router