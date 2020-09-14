'use strict';

// Get database connection
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllEmployees() {
        return this.connection.query(
            `
            SELECT e1.id AS ID,
                   e1.first_name AS First_Name,
                   e1.last_name AS Last_Name,
	               role.title AS Title,
                   department.name AS Department,
                   salary AS Salary,
                   concat(e2.first_name,' ',e2.last_name) AS Manager
          from 
                employee e1
          LEFT OUTER JOIN
               role ON e1.role_id=role.id
          LEFT OUTER JOIN
               employee e2 ON e1.manager_id=e2.id
          LEFT OUTER JOIN 
               department ON role.department_id=department.id
          ORDER BY
               e1.id;
            `
        );
    }
    viewAllEmployeesByDepartment() {
        return this.connection.query(`
            SELECT e1.id AS ID,
                e1.first_name AS First_Name,
                e1.last_name AS Last_Name,
                role.title AS Title,
                department.name AS Department,
                salary AS Salary,
                concat(e2.first_name,' ',e2.last_name) AS Manager
            FROM
                employee e1
            LEFT OUTER JOIN
                role ON e1.role_id=role.id
            LEFT OUTER JOIN
                employee e2 ON e1.manager_id=e2.id
            LEFT OUTER JOIN 
                department ON role.department_id=department.id
            ORDER BY
                department.id;
         `);

    }
    viewAllEmployeesByManager() {
        return this.connection.query(`
            SELECT e1.id AS ID,
                e1.first_name AS First_Name,
                e1.last_name AS Last_Name,
                role.title AS Title,
                department.name AS Department,
                salary AS Salary,
                concat(e2.first_name,' ',e2.last_name) AS Manager
            FROM 
                employee e1
            LEFT OUTER JOIN
                role ON e1.role_id=role.id
            LEFT OUTER JOIN
                employee e2 ON e1.manager_id=e2.id
            LEFT OUTER JOIN 
                department ON role.department_id=department.id
            ORDER BY
                e1.manager_id;
         `);
    }

    getEmployees(){
        return this.connection.query(`
           SELECT * from employee; 
        `);
    }
    
    viewAllRoles() {
        return this.connection.query(`
           SELECT id AS ID,title AS Title,salary as Salary FROM role; 
        `);
    }

    viewAllDepartments() {
        return this.connection.query(`
           SELECT id,name AS DEPARTMENT FROM department;
       `);
    }
    
    getRoles(){
        return this.connection.query(`
        SELECT * FROM role;
    `);
    }
    
    addEmployee(firstName, lastName, roleId, managerId) {

         return this.connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: `${firstName}`,
                    last_name: `${lastName}`,
                    role_id: `${roleId}`,
                    manager_id: `${managerId}`,
                },
               
            );
    }

    addDepartment(depName) {
       return  this.connection.query(
              "INSERT INTO department SET ?",
              {
                  name:`${depName}`,

              },
              
          );
    }

        addRole(roleTitle,roleSalary,roleDepartmentId) {
        
              return  this.connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title:`${roleTitle}`,
                        salary:`${roleSalary}`,
                        department_id:`${roleDepartmentId}`,
                    },
                  
                );
              
    }
    updateEmployeeRole(roleId,empId){
        return  this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                {
                    role_id:`${roleId}`,

                },
                {
                    id:`${empId}`,
                }
            ],
        );
    }

    updateEmployeeManager(managerId,empId) {
          return  this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                {
                    manager_id:`${managerId}`,

                },
                {
                    id:`${empId}`,
                }    
            ],
            );
    }

    removeEmployee(empId) {
         return  this.connection.query(
                "DELETE FROM employee WHERE id=?",
                [
               {
                   id:`${empId}`,
               }
                ],
            );
    }

    exitConnection() {
        try {
			this.connection.end();
        } 
        catch (error) {
			console.log("Error closing connection : " + error);
		}
    }

}

module.exports = new DB(connection);
