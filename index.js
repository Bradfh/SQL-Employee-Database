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

async function startApp() {
  const answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: 
      [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Update Employee Role'
      ]
  });
  switch (answer.action) {
    case 'View All Employees':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'View All Departments':
      await viewEmployees();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
  }
}

async function viewDepartments() {
  const [rows, fields] = await connection.promise().query('SELECT * FROM department');
  console.table(rows);
  startApp();
}