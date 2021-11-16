const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    content_id: String,
    user_id: String
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('likes', LikeSchema);