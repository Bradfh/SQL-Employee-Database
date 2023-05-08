INSERT INTO job_title (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 100000, 1),
       (2, 'Marketing Representative', 60000, 2),
       (3, 'Database Manager', 80000, 3),
       (4, 'HR Representative', 50000, 4),
       (5, 'Accountant', 70000, 5);

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Marketing'),
       ('IT'),
       ('Human Resources'),
       ('Finance');

INSERT INTO manager (first_name, last_name)
VALUES ('Brad', 'Hall'),
       ('Marquise', 'West'),
       ('Yevette', 'Hunt'),
       ('Milton', 'Robles'),
       ('Jessica', 'Saddington');

INSERT INTO employees (first_name, last_name, job_title_id, manager_report)
VALUES ('Brad', 'Hall', 1, 0),
       ('Marquise', 'West', 2, 0),
       ('Yevette', 'Hunt', 3, 0),
       ('Milton', 'Robles', 4, 0),
       ('Jessica', 'Saddington', 5, 0),
       ('Will', 'Cline', 1, 1),
       ('John', 'Doe', 2, 2),
       ('Emma', 'Carr', 3, 3),
       ('Jane', 'Doe', 4, 4),
       ('Zachary', 'Scuderi', 5, 5);
