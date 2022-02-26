

INSERT INTO departments (department_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Product Owner', 95000, 1),
('Senior Engineer', 110000, 1),
('Lead Engineer', 130000, 1),
('Principle Engineer', 180000, 1),
('Sales Lead', 80000, 4),
('Lead Architect', 200000, 1),
('Lead Council', 200000, 3),
('Council', 150000, 3),
('Admin', 75000, 2),
('Account Manager', 100000, 2),
('Sales Director', 150000, 4),
('Lead Accountant', 100000, 2),
('Sales Person', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Vernon', 'Lee',1,3),
  ('Arthur', 'Machen', 2, 5),
  ('Frederick', 'Marryat', 2,5),
  ('Harriet', 'Martineau',3,5),
  ('George', 'Meredith',3,5),
  ('Margaret', 'Oliphant', 4, 5),
  ('Anthony', 'Trollope',5, 18),
  ('Charlotte', 'Yonge',6, 5),
  ('Horace', 'Walpole',7, 5),
  ('Matthew', 'Lewis',8,15),
  ('William', 'Bedford',8, 15),
  ('Anne', 'Radcliffe',9 ,10),
  ('Charles', 'Brown',10, 3),
  ('Eliza', 'Parsons',11, 3),
  ('Susan', 'Hill',12, 3),
  ('Sydney', 'Owenson',13, 11),
  ('Hubert', 'Crackanthorpe',3, 12),
  ('William', 'Carleton',1, 12),
  ('Gerald', 'Griffin',2, 6); 