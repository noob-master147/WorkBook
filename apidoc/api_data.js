define({ "api": [
  {
    "type": "post",
    "url": "admin/approveEmployee",
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
    "filename": "documentation/adminDocs.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "admin/institutes",
    "title": "Get Registered Institutes",
    "name": "Institutes",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "documentation/adminDocs.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/register",
    "title": "Register",
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
    "filename": "documentation/adminDocs.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "admin/approveEmployee",
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
    "filename": "documentation/adminDocs.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "admin/viewAllEmployees",
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
    "filename": "documentation/adminDocs.js",
    "groupTitle": "Admin"
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
    "filename": "documentation/commonDocs.js",
    "groupTitle": "Common"
  },
  {
    "type": "post",
    "url": "/login",
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
    "filename": "documentation/commonDocs.js",
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
    "filename": "documentation/commonDocs.js",
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
    "filename": "documentation/customerDocs.js",
    "groupTitle": "Customer"
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
            "description": "<p>Name of the Insitute</p>"
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
    "filename": "documentation/employeeDocs.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "employee/pendingCustomers",
    "title": "View Pending Customers",
    "name": "Pending_Customers",
    "group": "Employee",
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
    "filename": "documentation/employeeDocs.js",
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
    "filename": "documentation/employeeDocs.js",
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
            "description": "<p>Name of the Insitute</p>"
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
    "filename": "documentation/employeeDocs.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "employee/viewCustomers",
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
            "field": "employeeID",
            "description": "<p>Name of the Insitute</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/employeeDocs.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "/superAdmin/approveAdmin",
    "title": "Approve Admin",
    "name": "Approve_Admin",
    "group": "Super_Admin",
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
    "filename": "documentation/superAdminDocs.js",
    "groupTitle": "Super_Admin"
  },
  {
    "type": "post",
    "url": "/superAdmin/deleteAdmin",
    "title": "Delete Admin",
    "name": "Delete_Admin",
    "group": "Super_Admin",
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
    "filename": "documentation/superAdminDocs.js",
    "groupTitle": "Super_Admin"
  },
  {
    "type": "delete",
    "url": "/superAdmin/purge",
    "title": "Purge Database",
    "name": "PurgeDatabase",
    "group": "Super_Admin",
    "version": "0.0.0",
    "filename": "documentation/superAdminDocs.js",
    "groupTitle": "Super_Admin"
  }
] });
