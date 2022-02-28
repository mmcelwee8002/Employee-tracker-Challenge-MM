DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
USE company;


CREATE TABLE departments(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) 
 
 );

CREATE TABLE roles(
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary INTEGER NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL

 );

CREATE TABLE employees(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,
department_id INTEGER,
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL ,
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);