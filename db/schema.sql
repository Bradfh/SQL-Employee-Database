DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE job_title (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL 
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title INT NOT NULL,
    department INT NOT NULL,
    salary INT NOT NULL,
    manager INT NOT NULL,
    FOREIGN KEY (job_title) REFERENCES job_title(id),
    FOREIGN KEY (department) REFERENCES department(id),
    FOREIGN KEY (manager) REFERENCES manager(id)
);