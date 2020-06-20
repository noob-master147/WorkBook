define({ "api": [
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
    "url": "/admin/approveEmployee",
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
  }
] });
