const mongoose = require('mongoose');

// DB Schema
//  DB에서 사용할 Schema를 설정
const contactSchema = mongoose.Schema({
    name : {type:String, required:true, unique:true},
    email : {type:String},
    phone : {type:String}
});
// contact schema의 model을 생성
//  - 첫번째 param : mongoDB에서 사용되는 collection의 이름
//  - 두번째 param : mongoose.Schema로 생성된 object
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;