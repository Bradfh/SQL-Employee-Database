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
        'Add Department',
        'Add Role',
        'Update Employee Role',
        'Exit'
      ],
      pageSize: 8
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
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
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

function addDepartment() {
  inquirer.prompt([
    {
      name: 'department_name',
      type: 'input',
      message: "What is the name of the department you would like to add?"
    }
  ])
  .then(function (answer) {
    connection.query(
      'INSERT INTO department SET ?',
      {
        name: answer.department_name
      },
      function (err) {
        if (err) throw err;
        console.log('Your department was added successfully!');
        startApp();
      }
    );
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: 'role_name',
      type: 'input',
      message: "What is the name of the role you would like to add?"
    },
    {
      name: 'salary',
      type: 'input',
      message: "What is the salary for this role?"
    },
    {
      name: 'department_id',
      type: 'input',
      message: "What is the department ID for this role?"
    }
  ])
  .then(function (answer) {
    connection.query(
      'SELECT id FROM department WHERE id = ?',
      [answer.department_id],
      function (err, res) {
        if (err) throw err;

        if (res.length === 0) {
          console.log('Invalid department ID. Please try again.');
          startApp();
        } else {
          connection.query(
            'INSERT INTO job_title SET ?',
            {
              title: answer.role_name,
              salary: answer.salary,
              department_id: answer.department_id
            },
            function (err) {
              if (err) throw err;
              console.log('Your role was added successfully!');
              startApp();
            }
          );
        }
      }
    );
  });
}

startApp();