-- All Permissions
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add User', 'Users', 'Add new user');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Users', 'Users', 'View all users');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View User Details', 'Users', 'View all users');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update User Status', 'Users', 'Update user status as active or inactive');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update User', 'Users', 'Update user details');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Timezone', 'Settings', 'Update system Time zone');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Profile', 'Settings', 'View own profile details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Profile', 'Settings', 'Update own profile details');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Create Service', 'Services', 'Create hospital billing service');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Service', 'Services', 'Delete hospital billing service');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Service', 'Services', 'Update hospital billing service');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Services', 'Services', 'View all hospital billing services');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Service Details', 'Services', 'View hospital billing service details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Service Status', 'Services', 'Update hospital billing service status as active or inactive');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Create Room', 'Rooms', 'Create hospital room');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Room', 'Rooms', 'Delete hospital room');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Room', 'Rooms', 'Update hospital room');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Rooms', 'Rooms', 'View all hospital rooms');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Room Details', 'Rooms', 'View hospital room details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Room Status', 'Rooms', 'Update hospital room status as available or taken or cleaning or closed for maintenance or waiting for cleaning');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Create Role', 'Roles', 'Create role');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Role', 'Roles', 'Delete role');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Role', 'Roles', 'Update role');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Roles', 'Roles', 'View all roles');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Role Details', 'Roles', 'View role details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Role Permission Status', 'Roles', 'Update role assigned permissions as active or inactive');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Patient Emergency Contact', 'Patient', 'Add patient emergancy contact details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Patient Emergency Contact', 'Patient', 'Delete patient emergancy contact details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Patient Documents', 'Patient', 'Add patient documents');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Patient Documents', 'Patient', 'Delete patient documents');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Patient Details', 'Patient', 'View patient details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View All Patient', 'Patient', 'View all patients');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Employee', 'Employee', 'Create employee');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Employee', 'Employee', 'Delete employee');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Employee', 'Employee', 'Update employee');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Employees', 'Employee', 'View all employees');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Employee Details', 'Employee', 'View employee details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Employee Emergency Contact', 'Employee', 'Add employee emergancy contact details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Employee Emergency Contact', 'Employee', 'Delete employee emergancy contact details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Employee Documents', 'Employee', 'Add employee documents');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Employee Documents', 'Employee', 'Delete employee documents');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Doctor Details', 'Doctor', 'View doctor details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View All Doctors', 'Doctor', 'View all doctors');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Add Bill Service', 'Bill', 'Add billing service to bill');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Delete Bill Service', 'Bill', 'Delete billing service to bill');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Finalize Bill', 'Bill', 'Finalize bill amount');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Pay Bill', 'Bill', 'Bill mark as paid');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View All Bills', 'Bill', 'View all bills');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Bill', 'Bill', 'View bill details');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Create Appointment', 'Appointments', 'Create appointment');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Cancel Appointment', 'Appointments', 'Delete appointment');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Appointments', 'Appointments', 'View all appointments');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Appointment Details', 'Appointments', 'View appointment details');

INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Create Admission', 'Admissions', 'Create admission');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Discharge Patient', 'Admissions', 'Discharge patient');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Admissions', 'Admissions', 'View all admissions');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('View Admission Details', 'Admissions', 'View admission details');
INSERT INTO `permissions` (`permission_name`, `permission_category`, `permission_desc`) VALUES ('Update Admission', 'Admissions', 'Update admission details');


-- Built in Roles

INSERT INTO `roles` (`role_name`, `role_desc`) VALUES ('Admin', 'Root admin role');
INSERT INTO `roles` (`role_name`, `role_desc`) VALUES ('Patient', 'Patient role');
INSERT INTO `roles` (`role_name`, `role_desc`) VALUES ('Doctor', 'Doctor role');
