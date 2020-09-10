module.exports={
    mainPrompt:[
        {
            type:'list',
            name:'welcome',
            message:'what would you like to do',
            choices:[
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'View all roles',
                'View all departments',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update employee role',
                'Update employee manager',
                'Remove Employee',
                'Exit'
            ]  
        },
    ],
    addEmployee:[
        {
            type:'input',
            name:'firstName',
            message:'What is Employees First Name'
        },
        {
          type:'input' ,
          name:'lastName',
          message:'What is Employees Last Name' 
        },
    ],
    departmentData:[
        { 
            type:'input',
            name:'addDepartment',
            message:'What department would you like to add'

        },
    ],

    addRole:[
        {
          type:'input',
          name:'roleTitle',
          message:'What role do you want to add'
    },
    {
        type:'input',
        name:'roleSalary',
        message:'What is expected the salary for this role'    
    },
    ],
}