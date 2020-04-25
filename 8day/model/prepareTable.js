const conn = require('./dbConnection');

exports.prepareTable = () => {
    const sql = 'drop table if exists coffees.coffees; CREATE TABLE coffees.coffees ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20), volume INT, calorie INT, caffeine INT););';
    conn.query(sql).then(ret => {
        console.log('Succees');
        conn.end();
    }).catch(err => {
        console.log('Fail :', err);
        conn.end();
    });
} 