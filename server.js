'use strict';
const inquirer=require('inquirer');
const logo=require('asciiart-logo');
const prompt=require("./prompt");
const db=require("./db");
const { viewAllEmployeesByDepartment } = require('./db');
require('console.table');

async function viewAllEmployees(){
    const employee = await db.viewAllEmployees();
    console.log("/n");
    console.table(employee);
    mainprompt();
}

async function mainprompt(){
    const {list} = inquirer.prompt(prompt.mainPrompt);
    switch(list){
       case 'View all Employees':
          await viewAllEmployees();
          break;
       case 'View all Employees by department':
          await getEmployeesByDepartment();
          break;
       case 'View all Employees by manager':
          await getEmployeesByManager();
          break;
       case 'View all Roles' :
          await viewAllRoles();
          break;
       case 'View all Departments':
          await viewAllDepartments();
          break;
       case 'Add Employee':
          await  addEmployee();
          break;
       case 'Add Department':
          await  addDepartment();
          break; 
       case 'Add Role':
          await  addRole();
          break;    
       case 'Update employee role':
          await updateEmployeeRole();
          break;
       case 'Update employee manager':
          await uddateEmployeeManager();
          break;
       case 'Remove Employee':
          await removeEmployee
          break;
       case 'Exit':
          exitConnection();
         break;
                
}
}

async function getEmployeesByDepartment(){
    const employee = await db.viewAllEmployeesByDepartment();
    console.log("/n");
    console.table(employee);
    mainprompt();
}

async function getEmployeesByManager(){
    const employee = await db.viewAllEmployeesByDepartment();
    console.log("/n");
    console.table(employee);
    mainprompt();
}

async function viewAllDepartments(){
    const departments=await db.viewAllDepartments();
    console.log("/n");
    console.table(departments);
    mainprompt();
}

async function viewAllRoles(){
    const roles=await db.viewAllRoles();
    console.log("/n");
    console.table(roles);
    mainprompt();
}

