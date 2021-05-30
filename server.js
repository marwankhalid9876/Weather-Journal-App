// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

//Adding a GET route that returns the projectData object
app.get('/', sendData);

function sendData (request, response) {
  response.send(projectData);
};


//Adding a POST route that adds incoming data to projectData
app.post('/add', addData);

function addData(request, response) {
  projectData['temp'] = request.body.temp;
  projectData['date'] = request.body.date;
  projectData['userResp'] = request.body.userResp;
  response.send(projectData);
}

//sending the data to facilitate displaying it the UI
app.get('/all',getProjectData);

function getProjectData(req, res) {
  res.send(projectData);
}
