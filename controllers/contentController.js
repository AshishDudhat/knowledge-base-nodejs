const mongoose = require('mongoose');
const contentModel = require('../models/contentModel');
const contentCtr = {};

// Add content
contentCtr.addContent = async (req, res) => {
    try {
        let obj = {
            category_id: req.body.category,
            user_id: req.body.user_id
        }
        if(req.body.content) {
            obj['content'] = req.body.content;
        }
        if(req.file) {
            obj['file'] = req.file.location.substring(req.file.location.lastIndexOf('/') + 1)
        }
        const newContent = new contentModel({ ...obj });
        let content_ = await newContent.save();
        res.status(200).json({success: true, message: "success", content: content_});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

// get content
contentCtr.getContent = async (req, res) => {
    try {
        let contents;
        if(req.query && req.query.category_id) {
            contents = await contentModel.find({category_id: req.query.category_id, user_id: req.query.user_id}).sort({_id: -1});
        } else {
            contents = await contentModel.find({user_id: req.query.user_id}).sort({_id: -1});
        }
        res.status(200).json({success: true, message: "Contents All get successfully", contents: contents});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

// Get content with filter
contentCtr.getFilteredContent = async (req, res) => {
    try {
        let contents;
        if(req.query && req.query.category_id && req.query.text) {
            contents = await contentModel.find({
                $and: [
                    { category_id:  req.query.category_id },
                    { user_id : req.query.user_id },
                    { $or: [ { content: {'$regex' : '.*' + req.query.text + '.*','$options' : 'i'} }, { file : {'$regex' : '.*' + req.query.text + '.*','$options' : 'i'} } ] }
                ]}).sort({_id: -1});
        } else {
            contents = await contentModel.find({
                $and: [
                    { user_id : req.query.user_id },
                    { $or: [ { content: {'$regex' : '.*' + req.query.text + '.*','$options' : 'i'} }, { file : {'$regex' : '.*' + req.query.text + '.*','$options' : 'i'} } ] }
                ]}).sort({_id: -1});
        }
        res.status(200).json({success: true, message: "Contents All get successfully", contents: contents});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = contentCtr;