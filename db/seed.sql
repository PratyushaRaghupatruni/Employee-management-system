use employee_db;
INSERT into department(name) values ('Sales'),('Engineering'),('Finance'),('Marketing'),('Legal');
INSERT INTO role(title,salary,department_id) VALUES ('Sales Lead',100000,1),
                                      ('SalesPerson',80000,1), 
                                      ('Web Developer',150000,2),
                                      ('Project Manager',16000,2),
                                      ('Engineering Manager',125000,2),
                                      ('Research Analyst',250000,3),
                                      ('HR Manager',1900000,4),
                                      ('Recruiter',100000,4),
                                      ('Lawyer',175000,5);
INSERT INTO employee(first_name,last_name,role_id,manager_id) values 
                                                  ('Ashley','Rodriquez',1,NULL),
                                                   ('Kevin','Tupik',2,1)
                                                   ('Malia','Brown',2,1),
                                                   ('Sarah','Lourd',4,NULL),
                                                   ('Tom','Allen',5,NUll),
                                                   ('Marry','Ronald',3,4)
                                                   ('Christian','Tammer',3,5);
                                                   ('Eddie','Baker',7,NULL);
                                                   ('Christine','Ronaldo',8,8);



