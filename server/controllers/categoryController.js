import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(200).json({ success: false, message: "Category already exists" });
        }

        const category = new categoryModel({ name, slug: slugify(name) });
        await category.save();

        return res.status(201).json({ success: true, message: "Category created", category });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error in creating category" });
    }
};


// Update Category
export const updateCategoryController = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true } // returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            updatedCategory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error updating category" });
    }
};


// get all cat
export const getAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};


// single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Category SUccessfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Category",
        });
    }
};


//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};