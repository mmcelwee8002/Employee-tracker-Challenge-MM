
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;
USE company;


CREATE TABLE department(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) 
 
 );

CREATE TABLE roles(
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary INTEGER NOT NULL,
  department_id INTEGER
 );

CREATE TABLE employees(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER
);