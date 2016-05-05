/**
* The main.js file is nothing more than a wrapper that defines the namespace and initializes the different parts of the application
*/

var path = require('path');
var dirname = require('../util.js').dirname;
var App = require('./models/app')



var swig  = require('swig');

var myApp = new App;

// myApp.init = function () {
// var pathToTranscript =path.join(dirname,'views/template/trabscript.html'));
// alert('yo');
// var content = swig.renderFile(path.join(dirname,'views/template/transcript.html'), {
    // name: 'awesome transcript'
// });
// document.getElementById('mainView').innerHTML = myApp.videosView();


// document.getElementById('mainView').innerHTML = content;
 // Instance the DB
 // myApp.db = require('diskdb');
 // myApp.db.connect('db', ['videos','paperedits']);
 // myApp.db.videos.find();
 // Init the todo App
 // myApp.todos.init();
// };
// $(window).load(myApp);