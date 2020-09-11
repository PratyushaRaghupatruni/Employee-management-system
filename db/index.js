"use strict";

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

    addEmployee(firstName, lastName, roleId, managerId) {
        try {
            this.connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: `${firstName}`,
                    last_name: `${lastName}`,
                    role_id: `${roleId}`,
                    manager_id: `${managerId}`,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\nSuccessfully added employee with firstName:${firstName}, lastName:${lastName}, roleId:${roleId}, managerId:{managerId}`
                    );
                    return res;
                }
            );
        } catch (err) {
            console.log("Error adding emploee : " + err);
        }
    }

    addDepartment(depName) {
      try{
          this.connection.query(
              "INSERT INTO department SET ?",
              {
                  name:`${depName}`,

              },
              function (err, res) {
                if (err) throw err;
                console.log(
                    `\nSuccessfully added department with name:${depName}`);
                return res;
            }
          );
        }
        catch (err) {
            console.log("Error adding Department : " + err);
      }
    }

        addRole(roleTitle,roleSalary,roleDepartmentId) {
            try{
                this.connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title:`${roleTitle}`,
                        salary:`${roleSalary}`,
                        department_id:`${roleDepartmentId}`,
                    },
                    function (err, res) {
                      if (err) throw err;
                      console.log(`\nSuccessfully added role with title:${roleTitle},salary:${roleSalary},department_id:${roleDepartmentId}`);
                      return res;
                  }
                );
              }
              catch (err) {
                  console.log("Error adding Role : " + err);
            }
    }
    updateEmployeeRole(roleId,empId){
        try{
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                {
                    role_id:`${roleId}`,

                },
                {
                    id:`${empId}`,
                }
            ],
            function(err,res){
                if (err) throw err;
                console.log(`\nSuccessfully updated Employee role  `);
                return res;
            }
            );
        }
        catch (err) {
            console.log("Error updating Role : " + err);
      }
    }
    updateEmployeeManager(managerId,empId) {
        try{
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                {
                    manager_id:`${managerId}`,

                },
                {
                    id:`${empId}`,
                }    
            ],
            function(err,res){
                if (err) throw err;
                console.log(`\nSuccessfully updated Employee Manager`);
                return res;
            }
            );
        }
        catch (err) {
            console.log("Error updating Employee Manager: " + err);
      }
    }
    removeEmployee(empId) {
        try{
            this.connection.query(
                "DELETE FROM employee WHERE id=?",
                [
               {
                   id:`${empId}`,
               }
                ],
            function(err,res){
                if (err) throw err;
                console.log(`\nSuccessfully removed Employee with id:${empId}`);
                return res;
            }
            );
        }
        catch (err) {
            console.log("Error removin Employee: " + err);
      }
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
