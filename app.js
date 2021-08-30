const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}) )

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

  console.log(req.body.city);
  const key = "b6e19d92daea6f8d6c533d397f7ef2c5"
  var unit = "metric";
  var city = req.body.city;
  var charset = "utf-8"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+key+"&units="+unit;

    https.get(url, function(response){
      // console.log(response);
      response.on('data', (data) => {
        const result = JSON.parse(data);
        console.log(result.id);

        const des = result.weather[0].description
        const icon = result.weather[0].icon
        var icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        var widget_src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js"
        var srcipt_src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"
        res.write("<div id='openweathermap-widget-11'></div>"+
                  "<script src='//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'></script><script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,"+
                    "cityid: "+result.id+
                    ",appid: 'b6e19d92daea6f8d6c533d397f7ef2c5',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = 'utf-8';"+
                  "script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>")


        res.send();
  })
})
})




app.listen(3000, function(){
  console.log("Server is running");
})
