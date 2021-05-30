/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//the generated api key
const apiKey = '&appid=980081c7651e415aa27f1b679c4f20d2&units=metric';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//function getWeather that fetches the URL with the zip of the city and my api key
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+apiKey)
    try {
  
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }

//Adding the event listener to the element with id 'generate'
document.getElementById('generate').addEventListener('click', performAction);

//using the event listener such that when clicking, get me all the data I want and update UI
function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;

    //getting the weather by calling getWeather function
    getWeather(baseURL,newZip ,apiKey)
        .then(function (userData) {
      postData('/add', {  temp:userData['main']['temp'],date: newDate, userResp: feelings })

    //updating the UI to contain the date, the temperatur of the city with the API, the user response
    updateUI();


})
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temp: data.temp,
        date: data.date,
        userResp: data.userResp
      }),       
    });
  
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
 
      }
  }

  const updateUI = async ()=>{
    const request=await fetch('/all');
    try{
      const allData=await request.json();
   //updating the div tags in the html to contaian the values of the data I want
     document.getElementById('date').innerHTML=newDate;
     document.getElementById('temp').innerHTML=allData.temp;
     document.getElementById('content').innerHTML=allData.userResp;
    }
    catch(error){
     console.log("error",error);
    }
   }}