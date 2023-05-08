const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'employee_db'
});

console.log(connection);

function startApp() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices:
      [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
  })
  .then(function (answer) {
    switch (answer.action) {
      case 'View All Employees':
        viewEmployees();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });
}

function viewDepartments() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function viewRoles() {
  connection.query('SELECT * FROM job_title', function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function viewEmployees() {
  connection.query('SELECT * FROM employees', function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'last_name',
      type: 'input',
      message: "What is the employee's last name?"
    },
    {
      name: 'role_id',
      type: 'input',
      message: "What is the employee's role ID? (Enter role ID)"
    },
    {
      name: 'manager_report',
      type: 'input',
      message: "Which manager will the employee report to? (Enter manager ID)"
    }
  ])
  .then(function (answer) {
    connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        job_title_id: answer.role_id,
        manager_report: answer.manager_report
      },
      function (err) {
        if (err) throw err;
        console.log('Your employee was added successfully!');
        startApp();
      }
    );
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: "Which employee's role would you like to update? (Enter employee ID)"
    },
    {
      name: 'role_id',
      type: 'input',
      message: "What is the employee's new role ID? (Enter role ID)"
    }
  ])
  .then(function (answer) {
    connection.query(
      'UPDATE employees SET ? WHERE ?',
      [
        {
          job_title_id: answer.role_id
        },
        {
          id: answer.employee_id
        }
      ],
      function (err) {
        if (err) throw err;
        console.log('Employee role was updated successfully!');
        startApp();
      }
    );
  });
}

startApp();