/**
 * @api {post} /employee/register Employee Register
 * @apiName Register
 * @apiGroup Employee
 *
 *   
 * @apiParam {String} userName user name
 * @apiParam {String} userID email id
 * @apiParam {String} password password
 * @apiParam {String} instituteName Name of The Institute
 * @apiParam {String} grade Grade
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */


/**
 * @api {post} employee/viewAllCustomers View Customers 
 * @apiName View Customers
 * @apiGroup Employee
 * 
 * @apiParam {String} employeeID Name of the Insitute
 * 
 *   
 */


/**
 * @api {post} employee/approveCustomer Approve Customer
 * @apiName Approve Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID Name of the Insitute
 * @apiParam {String} id _id of the Customer Document
 *   
 */


/**
 * @api {post} employee/rejectCustomer Reject Customer
 * @apiName Reject Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID Name of the Insitute
 * @apiParam {String} id _id of the Employee Document
 *   
 */