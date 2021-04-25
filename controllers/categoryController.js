const mongoose = require('mongoose');
const categoryModel = require('../models/categoryModel');
const categoryCtr = {};

categoryCtr.addCategory = async (req, res) => {
    try {
        const {category_name, user_id} = req.body;
        const newCategory = new categoryModel({ category_name: category_name, user_id: user_id });
        let category_ = await newCategory.save();
        res.status(200).json({success: true, message: "Category added successfully", new_category: category_});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

categoryCtr.getAllCategory = async (req, res) => {
    try {
        const {user_id} = req.query;
        let categories = await categoryModel.find({user_id: user_id}).sort({_id: -1});
        res.status(200).json({success: true, message: "Category All get successfully", categories: categories});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = categoryCtr;