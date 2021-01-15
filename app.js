const mysql = require('mysql')
const inquirer = require('inquirer')
const db = mysql.createConnection('mysql://root:Holytoledo16@localhost/employee_db')

let depart = []
let roll = []
let emp = []
db.query('SELECT * FROM employee', (err, data) =>{
if (err) { console.log(err) }

console.log(data)
})


function Menu() {
  inquirer.prompt([
    {
      type:'list',
      name:'menu',
      message:'What would you like to do?',
      choices:['Add', 'View', 'Update']
    }
  ])
  .then(({menu}) =>{
    switch (menu) {
      case Add:
        inquirer.prompt([
          {
            type:'list',
            name:'adding',
            message:'What would you like to add?',
            choices:['Department', 'Role', 'Employee']
          }
        ])
        .then(({adding})=>{
          switch (adding) {
            case Department:
              inquirer.prompt([
                {
                  type:'input',
                  name:'depName',
                  message:'What is the name of the department?'
                }
              ])
              break;
          
            default:
              break;
          }
        })
        break;
    
      default:
        break;
    }
  })
}