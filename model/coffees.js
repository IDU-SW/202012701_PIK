const fs = require('fs');

class Coffee {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data)
    }
    getcoffeeList() {
        if (this.data) {
            return this.data;
        }
        else {
            return [];
        }
    }
    addcoffee(name, volume, calorie, caffeine) {
        return new Promise((resolve, reject) => {
            let last = this.data[this.data.length - 1];
            let id = last.id + 1;

            let newcoffee = {id:id, name:name, volume:volume, calorie:calorie, caffeine:caffeine};
            this.data.push(newcoffee);

            resolve(newcoffee);
        });
    }
    getcoffeeDetail(coffeeId) {
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