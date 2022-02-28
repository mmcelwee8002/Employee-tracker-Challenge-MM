// Import and require mysql2
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'EGRJ!tBH@5$',
    database: 'company',
},
    console.log('Connected to the Employee database.')
);

db.connect(function (err) {
    console.log('connected- this will change evenually')
    firstPrompt()
})
function firstPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: 
                ['View ALL Departments', 'View ALL employees', 'View all Roles', 'Budget All Roles', 'Budget by Department',  'Add employee', 'Update Employee Role',  'Add a Department','Quit'  ]
            
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
                case "View Employee by Department ID":
                    viewByDept();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee Role":
                    updateEmployeeRole();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "View Employee by Department ID":
                    viewByDept();
                    break;
                case "Budget All Roles":
                        budgetAllRoles();
                        break;
                case "Budget by Department":
                    viewByDept();
                        
                    break;      
                // case "QUIT":
                //     quit();
            }
        })
}

// // -------------------view departments-------------------
function viewAllDepartments() {
    const query = `SELECT * FROM departments `;

    db.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
        firstPrompt()
    });
}
// //----------------view all Employees-------------------

function viewAllEmployees() {
    const query = `select employees.first_name, 
    employees.last_name, 
    roles.title, 
    department.department_name
    from employees inner join roles on employees.role_id = roles.id 
    inner join department on department.id = roles.department_id;
 `;

    db.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
}
// // ------------------- view by Department ID---------------
function viewByDept() {
    const query = `select employees.first_name,employees.last_name, roles.department_id  from employees join roles on employees.role_id= roles.id;
 `;

    db.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL EMPLOYEES BY ID');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
}
//-----------------view budget---------------------------
function budgetAllRoles() {
    const query = `select sum(salary) AS "total cost of ALL roles" From roles;
 `;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
}
//----------------view budget by department ----------------
function viewByDept() {
    const query = `SELECT roles.salary, departments.department_name, SUM(salary) as "Salary by dept." FROM roles JOIN departments ON department_id = departments.id group by department_name;
 `;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        firstPrompt()
    })
}



// // -----------------view all roles-------------------
const viewAllRoles = () => {
    const query = `SELECT * FROM roles `;
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) throw err;

            console.log('\n');
            console.log('VIEW ALL ROLES');
            console.log('\n');
            console.table(res);
            firstPrompt()
        })
    })
}
// // -------------Add an Employee------------------------
function addEmployee() {
    console.log("Inserting an employee!")

    const query = `select employees.first_name,employees.last_name, employees.manager_id,  roles.title, roles.salary  from employees join roles on employees.role_id= roles.id;`

    db.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({  title, salary }) => ({
            value: title, salary: `${salary}`
        }));

        console.table(res);
        console.log("RoleToInsert!");

        promptInsert(roleChoices);
    });
}


function promptInsert(roleChoices){
inquirer.prompt([{

    type: "input",
    name: "first_name",
    message: "What is the employee's first name?",
   
},
{
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?",
   
},
{
    type: "list",
    name: "role",
    message: "What is the employee's role?",
    choices: 
    viewAllRoles().then(response => response.map(role => {
        return `${role.id}: ${role.title}`
    }))
}
])


firstPrompt();
}



// const quit = ()=>{
// console.log("Thank you, goodbye!")
//     process.exit();

// }
