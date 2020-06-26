define({ "api": [
  {
    "type": "post",
    "url": "/admin/approveDriver",
    "title": "Approve Driver",
    "name": "Approve_Driver",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Driver Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/approveEmployee",
    "title": "Approve Employee",
    "name": "Approve_Employee",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Employee Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/deleteDriver",
    "title": "Delete Driver",
    "name": "Delete_Driver",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Driver Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/deleteEmployee",
    "title": "Delete Employee",
    "name": "Delete_Employee",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Employee Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/setGD",
    "title": "Grade & Division",
    "name": "Grade_&_Division",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "grade",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "division",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/institutes",
    "title": "Get Registered Institutes",
    "name": "Institutes",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/login",
    "title": "Login Admin",
    "name": "Login",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>ID userID of Admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/update",
    "title": "Update Admin",
    "name": "Login",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the doc</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteType",
            "description": "<p>Type of the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "numberOfMembers",
            "description": "<p>Number of Members in the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailAddress",
            "description": "<p>Mailing Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/register",
    "title": "Register Admin",
    "name": "Register",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteType",
            "description": "<p>Type of the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "instituteImage",
            "description": "<p>Image of the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "numberOfMembers",
            "description": "<p>Number of Members in the Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailAddress",
            "description": "<p>Mailing Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/rejectDriver",
    "title": "Reject Driver",
    "name": "Reject_Driver",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Driver Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/rejectEmployee",
    "title": "Reject Employee",
    "name": "Reject_Employee",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Employee Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/viewAllDrivers",
    "title": "View Institute's Drivers",
    "name": "View_All_Drivers",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of the Institute</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/viewAllEmployees",
    "title": "View Institute's Employee",
    "name": "View_All_Employees",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of the Institute</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/fetchGrade/:instituteName",
    "title": "Fetch Institute Divisions",
    "name": "Fetch_Institute_Divisions",
    "group": "Common",
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/fetchGrade/:instituteName",
    "title": "Fetch Institute Grades",
    "name": "Fetch_Institute_Grades",
    "group": "Common",
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/getInstituteProfile/:instituteName",
    "title": "Fetch Institute Profile Picture",
    "name": "Fetch_Institute_Profile_Picture",
    "group": "Common",
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/getUserProfile/:role/:id",
    "title": "Fetch Profile Picture",
    "name": "Fetch_Profile_Picture",
    "group": "Common",
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/sendNotification",
    "title": "Send Notifications",
    "name": "Send_Notifications",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Notification Message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/uploadPicture",
    "title": "Upload Profile Picture",
    "name": "Upload_Profile_Picture",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>Email ID of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "profilePicture",
            "description": "<p>Profile Picture</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "View_All_Employees",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>fcmToken FCM Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>Email ID of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/customer/register",
    "title": "Customer Register",
    "name": "Register",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>Email ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of The Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p>Grade</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "division",
            "description": "<p>Division</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customer/register",
    "title": "Update Customer",
    "name": "Register",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p>Grade</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "division",
            "description": "<p>Division</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/driver/register",
    "title": "Driver Register",
    "name": "Register",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>Email ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of The Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>Car Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/driver.js",
    "groupTitle": "Driver"
  },
  {
    "type": "post",
    "url": "/driver/register",
    "title": "Update Driver",
    "name": "Register",
    "group": "Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>Car Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/driver.js",
    "groupTitle": "Driver"
  },
  {
    "type": "post",
    "url": "employee/activeCustomer",
    "title": "Active Customer",
    "name": "Active_Customer",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeID",
            "description": "<p>userID of Employee</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/approveCustomer",
    "title": "Approve Customer",
    "name": "Approve_Customer",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeID",
            "description": "<p>userID of Employee</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Customer Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/deleteCustomer",
    "title": "Delete Customer",
    "name": "Delete_Customer",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeID",
            "description": "<p>userID of Employee</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Employee Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/login",
    "title": "Login Employee",
    "name": "Login_Employee",
    "group": "Employee",
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/employee/register",
    "title": "Employee Register",
    "name": "Register",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>email id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of The Institute</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p>Grade</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "division",
            "description": "<p>Division</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "adharNumber",
            "description": "<p>Adhar Number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "contactNumber",
            "description": "<p>Contact Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Device Token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/rejectCustomer",
    "title": "Reject Customer",
    "name": "Reject_Customer",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employeeID",
            "description": "<p>userID of Employee</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Employee Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/viewAllCustomers",
    "title": "View Customers",
    "name": "View_Customers",
    "group": "Employee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instituteName",
            "description": "<p>Name of the Insitute</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/employee.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/create",
    "title": "Create Post",
    "name": "Create_Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaUrl",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/delete",
    "title": "Delete Post",
    "name": "Delete_Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/disablePost",
    "title": "Disable Post",
    "name": "Disable_Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id document id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/enablePost",
    "title": "Enable Post",
    "name": "Enable_Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id document id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/update",
    "title": "Update Post",
    "name": "Update_Post",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id document id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaUrl",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/superAdmin/approveAdmin",
    "title": "Approve Admin",
    "name": "Approve_Admin",
    "group": "SuperAdmin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Admin Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  },
  {
    "type": "post",
    "url": "/superAdmin/create",
    "title": "Create SuperAdmin",
    "name": "Create_SuperAdmin",
    "group": "SuperAdmin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userID",
            "description": "<p>Email SuperAdmin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fcmToken",
            "description": "<p>FCM Token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Name of SuperAdmin</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  },
  {
    "type": "post",
    "url": "/superAdmin/deleteAdmin",
    "title": "Delete Admin",
    "name": "Delete_Admin",
    "group": "SuperAdmin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Admin Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  },
  {
    "type": "delete",
    "url": "/superAdmin/purge",
    "title": "Purge Database",
    "name": "Purge_Database",
    "group": "SuperAdmin",
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  },
  {
    "type": "post",
    "url": "/superAdmin/rejectAdmin",
    "title": "Reject Admin",
    "name": "Reject_Admin",
    "group": "SuperAdmin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>_id of the Admin Document</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  },
  {
    "type": "get",
    "url": "/superAdmin/viewAllAdmin",
    "title": "View All Admin",
    "name": "View_All_Admin",
    "group": "SuperAdmin",
    "version": "0.0.0",
    "filename": "src/routes/superAdmin.js",
    "groupTitle": "SuperAdmin"
  }
] });
