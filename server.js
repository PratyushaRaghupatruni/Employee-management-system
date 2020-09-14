'use strict';
const inquirer=require('inquirer');
const logo=require('asciiart-logo');
const prompt=require("./prompt");
const db=require("./db");
require('console.table');

async function viewAllEmployees(){
    const employee = await db.viewAllEmployees();
    console.log("\n");
    console.table(employee);
    mainprompt();
}

async function mainprompt(){
  
    const {menuList} = await inquirer.prompt(prompt.mainPrompt);

    switch(menuList){
       case 'View all Employees':
           viewAllEmployees();
          break;
       case 'View all Employees by department':
          console.log('enterd switch case');
          getEmployeesByDepartment();
          break;
       case 'View all Employees by manager':
           getEmployeesByManager();
           break;
       case 'View all Roles' :
           viewAllRoles();
           break;
       case 'View all Departments':
           viewAllDepartments();
          break;
       case 'Add Employee':
           addEmployee();
          break;
       case 'Add Department':
             addDepartment();
          break; 
       case 'Add Role':
             addRole();
          break;    
       case 'Update employee role':
            updateEmployeeRole();
          break;
       case 'Update employee manager':
            uddateEmployeeManager();
          break;
       case 'Remove Employee':
             removeEmployee();
          break;
       case 'Exit':
          exitConnection();
         break;
                
}
}

async function  getEmployeesByDepartment(){
    console.log("welcome to employees by department");
    const empbydep = await db.viewAllEmployeesByDepartment();
    console.log("/n");
    console.table(empbydep);
    mainprompt();
}

async function getEmployeesByManager(){
    console.log("welcome to employees by manager");
    const employee= await db.viewAllEmployeesByDepartment();
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
    console.log('/n');
    console.table(roles);
    mainprompt();
}

async function getRoles(){
   const roles=await db.getRoles();
   console.log('\n');
   console.table(roles);
   mainprompt();
}

async function exitConnection(){
    const endConnect=await db.exitConnection();  
}

async function addEmployee(){

   const roleData=await db.viewAllRoles();
   const managerData=await db.getEmployees();

  let roleTitles=[];

   for(let i=0;i<roleData.length;i++){
      roleTitles.push(roleData[i].Title);
   }

  let empManager=[];
   for(let i=0;i< managerData.length;i++){
      empManager.push(managerData[i].first_name+' '+managerData[i].last_name);
   }
     empManager.push("none");

   prompt.addEmployee.push({
         type:'list',
          name:'roleName',
          message:'what is employer role?',
          choices:roleTitles,
   });
   
   prompt.addEmployee.push({
        type:'list',
        name:'manager',
        message:'what is the manager of the employee',
        choices:empManager,
   });
 
   const {firstName,lastName,roleName,manager}=await inquirer.prompt(prompt.addEmployee);

  // const result = words.filter(word => word.length > 6);

    const roleId=roleData.filter((role)=>role.Title===roleName)[0].ID;

    const managerFirstName=manager.split(' ')[0];
    const managerLastName=manager.split(' ')[1];
    const managerId=managerData.filter
                       ((empid)=>empid.first_name===managerFirstName &&
                         empid.last_name===managerLastName )[0].id
    console.log(managerId);

   const addEmployeeResult = await db.addEmployee( firstName, lastName, roleId, managerId );
     
	viewAllEmployees();
}

async function addDepartment(){
    const addDepartmentResult=await db.addDepartment(depName);
    viewAllDepartments();
}


 async function addRole(){
 
    const departmentName=[];
    const departmentResult=await db.viewAllDepartments();
    for(let i=0;i<departmentResult.length;i++){
       departmentName.push(departmentResult[i].DEPARTMENT);
    }
    prompt.addRole.push({
                         type:'list',
                         name:'depName',
                         message:'what department does the Role belong?',
                         choices:departmentName
                        });
      const {roleTitle,roleSalary,depName}=await inquirer.prompt(prompt.addRole);
      
      const roleDepartmentId=departmentResult.filter((depId)=>depId.DEPARTMENT===depName)[0].id;
      
      const addRoleResult=await db.addRole(roleTitle,roleSalary,roleDepartmentId) ;
      getRoles();                 
   }

viewAllEmployees();