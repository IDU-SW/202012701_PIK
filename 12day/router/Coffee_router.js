const jwt = require('jsonwebtoken'); //jwt
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const coffee = require('../model/Coffee');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.post('/login', handleLogin); // 로그인(토큰 가져오기)
router.get('/profile', sendProfile); // 프로필보기
router.get('/public', sendPublicInfo); // 권한부여

router.get('/coffee', showCoffeeList);
router.get('/coffee/add', showAddForm);
router.get('/coffee/update/:Coffeeid', showUpdateForm); //
router.get('/coffee/:Coffeeid', showCoffeeDetail);
router.post('/coffee', addCoffee);
router.post('/coffee/delete/:Coffeeid', deleteCoffee);
router.post('/coffee/update/:Coffeeid', updateCoffee);


module.exports = router;


const secretKey = 'ikparkKEY'

const user = {
    id : 'ikpark',
    password : 'cometure',
    name : '박인규',
 }

function handleLogin(req, res) {
    const id = req.body.id;
    const pw = req.body.password;
 
    // 로그인 성공
    if ( id === user.id && pw === user.password ) {
       // 토큰 생성
       const token = jwt.sign( { id:user.id, name:user.name }, secretKey );
       res.send({msg:'success', token:token});
    }
    else {
       res.sendStatus(401);
    }
 }
 
 function sendPublicInfo(req, res) {
    res.send({msg : 'This is public information'});
 }
 
 // 프로필 보기 - 인증된 사용자만 가능
 function sendProfile(req, res) {
    // 요청 헤더 중 Authorization 필드로 토큰 얻기
    const token = req.headers['authorization'];
    console.log('token :', token);
    jwt.verify(token, secretKey, (err, decoded) => {
       if ( err ) {
          res.sendStatus(401);
          return;
       }
       res.send({id: user.id, name: user.name});
    }); 
 }


// Read (리스트조회)
async function showCoffeeList(req, res) {
    const CoffeeList = await coffee.getCoffeeList();
    console.log(CoffeeList);
    jwt.verify(token, secretKey, (err, decoded) => {  //리스트 조회하려면 권한 있어야함
        res.render('CoffeeList', { coffee: CoffeeList, count: CoffeeList.length })
    });
}


// ReadDetail (리스트 상세조회)
async function showCoffeeDetail(req, res) {
    try {
        const Coffeeid = req.params.Coffeeid;
        console.log('Coffeeid : ', Coffeeid);
        const info = await coffee.getCoffeeDetail(Coffeeid);
        res.render('CoffeeDetail', { data: info });
    }
    catch (error) {
        console.log('Can not Coffee find, 404');
        res.status(error.code).send({ msg: error.msg });
    }
}

// Add (커피 추가)
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
        const result = await coffee.addCoffee(name, volume, calorie, caffeine);
        // res.render('CoffeeAddComplete', { data: result });
        showCoffeeList(req, res);
    }
    catch (error) {
        res.status(500).send(error.msg);
    }
}

// Add Form (커피 추가 폼)
function showAddForm(req, res) {
    res.render('AddCoffee');
}

// Delete (커피 삭제)
async function deleteCoffee(req, res) {
    try {
        const Coffeeid = req.params.Coffeeid;
        const result = await coffee.deleteCoffee(Coffeeid);
        res.render('CoffeeDeleteComplete', { data: result })
    }
    catch (error) {
        res.status(500).send(error.msg);
    }
}

// Update (커피 수정)
async function updateCoffee(req, res) {
    const Coffeeid = req.params.Coffeeid;
    const name = req.body.name;
    const volume = req.body.volume;
    const calorie = req.body.calorie;
    const caffeine = req.body.caffeine;

    if (!name || !volume || !calorie || !caffeine) {
        res.status(400).send({error:'모든 정보를 다 입력하세요.'});
        return;
    }

    try {
        const result = await coffee.updateCoffee(Coffeeid, name, volume, calorie, caffeine);
        res.render('CoffeeUpdateComplete', { data: result });
    }
    catch (error) {
        res.status(500).send(error.msg);
    }
}

// Update Form
async function showUpdateForm(req, res) {
    try {
        const Coffeeid = req.params.Coffeeid;
        console.log('Coffeeid : ', Coffeeid);
        const info = await coffee.getCoffeeDetail(Coffeeid);
        res.render('UpdateCoffee', { data: info }); //ch
    }
    catch (error) {
        console.log('Can not find, 404');
        res.status(error.code).send({ msg: error.msg });
    }
}
