({
    doInit : function(component, event, helper) {
        // call the class controller methods
        let action = component.get("c.TotalExpenses");
        let action2 = component.get('c.getUserInfo');
        
        //set callback and get the response from the server
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let totalExpense = response.getReturnValue();
                component.set("v.totalExpenses", totalExpense);
            }
        });
        action2.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
				let userInfo = response.getReturnValue();
                component.set("v.userInfo", userInfo);
            }
        });
        
        //fire actions
        $A.enqueueAction(action);
        $A.enqueueAction(action2);
    }
})