'use strict';

// Get database connection
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    //for viewing the employees list
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
    //for viewing the employees by department list
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
    //for viewing all the employees by manager
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
    //to get all the employees from employee table
    getEmployees() {
        return this.connection.query(`
           SELECT * from employee; 
        `);
    }
    //to get all the roles from roles table  
    viewAllRoles() {
        return this.connection.query(`
           SELECT id AS ID,title AS Title,salary as Salary FROM role; 
        `);
    }
    //to get all the departments from departmnet table
    viewAllDepartments() {
        return this.connection.query(`
           SELECT id,name AS DEPARTMENT FROM department;
       `);
    }
    //to get all the roles   
    getRoles() {
        return this.connection.query(`
        SELECT * FROM role;
    `);
    }
    //to add an employee    
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
					console.log(
						`\nSuccessfully added employee with firstName:${firstName}, lastName:${lastName}, roleId:${roleId}, managerId:{managerId}`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error adding employee : " + err);
		}
	}

    
    //to add an department
    addDepartment(depName) {
        try {
            this.connection.query(
                "INSERT INTO department SET ?",
                {
                    name: `${depName}`,

                },
                function (error,res) {
                    if (error) throw error;
                    console.log(`\nadded department ${depName} successfully!`);
                     return res;
                }
            );
        } catch (err) {
            if (err) throw error;
        }

    }
    //to add role 
    addRole(roleTitle, roleSalary, roleDepartmentId) {

        try {
            this.connection.query(
                "INSERT INTO role SET ?",
                {
                    title: `${roleTitle}`,
                    salary: `${roleSalary}`,
                    department_id: `${roleDepartmentId}`,
                },
                function (error,res) {
                    if (error) throw error;
                    console.log(`\nadded role  ${roleTitle},${roleSalary},${roleDepartmentId} successfully!`);
                    return res;
                }
            );
        } catch (error) {
            if (error) throw error;
        }


    }
    //to update employee role
    updateEmployeeRole(roleId, empId) {
        try {
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: `${roleId}`,

                    },
                    {
                        id: `${empId}`,
                    }
                ],
                function (error) {
                    if (error) throw error;
                    console.log(`\nupdated employee with id : ${empId} to role :${roleId} successfully!`);
                }
            );
        } catch (error) {
            if (error) throw error;
        }

    }
    //to add update employee manager
    updateEmployeeManager(managerId, empId) {
        try {
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        manager_id: `${managerId}`,

                    },
                    {
                        id: `${empId}`,
                    }
                ],
                function (error) {
                    if (error) throw error;
                    console.log(`\nupdated employee with id : ${empId} to manager :${managerId} successfully!`);
                }
            );
        } catch (error) {
            if (error) throw error;
        }

    }
    //to remove manager

    removeEmployee(empId) {

        try {
            this.connection.query(
                "DELETE FROM employee WHERE ?",
                [
                    {
                        id: empId,
                    }
                ],
                function (error) {
                    if (error) throw error;
                    console.log(`\nRemoved employee with id : ${empId} successfully!`);
                
                }
            );
        } catch (error) {
            if (error) throw error;
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
