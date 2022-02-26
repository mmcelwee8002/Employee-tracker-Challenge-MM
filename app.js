// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');




// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'EGRJ!tBH@5$',
    database: 'company',
},
    console.log('Connected to the Employee database.')
);


connection.connect(function (err) {
    console.log('connected- this will change evenually')
    firstPrompt()
})

function firstPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View ALL Departments','View ALL employees', 'View all Roles', 'Quit']
        }
    ])
        .then(function ({ choices }) {
            switch (choices) {
                case "View ALL Departments":
                    viewAllDepartments();
                    break;
                case "View ALL employees":
                    viewAllEmployees();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                case "QUIT":
                    process.exit();
            }
        })
}
function viewAllDepartments() {
    const query = `SELECT * FROM departments `;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
        firstPrompt()
    });
}
function viewAllEmployees() {
    const query = `select employees.first_name, 
    employees.last_name, roles.title, department.department_name
    from employees inner join roles on employees.role_id = roles.id 
    inner join department on department.id = roles.department_id;
 `;

    connection.query(query, (err, res) => {
        if (err) throw err;
       
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
    
}
function viewAllRoles() {
    const query = `SELECT * FROM roles `;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL ROLES');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
    
}
// process.exit();