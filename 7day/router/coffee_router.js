const express = require('express');
const router = express.Router();
const coffees = require('../model/Coffee');

router.get('/coffees', showCoffeeList); // 커피 정보에 대한 리스트
router.get('/coffees/:coffeesId', showCoffeeDetail); // 커피 정보 상세 보기
router.post('/coffees', addCoffee); // 커피 정보 추가
router.get('/coffee/add', addCoffeeForm); // 커피 정보 추가 폼
router.delete('/coffees/:coffeesId', delCoffee); // 커피 정보 삭제
router.get('/coffees/edit/:coffeesId', editCoffeeForm); // 커피 정보 수정 폼
router.put('/coffees/:coffeesId', editCoffee); // 커피 정보 수정

module.exports = router;

// 커피 정보에 대한 리스트
function showCoffeeList(req, res) {
    const coffeesList = coffees.getCoffeeList();
    res.render('CoffeesList', {name:"커피 목록",  list:coffeesList, count:coffeesList.length });
}

// 커피 정보 상세 보기
async function showCoffeeDetail(req, res) {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('상세히 볼 커피 번호는 :', coffeesId);
        const info = await coffees.getCoffeeDetail(coffeesId);
        res.render('CoffeesDetail', {name:"커피 상세 :", view:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:"커피 상세보기 Fail"});
    }
}

// 커피 정보 추가 폼
async function addCoffeeForm(req, res) {
    res.render('CoffeeAdd', {name:"커피 추가"});
}

// 커피 정보 추가
async function addCoffee(req, res) {
        const name = req.body.name;
        const volume = req.body.volume;
        const calorie = req.body.calorie;
        const caffeine = req.body.caffeine;

    if (!name || !volume || !calorie || !caffeine) {
        res.status(400).send({error:'모든 정보를 다 입력하세요.'});
        return;
    }
    try {
        const result = await coffees.addCoffee(name, volume, calorie, caffeine);
        res.render('CoffeesDetail', {name:"커피 추가 완료", view: result});
    }
    catch ( error ) {
        res.status(500).send({error:'커피 추가 Fail'});
    }
}

// 커피 정보 삭제
async function delCoffee(req, res) {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('삭제할 커피 번호는 : ', coffeesId);
        const result = await coffees.delCoffee(coffeesId);
        res.render('Success', {name:"커피 ["+result.name+"] 정보 삭제"});
    }
    catch ( error ) {
        res.status(400).send({error:'커피 삭제 Fail'});
    }
}

// 커피 정보 수정 폼
async function editCoffeeForm(req, res) {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('수정할 커피 번호는 :', coffeesId);
        const info = await coffees.getCoffeeDetail(coffeesId);
        res.render('CoffeesEdit', {name:"커피 수정", view:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:'커피 수정 Fail'});
    }
}

// 커피 정보 수정
async function editCoffee(req, res) {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('수정할 커피 번호는 : ', coffeesId);

        const name = req.body.name;
        const volume = req.body.volume;
        const calorie = req.body.calorie;
        const caffeine = req.body.caffeine;

        if (!name || !volume || !calorie || !caffeine) {
            res.status(400).send({error:'모든 정보를 다 입력하세요.'});
            return;
        }

        const result = await coffees.editCoffee(coffeesId, name, volume, calorie, caffeine);
        res.render('CoffeesDetail', {name:"커피 수정 완료", view: result});
    }
    catch ( error ) {
        res.status(400).send({error:'커피 정보 수정 Fail'});
    }
}