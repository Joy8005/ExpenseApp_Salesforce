({
	doInit : function(component, event, helper) {
		let action = component.get('c.getMonthExpenses');
        let expensePeriods = ['This Week Expense', 'This Month Expense', 'This Year Expense'];
        let finalList = [];
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                let expenseList = response.getReturnValue();
                let transformedData = [];
                for(var i=0; i<expenseList.length; i++){
                    transformedData.push({
                        id : expensePeriods[i],
                        name : expenseList[i]
                    });
                }
                component.set('v.expenseOverview', transformedData);
            } 
        });
        $A.enqueueAction(action);
	}
})