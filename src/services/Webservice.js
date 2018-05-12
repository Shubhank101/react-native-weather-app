import axios from 'axios';
import apiKey from 'WeatherApp/src/config/APIKey.js';

export default {
  async getWeatherData(cityName) {
    try {
      let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey + "&units=metric";
      let response = await axios.get(url);

      return response.data;
    }
    catch (error) {
      console.log(error)
    }
  },
  
  getWeatherData_async(cityName) {
      let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey + "&units=metric";        
      return new Promise((resolve, reject)=>{
         axios.get(url)
        .then(function (response) {
           resolve(response.data);
        })
        .catch(function (error) {
           reject(error);
        });        
      });    
  }
}
