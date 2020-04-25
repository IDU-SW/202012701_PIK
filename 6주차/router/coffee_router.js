const express = require('express');
const router = express.Router();
const coffees = require('../model/coffees');

router.get('/coffees', showCoffeeList);
router.get('/coffees/:coffeeId', showCoffeeDetail);
router.post('/coffees', addCoffee);
router.post('/coffees/:coffeeId', delCoffee);
router.post('/coffees/edit/:coffeeId', editCoffee);

module.exports = router;

function showCoffeeList(req, res) {
    const coffeeList = coffees.getCoffeeList();
    const result = { data:coffeeList, count:coffeeList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showCoffeeDetail(req, res) {
    try {
        // 커피 상세 정보 id
        const coffeeId = req.params.coffeeId;
        console.log('coffeeId : ', coffeeId);
        const info = await coffees.getCoffeeDetail(coffeeId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새로운 커피 추가
// POST 요청 분석 > 바디 파서
async function addCoffee(req, res) {
    const name = req.body.name;

    if (!name) {
        res.status(400).send({error:'name 누락'});
        return;
    }

    const volume = req.body.volume;
    const calorie = parseInt(req.body.calorie);
    const caffeine = req.body.caffeine;

    try {
        const result = await coffees.addCoffee(name, volume, calorie, caffeine);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 삭제
async function delCoffee(req, res) {
    try {
        const coffeeId = req.params.coffeeId;
        console.log('삭제 커피 번호 : ', coffeeId);
        const result = await coffees.delCoffee(coffeeId);
        res.send({msg:'SUCCESS : 커피 정보가 삭제 되었습니다.', data:result});
    }
    catch ( error ) {
        res.status(400).send({error:'커피 정보 삭제 실패'});
    }
}

// 수정 부분
async function editCoffee(req, res) {
    try {
        const coffeeId = req.params.coffeeId;
        console.log('수정 커피 번호 : ', coffeeId);

        const name = req.body.name;
        const volume = req.body.volume;
        const calorie = req.body.calorie;
        const caffeine = req.body.caffeine;

        if (!name || !volume || !calorie || !caffeine) {
            res.status(400).send({error:'모든 정보를 다 입력하세요.'});
            return;
        }

        const result = await coffees.editCoffee(coffeeId, name, volume, calorie, caffeine);

        res.send({msg:'SUCCESS, ' + coffeeId + '번의 커피 내용이 변경 됨', data:result});
    }
    catch ( error ) {
        res.status(400).send({error:'Coffee Update fail.'});
    }
}
