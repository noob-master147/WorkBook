/**
 * @api {post} /admin/register Register
 * @apiName Register
 * @apiGroup Admin
 *
 *   
 * @apiParam {String} userName user name
 * @apiParam {String} userID email id
 * @apiParam {String} password password
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} instituteType Type of the Institute
 * @apiParam {File} instituteImage Image of the Institute
 * @apiParam {Number} numberOfMembers Number of Members in the Institute
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} mailAddress Mailing Address
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */


/**
 * @api {get} admin/institutes Get Registered Institutes
 * @apiName Institutes
 * @apiGroup Admin
 *
 *   
 */



/**
 * @api {post} admin/viewAllEmployees View Institute's Employee
 * @apiName View All Employees
 * @apiGroup Admin
 * 
 * @apiParam {String} instituteName Name of the Institute
 *   
 */




/**
 * @api {post} admin/approveEmployee Approve Employee
 * @apiName Approve Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 *   
 */


/**
 * @api {post} admin/approveEmployee Reject Employee
 * @apiName Reject Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 *   
 */