var mongoose = require('mongoose');  
var empSchema = new mongoose.Schema({  
  empNo: String,
  empName: String,
  project: String,
  isBgChecked: String,
  infoEmail: String,
  dbsEmail: String,
  dbsAssetID: String,
  mobile: Number,
  location: String
});
mongoose.model('Blob', empSchema);