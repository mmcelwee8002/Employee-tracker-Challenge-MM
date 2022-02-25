
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;
USE company;


CREATE TABLE department(
  id INTEGER AUTO_INCREMENT UNIQUE,
 department_name VARCHAR(30) PRIMARY KEY
 );

CREATE TABLE roles(
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary INTEGER NOT NULL,
  department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id)
 
  );

CREATE TABLE employees(
id INTEGER AUTO_INCREMENT UNIQUE,
first_name VARCHAR (30),
last_name VARCHAR (30),
department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id),
role_id INTEGER,
 FOREIGN KEY (role_id) REFERENCES roles(id)

);