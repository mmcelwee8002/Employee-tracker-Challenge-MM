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
            choices: ['View ALL employees']
        }
    ])
        .then(function ({ choices }) {
            switch (choices) {
                case "View ALL employees":
                    viewAllEmployees();
                    break;
            }
        })
}

function viewAllEmployees() {
    const query = `SELECT * FROM employees `;

    connection.query(query, (err, res) => {
        if (err) throw err;
       
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
    })
}
