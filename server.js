'use strict';
const inquirer=require('inquirer');
const logo=require('asciiart-logo');
const prompt=require("./prompt");
const db=require("./db");
require('console.table');

async function viewAllEmployees(){
   //to view all the employees firstname lastname title salary department manager name
    const employee = await db.viewAllEmployees();
    console.log("\n");
    console.table(employee);
    mainprompt();
}

async function mainprompt(){
    
   //switch case to determine the users choice perform that particular  function
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
            updateEmployeeManager();
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
   //getting all the employees by department
    console.log("welcome to employees by department");
    const empbydep = await db.viewAllEmployeesByDepartment();
    console.log("/n");
    console.table(empbydep);
    mainprompt();
}

async function getEmployeesByManager(){
   //getting alll the employees list by manager
    console.log("welcome to employees by manager");
    const employee= await db.viewAllEmployeesByManager();
    console.log("/n");
    console.table(employee);
    mainprompt();
}

async function viewAllDepartments(){
   //view all the departments
    const departments=await db.viewAllDepartments();
    console.log("/n");
    console.table(departments);
    mainprompt();
}

async function viewAllRoles(){
   //view all the roles
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
   //function to exit  database connection
    const endConnect=await db.exitConnection();  
}

async function addEmployee(){
//to get the roles from database
   const roleData=await db.viewAllRoles();
   //to get the employees llist from database
   const managerData=await db.getEmployees();

  let roleTitles=[];
//to get the role title to the array
   for(let i=0;i<roleData.length;i++){
      roleTitles.push(roleData[i].Title);
   }
//initilising array to get the manager first and last name
  let empManager=[];
   for(let i=0;i< managerData.length;i++){
      empManager.push(managerData[i].first_name+' '+managerData[i].last_name);
   }
    //prompts to get the employer role and manager name ffrom the user
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
//calling the database connection to add employee
   const addEmployeeResult = await db.addEmployee( firstName, lastName, roleId, managerId );
     
	viewAllEmployees();
}

async function addDepartment(){
   //adding the department name
   const {depName}=await inquirer.prompt(prompt.addDepartment);
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
      //cnnection to index.js  to run the query add role for adding the role
      const addRoleResult=await db.addRole(roleTitle,roleSalary,roleDepartmentId) ;
      getRoles();                 
   }

   async function updateEmployeeRole(){
      //function to update the employee role
      const empData=await db.getEmployees();
      const roleData=await db.getRoles();
      //to get the emp name intilized the array to push the employee name
      const empName=[];

      for(let i=0;i<empData.length;i++){
         empName.push(empData[i].first_name+' '+empData[i].last_name);
      }
      //to get the emp role an array is initialised to push the role from employee table
      const empRole=[];
      for(let i=0;i<roleData.length;i++){
         empRole.push(roleData[i].title);
      }
//inquirer prompt for user to answer the questions
      const updateRole=[];
      updateRole.push({
         type:'list',
         name:'employeeName',
         message:'Which Employees Role would you like to update',
         choices:empName
      });
      console.log(empRole);
       updateRole.push({
          type:'list',
          name:'employeeRole',
          message:'Which role should be updated for current employee',
          choices:empRole
       })

       const  {employeeName,employeeRole}=await inquirer.prompt(updateRole);

       const empFirstName=employeeName.split(' ')[0];
       console.log(empFirstName);
       const empLastName=employeeName.split(' ')[1];
       console.log(empLastName);

       const empId=empData.filter
       ((empid)=>empid.first_name===empFirstName &&
         empid.last_name===empLastName )[0].id;
       
      const roleId=roleData.filter((roleid)=>roleid.title===employeeRole)[0].id;
      //connecting the database to update the employee role
      const updateEmployeeResult=await db.updateEmployeeRole(roleId,empId);
      viewAllEmployees();

   }

   async function updateEmployeeManager(){
   
      const empData=await db.getEmployees();
      const empName=[];
      for(let i=0;i<empData.length;i++){
         empName.push(empData[i].first_name+' '+empData[i].last_name);
      }

      const updateName=[];
      updateName.push({
         type:'list',
         name:'employeeName',
         message:"Which Employee's Manager would you like to update",
         choices:empName
      })
       
      const {employeeName}=await inquirer.prompt(updateName);
      
      const empManagerName=empName.filter((managerName)=>
                      managerName!=employeeName);
       const updateManager=[];
      updateManager.push({
         type:'list',
         name:'empManager',
         message:"Who is Employee's New Manager",
         choices:empManagerName
      });
       
      const {empManager}=await inquirer.prompt(updateManager);

      const empFirstName=employeeName.split(' ')[0];
      console.log(empFirstName);
      const empLastName=employeeName.split(' ')[1];
      console.log(empLastName);

      const empId=empData.filter
      ((empid)=>empid.first_name===empFirstName &&
        empid.last_name===empLastName )[0].id;

      const managerFirstName=empManager.split(' ')[0];
      const managerLastName=empManager.split(' ')[1];
      const managerId=empData.filter((managerid)=>managerid.first_name===managerFirstName &&
                                                  managerid.last_name===managerLastName)[0].id;
      const updateEmpManagerResult=await db.updateEmployeeManager(managerId,empId);
      viewAllEmployees();
   }
  async function removeEmployee(){
// Get all details from employee table
const employeeResult = await db.getEmployees();
	
let employeeNames = [];
for (let i = 0; i < employeeResult.length; i++) {
   employeeNames.push(employeeResult[i].first_name + " " + employeeResult[i].last_name
   );
}

// array for inquirer prompt
let removeEmpPrompt = [];

// Get employee name to remove
removeEmpPrompt.push({
   type: "list",
   name: "empName",
   message: "Which employee do you want to remove?",
   choices: employeeNames,
});

// Prompt user for employee name to remove
const { empName } = await inquirer.prompt(removeEmpPrompt);

// Split Employee's name
const empFirstName = empName.split(" ")[0];
const empLastName = empName.split(" ")[1];

// Get employee Id from employee name
const empId = employeeResult.filter(
   (employee) =>
      employee.first_name === empFirstName &&
      employee.last_name === empLastName
)[0].id;
  
// update database
const removeEmployeeResult = await db.removeEmployee(empId);

viewAllEmployees();
}


   function init() {
      
      console.log(
         logo({
            name: 'Employee Management System',
            font:'Colossal',
            lineChars: 7,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-cyan',
         })
         .emptyLine()
         .render()
      );
     
      mainprompt();
   }

   init();