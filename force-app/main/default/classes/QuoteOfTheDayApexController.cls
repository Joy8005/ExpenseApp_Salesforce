public class QuoteOfTheDayApexController {
    @AuraEnabled
    public static String getQuoteDetails(){
        
        List<String> quoteData = new List<String>();
        String quote, author, link;
        String requestEndpoint = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(requestEndpoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            //data is always retrieved using 'Map<>' only
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // get the values of each key in the object
            quote = (String)results.get('quoteText');
        }
        //return the list
        return quote;
    }
}