define({ "api": [
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
    "filename": "documentation/superAdmin.js",
    "groupTitle": "Super_Admin"
  },
  {
    "type": "delete",
    "url": "/superAdmin/purge",
    "title": "Purge Database",
    "name": "PurgeDatabase",
    "group": "Super_Admin",
    "version": "0.0.0",
    "filename": "documentation/superAdmin.js",
    "groupTitle": "Super_Admin"
  },
  {
    "type": "delete",
    "url": "/superAdmin/purge",
    "title": "Request",
    "name": "Purge_Database",
    "group": "Super_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/superAdmin.js",
    "groupTitle": "Super_Admin"
  }
] });
