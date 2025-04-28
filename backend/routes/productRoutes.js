// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post("/products", upload.single("image"), productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/products/user/:userId", productController.getProductsByUser);

router.put("/products/:id", upload.single("image"), productController.updateProduct); // ✅ 수정됨
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
