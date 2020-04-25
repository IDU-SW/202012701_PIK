const fs = require('fs');

class Coffee {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.coffees = JSON.parse(data)
    }
    getCoffeeList() {
        if (this.coffees) {
            return this.coffees;
        }
        else {
            return [];
        }
    }
    // 커피 정보 추가
    addCoffee(name, volume, calorie, caffeine) {
        return new Promise((resolve, reject) => {
            let last = this.coffees[this.coffees.length - 1];
            let id = last.id + 1;

            let newcoffee = {id:id, name:name, volume:volume, calorie:calorie, caffeine:caffeine};
            this.coffees.push(newcoffee);

            resolve(newcoffee);
        });
    }
    
    // 커피 아이디 값 불러와서 삭제하기
    delCoffee(coffeeId) {
        return new Promise((resolve, reject) => {
            for (var coffee of this.coffees ) {
                if ( coffee.id == coffeeId ) {
                    this.coffees.splice(coffeeId, 1);
                    resolve(coffee);
                    return;
                }
            }

            reject({msg:'Can not find coffee!', code:404});
        });
    }
    
    // 커피 내용 수정하는 부분
    editCoffee(coffeeId, name, volume, calorie, caffeine) {
        return new Promise((resolve, reject) => {
            let id = Number(coffeeId);
            let newCoffee = {id, name, volume, calorie, caffeine};
            for (var coffee of this.coffees ) {
                if ( coffee.id == id ) {
                    this.coffees.splice(id, 1, newCoffee);
                    resolve(newCoffee);
                    return;
                }
            }
        });
    }
    getCoffeeDetail(coffeeId) {
        return new Promise((resolve, reject) => {
            for (var coffee of this.data ) {
                if ( coffee.id == coffeeId ) {
                    resolve(coffee);
                    return;
                }
            }
            reject({msg:'Can not find coffee', code:404});
        });
    }
}
module.exports = new Coffee();
