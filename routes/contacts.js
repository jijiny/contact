const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Contact = require('../models/Contact');

// Contacts - Index
router.get('/', function(req, res) {
    Contact.find({}, function(err, contacts) {  // (검색)모델.find({검색조건}, callback_function)
        if(err) return res.json(err);   // 에러가 있다면 json형태로 웹브라우저에 표시
        res.render('contacts/index', {contacts:contacts});  // 에러가 없다면 검색 결과를 받아 index.ejs를 render (검색 결과는 Array [])
    });
});

// Contacts - New
router.get('/new', function(req, res) {
    res.render('contacts/new');
});

// Contacts - create
router.post('/', function(req, res) {
    Contact.create(req.body, function(err, contact) {   // (DB 생성) 모델.create(생성할 data의 object, callback_function)
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

// Contacts - show
router.get('/:id', function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact) {   // 모델.findOne({조건}, callback_function)
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});

// Contacts - edit
router.get('/:id/edit', function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact) {
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
});

// Contacts - update
router.put('/:id', function(req, res) {
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact) {    // 모델.findOneAndUpdate({조건}, update할 정보, callback_function)
        // callback_function으로 넘어사는 값은 업데이트 전의 값
        // 업데이트 후의 값을 보려면 callback 전에 parameter로 {new:true}
        if(err) return res.json(err);
        res.redirect('/contacts/'+req.params.id);
    });
});

// Contacts - destroy
router.delete('/:id', function(req, res) {
    Contact.deleteOne({_id:req.params.id}, function(err) {  // 모델.deleteOne({조건}, callback_function)
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

module.exports = router;