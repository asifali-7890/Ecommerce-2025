import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getSingleCategoryController,
    updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

// POST http://localhost:5000/api/v1/category/create-category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

// PUT http://localhost:5000/api/v1/category/update-category/:id
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

// GET http://localhost:5000/api/v1/category/get-categories
router.get(
    "/get-categories",
    getAllCategoryController
);

// GET http://localhost:5000/api/v1/category/single-category/:slug
router.get(
    "/single-category/:slug",
    getSingleCategoryController
);

// DELETE http://localhost:5000/api/v1/category/delete-category/:id
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);


export default router;