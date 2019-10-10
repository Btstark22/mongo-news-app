const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        unique: true
    },
    link: {
        type: String,
        trim: true,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    }
}) 

const News = mongoose.model("News", NewsSchema);
module.exports = News;