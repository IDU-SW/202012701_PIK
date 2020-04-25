const express = require('express');
const router = express.Router();

const coffees = require('../model/Coffee');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

const upload = multer({ storage : storage });

router.get('/Coffee', showCoffeeList);

router.get('/CoffeeAdd', showAddForm);
router.post('/Coffee', upload.single('photo'), addCoffee);

router.get('/Coffee/:coffeeId', showCoffeeDetail);

router.get('/Coffee/update/:coffeeId', showUpdateForm);
router.post('/Coffee/update/:coffeeId', upload.single('photo'), updateCoffee);

router.post('/Coffee/delete/:coffeeId', deleteCoffee);

module.exports = router;

// 커피 리스트
async function showCoffeeList(req, res) {
    try {
        const coffeeList = await coffees.getCoffeeList();
        const result = { data:coffeeList, count:coffeeList.length };
        res.render('CoffeeList', { data:coffeeList });
    } catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 커피 추가 폼
function showAddForm(req, res) {
    res.render('AddCoffee');
}

// 커피 추가
async function addCoffee(req, res) {
    const name = req.body.name;
    const volume = req.body.volume;
    const calorie = req.body.calorie;
    const caffeine = req.body.caffeine;

    if (!name || !volume || !calorie || !caffeine) {
        res.status(400).send({error:'모든 정보를 다 입력하세요.'});
        return;
    }

    const image = req.file;
    if(!image) {
        res.status(400).send({error:'이미지가 없습니다.'});
        return;
    }
    const photo = image.originalname;

    try {
        const result = await coffees.addCoffee(name, volume, calorie, caffeine, photo);
        showCoffeeList(req, res);
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 커피 상세보기
async function showCoffeeDetail(req, res) {
    try {
        const coffeeId = req.params.coffeeId;
        const info = await coffees.getCoffeeDetail(coffeeId);
        res.render('CoffeeDetail', { data:info.dataValues, image:info.CoffeeImage.dataValues });
    } catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 커피 수정 폼
async function showUpdateForm(req, res) {
    try {
        const coffeeId = req.params.coffeeId;
        const info = await coffees.getCoffeeDetail(coffeeId);
        res.render('UpdateCoffee', { data:info.dataValues, image:info.CoffeeImage.dataValues });
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 커피 수정
async function updateCoffee(req, res) {
    
    const id = req.params.coffeeId;
    const name = req.body.name;
    const volume = req.body.volume;
    const calorie = req.body.calorie;
    const caffeine = req.body.caffeine;

    if (!name || !volume || !calorie || !caffeine) {
        res.status(400).send({error:'모든 정보를 다 입력하세요.'});
        return;
    }

    const image = req.file;
    const photo = !image ? null : image.originalname;

    try {
        const result = await coffees.updateCoffee(id, name, volume, calorie, caffeine, photo);
        res.render('CoffeeUpdateComplete', { data:result.dataValues, image:result.CoffeeImage.dataValues });
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 커피 삭제
async function deleteCoffee(req, res) {
    try {
        const id = req.params.coffeeId;
        const result = await coffees.deleteCoffee(id);
        res.render('CoffeeDeleteComplete', {data:result})
    }
    catch(error) {
        res.status(500).send(error.msg);
    }
}