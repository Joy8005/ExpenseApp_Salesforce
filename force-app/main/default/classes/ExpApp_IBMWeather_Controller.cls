public class ExpApp_IBMWeather_Controller {
    private static String getWeatherJson(String url, String jsonKey) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        Map<String, String> retData = new Map<String, String>();
        return res.getBody();
    }
    private static Double[] resolveGeolocation(Id recordId) {
        double latitude = 0;
        double longitude = 0;
        if (recordId.getSobjectType() == Schema.Account.getSObjectType()) {
            Account acc = [Select Id, BillingLongitude, BillingLatitude from Account WHERE Id=:recordId];
            if (acc!=null) {
                latitude = acc.BillingLatitude;
                longitude = acc.BillingLongitude;
            }
        } else if (recordId.getSobjectType() == Schema.Contact.getSObjectType()) {
            Contact con = [Select Id, MailingLongitude, MailingLatitude from Contact WHERE Id=:recordId];
            if (con!=null) {
                latitude = con.MailingLatitude;
                longitude = con.MailingLongitude;
            }
        } else if (recordId.getSobjectType() == Schema.Lead.getSObjectType()) {
            Lead lea = [Select Id, Address from Lead WHERE Id=:recordId];
            if (lea!=null) {
                latitude = lea.Address.getLatitude();
                longitude = lea.Address.getLongitude();
            }
        }
        return new Double[]{latitude, longitude};
    }
    @AuraEnabled
    public static String getWeatherObservation(Id recordId) {
        Double[] geoLocation = resolveGeoLocation(recordId);
        String url = 'callout:IBM_Cloud_Weather/api/weather/v1/geocode/' + geoLocation[0] + '/' + geoLocation[1] + '/observations.json?language=' + UserInfo.getLanguage().replace('_','-');
        return getWeatherJson(url, 'observation');
    }
    @AuraEnabled
    public static String getWeather3DayForecasts(Id recordId) {
        Double[] geoLocation = resolveGeoLocation(recordId);
        String url = 'callout:IBM_Cloud_Weather/api/weather/v1/geocode/' + geoLocation[0] + '/' + geoLocation[1] + '/forecast/daily/3day.json?units=m&language=en-US';
        return getWeatherJson(url, 'forecasts');
    }
    @AuraEnabled
    public static String getWeatherAlerts(String country) {
        String url = 'callout:IBM_Cloud_Weather/api/weather/v1/country/' + country + '/alerts.json?language=en-US';
        return getWeatherJson(url, 'alerts');
    }
}