INSERT INTO job_title (id, title)
VALUES (1, 'Software Engineer'),
       (2, 'Marketing Representative'),
       (3, 'Database Manager'),
       (4, 'HR Representative'),
       (5, 'Accountant');

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

INSERT INTO employees (first_name, last_name, job_title_id, department_id, salary, manager_report)
VALUES ('Brad', 'Hall', 1, 1, 100000, 0),
       ('Marquise', 'West', 2, 2, 85000, 0),
       ('Yevette', 'Hunt', 3, 3, 75000, 0),
       ('Milton', 'Robles', 4, 4, 90000, 0),
       ('Jessica', 'Saddington', 5, 5, 105000, 0),
       ('Will', 'Cline', 1, 1, 85000, 1),
       ('John', 'Doe', 2, 2, 60000, 2),
       ('Emma', 'Carr', 3, 3, 62000, 3),
       ('Jane', 'Doe', 4, 4, 71000, 4),
       ('Zachary', 'Scuderi', 5, 5, 88000, 5);
