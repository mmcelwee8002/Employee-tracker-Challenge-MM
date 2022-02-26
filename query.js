const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require('../../db/connection');
// query for view all departments

//query for add a department

//

//query for view all employees

// query for add an employee

//query for update and employee role



// query for view all roles

//add a role

// update role

//delete role