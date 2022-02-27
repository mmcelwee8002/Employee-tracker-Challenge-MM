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
            choices: ['View ALL Departments', 'View ALL employees', 'View all Roles', 'Add employee', 'Update Employee Role', 'Quit']
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
                case "Add employee":
                    addEmployee();
                // case "Update employee Role":
                //     updateEmployeeRole();
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
//-------------------------adding items-------------------
// Make a employee array
function addEmployee() {
    console.log("Inserting an employee!")

    var query =
        `SELECT r.id, r.title, r.salary 
      FROM roles r`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

       
        console.log("RoleToInsert!");
         console.table(res);
        promptInsert(roleChoices);
    });
}

function promptInsert(roleChoices) {

    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            },
        ])
        .then(function (answer) {
            console.log(answer);

            
            const query = `INSERT INTO employees SET ?`
            // when finished prompting, insert a new item into the db with that info
            connection.query(query,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_Id,
                    manager_id: answer.manager_Id,
                },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log(res.insertedRows + "Inserted successfully!\n");

                    firstPrompt();
                });
        });
}
//----------------updating items ------------------------------------


// //"Update Employee Role" / UPDATE,
// function updateEmployeeRole() {
//     employeeArray();

// }

// function employeeArray() {
//     console.log("Updating an employee");

//     var query =
//         `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM employee e
//   JOIN role r
// 	ON e.role_id = r.id
//   JOIN department d
//   ON d.id = r.department_id
//   JOIN employee m
// 	ON m.id = e.manager_id`

//     connection.query(query, function (err, res) {
//         if (err) throw err;

//         const employeeChoices = res.map(({ id, first_name, last_name }) => ({
//             value: id, name: `${first_name} ${last_name}`
//         }));

//         console.table(res);
//         console.log("employeeArray To Update!\n")

//         roleArray(employeeChoices);
//     });
// }

// function roleArray(employeeChoices) {
//     console.log("Updating an role");

//     var query =
//         `SELECT r.id, r.title, r.salary 
//   FROM role r`
//     let roleChoices;

//     connection.query(query, function (err, res) {
//         if (err) throw err;

//         roleChoices = res.map(({ id, title, salary }) => ({
//             value: id, title: `${title}`, salary: `${salary}`
//         }));

//         console.table(res);
//         console.log("roleArray to Update!\n")

//         promptEmployeeRole(employeeChoices, roleChoices);
//     });
// }

// function promptEmployeeRole(employeeChoices, roleChoices) {

//     inquirer
//         .prompt([
//             {
//                 type: "list",
//                 name: "employeeId",
//                 message: "Which employee do you want to set with the role?",
//                 choices: employeeChoices
//             },
//             {
//                 type: "list",
//                 name: "roleId",
//                 message: "Which role do you want to update?",
//                 choices: roleChoices
//             },
//         ])
//         .then(function (answer) {

//             var query = `UPDATE employee SET role_id = ? WHERE id = ?`
//             // when finished prompting, insert a new item into the db with that info
//             connection.query(query,
//                 [answer.roleId,
//                 answer.employeeId
//                 ],
//                 function (err, res) {
//                     if (err) throw err;

//                     console.table(res);
//                     console.log(res.affectedRows + "Updated successfully!");

//                     firstPrompt();
//                 });
//         });
// }

// process.exit();