// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require("mysql2");
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

function firstPrompt() {



inquirer.prompt([



    {
        type: 'list',
        name: 'steps',
        message: 'What would you like to do?',
        choices: ['View ALL employees', 'Add employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View ALL Departments', 'Add Department', 'quit'],
    }
])
    .then(answers => console.log(answers));
}