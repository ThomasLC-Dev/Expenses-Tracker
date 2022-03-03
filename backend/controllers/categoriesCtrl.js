import Category from '../models/category.js';

export const getAllCategories = async (req, res) => {
    if(req.query.userId){
        const categories = await Category.find({userId: req.query.userId});

        res.status(201).json({
            result: categories
        });
    }
    else{
        const categories = await Category.find();

        res.status(201).json({
            result: categories
        });
    }
}

export const createCategory = async (req, res) => {
    if((req.body.userId && req.body.userId != '') && (req.body.name && req.body.name != '')){
        const userId = req.body.userId;
        const name = req.body.name;

        const category = new Category({
            userId: userId,
            name: name
        });

        await category.save();

        res.status(201).json({
            result: "Category created !"
        });
    }
}

export const getCategory = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);

    if(!category){
        res.status(401).json({
            result: "Unknown category ID !",
        });
    }
    else{
        res.status(201).json({
            result: category
        });
    }
}

export const modifyCategory = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);

    if(!category){
        res.status(401).json({
            result: "Unknown category ID !",
        });
    }
    else{
        category.name = (req.body.name) ? req.body.name : category.name;

        await category.save();

        res.status(201).json({
            result: "Category modified !"
        });
    }
}

export const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);

    if(!category){
        res.status(401).json({
            result: "Unknown category ID !",
        });
    }
    else{
        await Category.findByIdAndDelete(req.params.categoryId);

        res.status(201).json({
            result: "Category deleted !",
        });
    }
}