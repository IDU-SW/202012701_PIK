const fs = require('fs');

class Coffee {
    constructor() {
        const data = fs.readFileSync('7day/model/data.json');
        this.coffees = JSON.parse(data)
    }


    // Promise 예제
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

            let newcoffee = {id, name, volume, calorie, caffeine};
            this.coffees.push(newcoffee);

            resolve(newcoffee);
        });
    }



    // 커피 정보 삭제
    delCoffee(coffeesId) {
        return new Promise((resolve, reject) => {
            for (var coffee of this.coffees ) {
                if ( coffee.id == coffeesId ) {
                    this.coffees.splice(coffeesId, 1);
                    resolve(coffee);
                    return;
                }
            }
            reject({msg:'Can not find coffee.', code:404});
        });
    }
    


    // 커피 정보 수정
    editCoffee(coffeesId, name, volume, calorie, caffeine) {
        return new Promise((resolve, reject) => {
            let id = Number(coffeesId);
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

    // Promise - Reject
    // 커피 정보 상세보기
    getCoffeeDetail(coffeesId) {
        return new Promise((resolve, reject) => {
            for (var coffee of this.coffees ) {
                if ( coffee.id == coffeesId ) {
                    resolve(coffee);
                    return;
                }
            }
            reject({msg:'Can not find Coffee.', code:404});
        });
    }
}

module.exports = new Coffee();