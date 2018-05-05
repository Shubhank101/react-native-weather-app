export default {
   
   getWeatherObjectFromJSON(json) {
      return {
        "weather" : json.weather[0].main,
        "temp"    : Math.round(json.main.temp),
        "wind"    : json.wind.speed,
        "humidity": json.main.humidity        
      };
   },
   
   formattedWindSpeed(windSpeed) {
        if (windSpeed < 0.3) {
            return "Calm";
        }
        else if (windSpeed < 1.5) {
             return "Light air";    
        }
        else if (windSpeed < 3.3) {
             return "Light breeze";    
        }
        else if (windSpeed < 5.5) {
             return "Gentle Breeze";    
        }
        else if (windSpeed < 7.9) {
             return "Moderate Breeze";    
        }
        return "Strong Breeze";    
   }
   
}