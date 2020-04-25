const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('Coffee', 'root', 'cometrue', {dialect:'mysql', host:'127.0.0.1'});

class Coffees extends Sequelize.Model {}
Coffees.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    volume: Sequelize.STRING,
    calorie: Sequelize.STRING,
    caffeine: Sequelize.STRING,
}, {tableName:'coffees', sequelize, timestamps: false});


class CoffeeImage extends Sequelize.Model {}
CoffeeImage.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    coffee_id: Sequelize.INTEGER,
    image: Sequelize.STRING
}, {tableName:'coffeeImage', sequelize, timestamps: false});


class Coffee {
    constructor() {
        try {
            this.prepareModel(); 
        } catch (error) {
            console.error(error);    
        }
    }
    
    async prepareModel() {
        try {
            await Coffees.sync({force:true});
            await CoffeeImage.sync({force:true});

            Coffees.hasOne(CoffeeImage, {
                foreignKey:'coffee_id',
                onDelete:'cascade'
            });

            await this.allDataInsert();
        }
        catch (error) {
            console.log('Error', error);
        }
    }

    async allDataInsert() {
        const data = fs.readFileSync('./model/data.json');
        const coffees = JSON.parse(data);
        for (var coffee of coffees ) {
            await this.oneDataInsert(coffee);
        }
    }

    async oneDataInsert(coffee) {
        try {
            let coffeeData = await Coffees.create({ 
                            name : coffee.name, 
                            volume : coffee.volume, 
                            calorie : coffee.calorie, 
                            caffeine : coffee.caffeine 
                        }, {logging:false});
            let imageData = await CoffeeImage.create({
                            image : coffee.photo
                        }, {logging:false});
            const newData = coffeeData.dataValues;
            
            await coffeeData.setCoffeeImage(imageData);

            return newData;
        } catch (error) {
            console.error(error);
        }
    }

    // 커피 목록
    async getCoffeeList() {
        let returnValue;
        await Coffees.findAll({})
        .then( results => {
            for (var item of results) {

            }
            returnValue = results;
        })
        .catch( error => {
            console.error('Error :', error);
        });
        return returnValue;
    }

    // 커피 추가
    async addCoffee(name, volume, calorie, caffeine, photo) {
        const newCoffee = {name, volume, calorie, caffeine, photo};
        try {
            const returnValue = await this.oneDataInsert(newCoffee);
            return returnValue;
        } catch (error) {
            console.error(error);
        }
    }

    // 커피 상세보기
    async getCoffeeDetail(coffeeId) {
        try {
            const ret = await Coffees.findAll({
                where:{id:coffeeId},
                include: [{model:CoffeeImage}]
            });

            if ( ret ) {
                return ret[0];
            }
            else {
                console.log('데이터 없음');
            }
        }
        catch (error) {
            console.log('Error :', error);
        }
    }

    // 커피 수정
    async updateCoffee(coffeeId, name, volume, calorie, caffeine, photo) {
        try {
            let coffee = await this.getCoffeeDetail(coffeeId);
            coffee.dataValues.name = !name ? coffee.name : name;
            coffee.dataValues.volume = !volume ? coffee.volume : volume;
            coffee.dataValues.calorie = !calorie ? coffee.calorie : calorie;
            coffee.dataValues.caffeine = !caffeine ? coffee.caffeine : caffeine;
            if(photo)
            {
                const imageData = await CoffeeImage.findByPk(coffee.CoffeeImage.dataValues.id);
                imageData.image = photo;
                await imageData.save();

                coffee.CoffeeImage.dataValues.image = photo;
            }
            let ret = await coffee.save();
            return ret;      
        } catch (error) {
            console.error(error);  
        }
    }

    // 커피 삭제
    async deleteCoffee(coffeeId) {
        try {
            let result = await Coffees.destroy({where: {id:coffeeId}});
        } catch (error) {
            console.error(error);  
        }
    }
}

module.exports = new Coffee();