const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    title: String,
    story: String,
    date_published: Date,
    user_id: String,
    reads: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
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

module.exports =  mongoose.model('content', ContentSchema);