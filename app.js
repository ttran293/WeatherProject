const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}) )

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

  console.log(req.body.cityName);

  const url = "https://api.openweathermap.org/data/2.5/weather?q=20904,us&appid=b6e19d92daea6f8d6c533d397f7ef2c5&units=metric";
    https.get(url, function(response){
      // console.log(response);
      response.on('data', (data) => {
        const result = JSON.parse(data);
        const des = result.weather[0].description
        const icon = result.weather[0].icon
        var icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

        res.write("<p>The weather is " + des + "<p>");
        res.write("<img src=" + icon_url +">");
         //end the response process
         res.send();
  })
})
})




app.listen(3000, function(){
  console.log("Server is running");
})
