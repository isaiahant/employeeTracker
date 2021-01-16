const mysql = require('mysql')
const inquirer = require('inquirer')
const db = mysql.createConnection('mysql://root:Holytoledo16@localhost/employee_db')
const Department = require('./lib/department')
const Employee = require('./lib/employee')
const Role = require('./lib/role')





function Menu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['Add', 'View', 'Update']
    }
  ])
    .then(({ menu }) => {
      switch (menu) {
        case Add:
          inquirer.prompt([
            {
              type: 'list',
              name: 'adding',
              message: 'What would you like to add?',
              choices: ['Department', 'Role', 'Employee', 'Finish']
            }
          ])
            .then(({ adding }) => {
              switch (adding) {
                case 'Department':
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'depName',
                      message: 'What is the name of the department?'
                    }
                  ])
                    .then(({ depName }) => {
                      db.query(`INSERT INTO department(name)
                      VALUES ('${depName})`)
                      Menu()
                    })
                    .catch(err => console.log(err))

                  break;
                case 'Role':
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'title',
                      message: 'What is the title of the new role?'
                    },
                    {
                      type: 'input',
                      name: 'salary',
                      message: 'What is the salary of the new role?'
                    },
                    {
                      type: 'input',
                      // nice
                      name: 'depID',
                      message: "What is the new role's department id?"
                    }
                  ])
                    .then(({ title, salary, depID }) => {
                      db.query(`INSERT INTO role(title, salary, department_id)
                      VALUES ('${title}', ${salary}, ${depID})`)
                      Menu()
                    })
                    .catch(err => console.log(err))

                  break;
                case 'Employee':
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'first',
                      message: "What is the employee's first name?",
                    },
                    {
                      type: 'input',
                      name: 'last',
                      message: "What is the employee's last name?"
                    },
                    {
                      type: 'input',
                      name: 'role',
                      message: 'What is the role of the employee?'
                    },
                    {
                      type: 'input',
                      name: 'manager',
                      message: "What is the manager's id?"
                    }
                  ])
                    .then(({ first, last, role, manager }) => {
                      db.query(`INSERT INTO employee(first_name, last_name, role_id, manager)
                      VALUES ('${first}', '${last}', '${role}', ${manager})`)
                      Menu()
                    })
                    .catch(err => console.log(err))
                  break;
              }
            })
            .catch(err => console.log(err))
          break;
        case 'View':
          inquirer.prompt([
            {
              type: 'list'
                name: 'tables',
              message: 'Which table data would you like to view?',
              choices: ['Employee', 'Role', 'Department']
            }
          ])
            .then(({ tables }) => {
              switch (tables) {
                case 'Employee':
                  db.query('SELECT * FROM employee', (err, data) => {
                    if (err) { console.log(err) }
                    console.table(data)
                  })
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'return',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ return}) => {
                      switch (return) {
                        case 'Return to start':
                          Menu()
                          break;
                      }
                    })
                    .catch(err => console.log(err))


                  break;
                case 'Role':
          db.query('SELECT * FROM role', (err, data) => {
            if (err) { console.log(err) }
            console.table(data)
          })
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'return',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ return}) => {
                      switch (return) {
                        case 'Return to start':
                          Menu()
                          break;
                      }
                    })
                    .catch(err => console.log(err))
                  break;
                case 'Department'
                db.query('SELECT * FROM department', (err, data) => {
                  if (err) { console.log(err) }
                  console.table(data)
                  })
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'return',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ return}) => {
                      switch (return) {
                        case 'Return to start':
                          Menu()
                          break;
                      }
                    })
                    .catch(err => console.log(err))
                  break;
              }
            })
            .catch(err => console.log(err))
          break;
        case 'Update':
          inquirer.prompt([
            {
              type: 'list',
              name: 'type',
              message: 'What table would you like to update?',
              choices: ['Employees', 'Roles', 'Departments']
            }
          ])
            .then(({ type }) =>{
              switch (type) {
                case 'Employees':
                  inquirer.prompt([
                    {
                      type:'list',
                      name:'empList',
                      message:'Which employee would you like to update?',
                      choices: emp.length
                    }
                  ])
                  .then(({empList}) =>{
                    inquirer.prompt([
                      {
                        type: 'input',
                        name: 'first',
                        message: "What is the employee's first name?",
                      },
                      {
                        type: 'input',
                        name: 'last',
                        message: "What is the employee's last name?"
                      },
                      {
                        type: 'input',
                        name: 'role',
                        message: 'What is the role of the employee?'
                      },
                      {
                        type: 'input',
                        name: 'manager',
                        message: "What is the manager's id?"
                      }
                    ])
                    .then(({first, last, role, manager}) =>{

                    })

                  })
                    .catch(err => console.log(err))
                  break;
              
               
              }
            })

      }
    })
    .catch(err => console.log(err))
}