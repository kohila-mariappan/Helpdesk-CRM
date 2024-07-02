const express = require('express')
const router = express.Router()
const ProductController = require('../../controllers/LeadController/product')


router.get('/list',ProductController.ProductList)


module.exports = router