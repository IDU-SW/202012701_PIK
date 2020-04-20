const express = require('express');
const router = express.Router();
const coffees = require('../model/coffees');

router.get('/coffees', showcoffeeList);
router.get('/coffees/:coffeeId', showcoffeeDetail);
router.post('/coffees', addcoffee);

module.exports = router;

function showcoffeeList(req, res) {
    const coffeeList = coffees.getcoffeeList();
    const result = { data:coffeeList, count:coffeeList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showcoffeeDetail(req, res) {
    try {
        // 커피 상세 정보 id
        const coffeeId = req.params.coffeeId;
        console.log('coffeeId : ', coffeeId);
        const info = await coffees.getcoffeeDetail(coffeeId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새로운 커피 추가
// POST 요청 분석 > 바디 파서
async function addcoffee(req, res) {
    const name = req.body.name;

    if (!name) {
        res.status(400).send({error:'name 누락'});
        return;
    }

    const volume = req.body.volume;
    const calorie = parseInt(req.body.calorie);
    const caffeine = req.body.caffeine;

    try {
        const result = await coffees.addcoffee(name, volume, calorie, caffeine);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}