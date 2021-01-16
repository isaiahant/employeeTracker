const mysql = require('mysql2')
const inquirer = require('inquirer')
const db = mysql.createConnection('mysql://root:Holytoledo16@localhost/employee_db')
require('console.table')





function Menu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['Add', 'View', 'Update', 'Finish']
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
              choices: ['Department', 'Role', 'Employee']
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
              type: 'list',
              name: 'tables',
              message: 'Which table data would you like to view?',
              choices: ['Employee', 'Role', 'Department']
            }
          ])
            .then(({ tables }) => {
              switch (tables) {
                case 'Employee':
                  db.query('SELECT * FROM employee', (err, employee) => {
                    if (err) { console.log(err) }
                    console.table(employee)
                  })
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'end',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ end }) => {
                      if (end === 'Return to start') Menu()
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
                      name: 'end',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ end }) => {
                      if (end === 'Return to start') Menu()
                    })
                    .catch(err => console.log(err))
                  break;

                case 'Department':
                  db.query('SELECT * FROM department', (err, data) => {
                    if (err) { console.log(err) }
                    console.table(data)
                  })
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'end',
                      message: 'Return to start when ready.',
                      choices: ['Return to start']
                    }
                  ])
                    .then(({ end }) => {
                      if (end === 'Return to start') Menu()
                    })
                    .catch(err => console.log(err))
                  break;
              }
            })
          break;

        case 'Update':
          const employee = db.query('SELECT * FROM employee', (err, employee) => {
            if (err) console.log(err) } 
            )
            const choices = employee.map(first_name =>({
              name: first_name.name,
              id: first_name.id
            }))
          inquirer.prompt([
            {
              type: 'list',
              name: 'empList',
              message: 'Which employee would you like to update?',
              choices: choices
            }
          ])
            .then(({ empList }) => {
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
                  employee = employee[0]
                  let id = db.query('SELECT id FROM employee')
                  db.query(`UPDATE employee SET ? WHERE id = ${id}`, employee, err =>
                    console.log(err)
                  )
                  Menu()
                })
                .catch(err => console.log(err))

            })
            .catch(err => console.log(err))
            .catch(err => console.log(err))
          break;



      }
    })
}