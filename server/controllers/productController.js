import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({ error: "All fields are required" });
        }

        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: "Photo size should be less than 1MB" });
        }

        // Creating new product
        const product = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error,
        });
    }
};

// Get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            message: "All Products",
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching products",
            error: error.message,
        });
    }
};


// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};


// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};


//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({ error: "All fields are required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: "Photo should be less than 1MB" });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
};
