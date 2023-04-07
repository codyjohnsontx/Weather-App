const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
   

})

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "dd7b33700555957ea22d330ee36f89ee";
    const units = "metric" 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData =JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const iconCode = weatherData.weather[0].icon
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        res.write("<p>The weather is currently " + description + "<p>");
        res.write('<h1>The temperature in ' + query +  ' is ' + temp + ' degrees Celcius.</h1>') 
        res.write("<img src=" + iconUrl + ">")
        res.send() 
    })
}) 
})


 



app.listen(port, function() {
    console.log("Server is running on port 3000");
})