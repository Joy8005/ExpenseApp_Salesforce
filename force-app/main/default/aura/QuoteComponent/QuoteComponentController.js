({
	doInit : function(component, event, helper) {
		var action = component.get('c.getQuoteDetails');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                let returnValue = response.getReturnValue();
                component.set('v.QuoteData', returnValue);
            }else{
                alert(response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})