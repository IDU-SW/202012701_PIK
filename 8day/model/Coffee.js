const fs = require('fs');
const pool = require('./dbConnection');
const {prepareTable} = require('./prepareTable');

class Coffee {
    constructor() {
        const data = fs.readFileSync('8day/model/data.json');
        this.coffees = JSON.parse(data)
    }

    getCoffeeList = async() => {
        const sql = 'SELECT * FROM coffees';
        let conn;
        try {
            conn = await pool.getConnection();
            const [coffees, metadata] = await conn.query(sql);
            return coffees;
        } catch(error){
            console.error(error);
        } finally {
            if(conn) {
                conn.release();
            }
        }
    }

    addCoffee = async (name, volume, calorie, caffeine) => {
        let conn;
        try {
            conn = await pool.getConnection();
            
            const sqlI = 'INSERT INTO coffees(name, volume, calorie, caffeine) values (?, ?, ?, ?)';
            const data = [name, volume, calorie, caffeine];
            const resultI = await conn.query(sqlI, data);
            
            const sqlS = 'SELECT * FROM coffees WHERE id = ?;';
            const resultS = await conn.query(sqlS, resultI[0].insertId);
            return resultS[0];
        } catch(error) {
            console.error(error);
        } finally {
            if(conn) {
                conn.release();
            }
        }
    }

    getCoffeeDetail = async(coffeesId) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'SELECT * FROM coffees WHERE id = ?;';
            const [detail, metadata] = await conn.query(sql, coffeesId);
            return detail[0];
        } catch(error) {
            console.error(error);
        } finally {
            if(conn){
                conn.release();
            }
        }
    }

    editCoffee = async(id, name, volume, calorie, caffeine) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'UPDATE coffees SET name = ?, volume = ?, calorie = ?, caffeine = ? WHERE id = ?';
            await conn.query(sql, [name, volume, calorie, caffeine, id]);
            return this.getCoffeeDetail(id);
        } catch (error){
            console.error(error);
        } finally {
            if(conn){
                conn.release();
            }
        }
    }

    delCoffee = async (id) => {
        const sql = 'DELETE FROM coffees WHERE id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(sql, [id]);
            return null;
        } catch(error){
            console.error(error);
        } finally {
            if (conn){
                conn.release();
            }
        }
    }
}

module.exports = new Coffee();