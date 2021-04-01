
import express from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

const router = express.Router()

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @desc Fetch single products
// @route GET /api/products/id
// @access Public
router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error("Product not found")
    }
}))

export default router

// app.get("/api/products", (req, res) => {
//     //res.send("API is running")
//     res.json(products)
// })

// app.get("/api/products/:id", (req, res) => {
//     //res.send("API is running");
//     let _id = req.params.id
//     const product = products.find(p => p._id === _id)
//     res.json(product)
// })