-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of the following code will affect employee_db --
USE employee_db;

CREATE TABLE department(
    id INTEGER auto_increment NOT NULL,

    name VARCHAR(30),

    PRIMARY key(id)
);

CREATE TABLE role(
    id INTEGER auto_increment NOT NULL,

    title VARCHAR(30),

    salary DECIMAL,

  department_id INTEGER,

  CONSTRAINT fk_department FOREIGN KEY(department_id)
  REFERENCES department(id) 
  ON UPDATE CASCADE
  ON DELETE CASCADE,

   PRIMARY KEY(id)

);


-- Creates the table "people" within employee_db --


CREATE TABLE employee (

  id INTEGER not null auto_increment,
  first_name VARCHAR(30) not null,
  last_name VARCHAR(30) not null,
   role_id INTEGER,
  manager_id INTEGER,
   CONSTRAINT fk_role FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_employee FOREIGN KEY(manager_id)
  REFERENCES employee(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,

  PRIMARY KEY(id)
);