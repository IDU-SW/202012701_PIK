const express = require('express');
const router = express.Router();
const coffees = require('../model/Coffee');

router.get('/coffee/add', addCoffeeForm);
router.post('/coffees', addCoffee);
router.post('/coffees/delete', delCoffee);
router.get('/coffees/detail/:coffeesId', editCoffeeForm);
router.post('/coffees/edit', editCoffee);
module.exports = router;

router.get('/coffees', async (req, res) => {
    const coffeeList = await coffees.getCoffeeList();
    res.render('coffees', {coffees:coffeeList, count:coffeeList.length})
});

router.get('/coffees/:coffeesId', async (req, res) => {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('coffeesId : ', coffeesId);
        const info = await coffees.getCoffeeDetail(coffeesId);

        res.render('coffeesDetail', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
});

function addCoffeeForm(req, res) {
    res.render('coffeeAdd');
}

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
        res.render('coffeeAddInfo',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function editCoffeeForm(req, res) {
    try {
        const coffeesId = req.params.coffeesId;
        console.log('coffeesId : ', coffeesId);
        const info = await coffees.getCoffeeDetail(coffeesId);

        res.render('coffeeEdit', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function editCoffee(req, res) {

    const id = req.body.id;
    const name = req.body.name;
    const volume = req.body.volume;
    const calorie = req.body.calorie;
    const caffeine = req.body.caffeine;

    if (!name || !volume || !calorie || !caffeine) {
        res.status(400).send({error:'모든 정보를 다 입력하세요.'});
        return;
    }

    try {
        const result = await coffees.editCoffee(id, name, volume, calorie, caffeine);
        res.render('coffeeEditInfo',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function delCoffee(req, res) {
    try {
        const id = req.body.id;
        const result = await coffees.delCoffee(id);
        res.render('coffeeDelInfo');
    }
    catch ( error ) {
        res.status(400).send({error:'커피 정보 삭제 Fail'});
    }
}