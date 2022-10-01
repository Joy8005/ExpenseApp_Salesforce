({
    getWeather : function(component, event) {
        this.getWeatherObservation(component);
    },
    getWeatherObservation : function(component) {
        var action = component.get("c.getWeatherObservation");
        action.setParams({recordId:component.get("v.recordId")});
        action.setCallback(this, function(resp) {
            var state = resp.getState();
            console.log(state);
            if (state === 'ERROR') {
                var errors = resp.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            console.log(resp.getReturnValue());
            var observationData = JSON.parse(resp.getReturnValue()).observation;
            if (typeof observationData=='undefined') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: "No location data!",
                    message: "This record has no valid longitude and latitude data.",
                    type: "success"
                });
                toastEvent.fire();
                return;
            }
            component.set("v.weatherLoadedWithIcon", (observationData.wx_icon!=null));
            component.set("v.weatherObservationData", observationData);
            this.getWeatherForecast(component);
        });
        $A.enqueueAction(action);
    },
    getWeatherForecast : function(component) {
        var action = component.get("c.getWeather3DayForecasts");
        action.setParams({recordId:component.get("v.recordId")});
        action.setCallback(this, function(resp) {
            var state = resp.getState();
            console.log(state);
            if (state === 'ERROR') {
                var errors = resp.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            component.set("v.weatherForecastData", JSON.parse(resp.getReturnValue()).forecasts);
            component.set("v.weatherLoaded", true);
        });
        $A.enqueueAction(action);
    }
})