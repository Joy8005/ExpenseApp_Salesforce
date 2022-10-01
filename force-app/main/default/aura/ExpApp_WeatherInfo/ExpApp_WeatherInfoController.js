({
    doInit : function(component, event, helper) {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var url = "";
        
        if((hours >= 6) && (ampm == "am")){
            component.set("v.weatherGreeting", "Morning");
        }else if((hours >= 12 || hours < 6) && (ampm == "pm")){
            component.set("v.weatherGreeting", "Afternoon");
        }else if((hours >= 6 || hours < 12) && (ampm == "pm")){
            component.set("v.weatherGreeting", "Evening");
        }else if((hours >= 12 || hours < 6) && (ampm === "am")){
            component.set("v.weatherGreeting", "Night");
        }
   
        var action = component.get('c.getWeatherData');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                let weatherData = response.getReturnValue();
                component.set('v.weatherData', weatherData);
            }
        });
        $A.enqueueAction(action);
    }
})