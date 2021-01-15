const mysql = require('mysql')
const inquirer = require('inquirer')
const db = mysql.createConnection('mysql://root:Holytoledo16@localhost/employee_db')


db.query('SELECT * FROM employee'), (err, employee) =>{
if (err) { console.log(err) }

console.log(employee)
}