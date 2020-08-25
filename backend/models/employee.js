const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   companyName: {
      type: String
   },
   location: {
      type: String
   },
   employeeDetails: {
      type: Array
   }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)