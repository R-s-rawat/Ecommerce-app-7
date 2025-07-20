import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productSearchController,
  productSortController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

// router object
const router = express.Router();

//routes -----------------------

//create product - for admin
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product - for admin
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product - only for (admin- advanced users) [not users- normal users]
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// filter product
router.post("/product-filters", productFiltersController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// sort product
router.post("/product-sort", productSortController);

// search product
router.get("/product-search/:keyword", productSearchController);

// router.get('/product-search', (req, res) => {
//   const keyword = req.query.keyword;
//   res.send({ keyword });
// });

// // http://localhost:8080/api/v1/product/debug-test
// router.get('/debug-test', (req, res) => {
//   console.log("✅ /debug-test route hit"); // for backend
//   res.send("✅ /debug-test route hit"); // for frontend
// });

export default router;
