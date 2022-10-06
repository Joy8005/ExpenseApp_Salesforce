public class OpenWeatherMapAPI {
    @AuraEnabled
    public static List<String> getWeatherData(){
        
        //return list init
        List<String> opeanWeatherMapData = new List<String>();
        
        //Key ingrediants
        String apiKey = 'cf41c3592f7b09d188c0e0d2ec6e470d';
        String requestEndpoint = 'http://api.openweathermap.org/data/2.5/weather';
        requestEndpoint += '?q=' + 'wellington,nz';
        requestEndpoint += '&units=metric';
        requestEndpoint += '&APPID=' + apiKey;
        
        //make REST API connection
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(requestEndpoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            //data is always retrieved using 'Map<>' only
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            
            //Get information from object itself
            Map<String, Object> mainResults = (Map<String, Object>)(results.get('main'));
            String temp = String.valueOf(mainResults.get('temp'));
            String pressure = String.valueOf(mainResults.get('pressure'));
            String humidity = String.valueOf(mainResults.get('humidity')); 
            String temp_min = String.valueOf(mainResults.get('temp_min')); 
            String temp_max = String.valueOf(mainResults.get('temp_max'));
            
            //Get information from object itself - wind
            Map<String, Object> windResults = (Map<String, Object>)(results.get('wind'));
            String speed = String.valueOf(windResults.get('speed'));
            
            //Get information inside list of objects 'weather'
            String main;
            String description;
            String iconName = 'http://openweathermap.org/img/wn/';
            List<Object> weatherResults = (List<Object>)(results.get('weather'));
            
            //loop through 'weather' list object
            for(Object r : weatherResults){
                //map for the inside object
                Map<String, Object> result = (Map<String, Object>)r;
                //convert the data into string and store it
                main = (String)result.get('main');
                description = (String)result.get('description');
                iconName += (String)result.get('icon');
                iconName += '@2x.png';
                
            }
            
            //add data to list
            opeanWeatherMapData.add(iconName);
            opeanWeatherMapData.add(temp);
            opeanWeatherMapData.add(speed);
            opeanWeatherMapData.add(humidity);
            opeanWeatherMapData.add(main);
            opeanWeatherMapData.add(description);
            
        }
        return opeanWeatherMapData;
    }
}