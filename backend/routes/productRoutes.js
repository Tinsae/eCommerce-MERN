
import express from "express"
const router = express.Router()

import { getProducts, getProductById } from "../controllers/productController.js"

// same as router.get("/", getProducts)
router.route("/").get(getProducts)
router.route("/:id").get(getProductById)


export default router