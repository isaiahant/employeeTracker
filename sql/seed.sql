USE employee_db;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 5, 1),
('Jane', 'Doe', 3, 2);


INSERT INTO role(title, salary, department_id)
VALUES ('Manager', 200.000.00)


INSERT INTO department(id, name)
VALUES (2, 'Sales')