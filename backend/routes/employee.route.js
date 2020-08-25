const express = require('express');
const app = express();
const employeeRoute = express.Router();
var multer = require('multer');
var fs = require('fs');

// Employee model
let Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  console.log(req.body);
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = employeeRoute;