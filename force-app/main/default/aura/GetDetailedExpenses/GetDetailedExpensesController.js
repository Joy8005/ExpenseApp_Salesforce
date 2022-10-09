({
    doInit : function(component, event, helper) {
        let action = component.get('c.getDetailedExpenses');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let expenseList = response.getReturnValue();
                component.set('v.expensesList', expenseList);
            }
        });
        $A.enqueueAction(action);
    },
    
    newExpense: function(component, event, helper) {
        // Global event force:createRecord is used
        var createExpense = $A.get("e.force:createRecord");
        // Parameters like apiName and defaultValues are set
        createExpense.setParams({
            "entityApiName": "Expense__c"
        });
        // Event fired and new contact dialog open
        createExpense.fire();
    },
    
    newExpenseItem: function(component, event, helper) {
        // Global event force:createRecord is used
        var createExpenseItem = $A.get("e.force:createRecord");
        // Parameters like apiName and defaultValues are set
        createExpenseItem.setParams({
            "entityApiName": "Expense_Item__c"
        });
        // Event fired and new contact dialog open
        createExpenseItem.fire();
    },
    
    editExpenses : function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");
        let eventSource = event.getSource();
        let eventId = eventSource.get("v.name");
        editRecordEvent.setParams({
            "entityApiName": "Expense__c",
            "recordId": eventId
        });
        editRecordEvent.fire();
    },
    
    deleteExpenses : function(component, event, helper){
        let action = component.get('c.deleteExpense');
        let eventSource = event.getSource();
        let eventId = eventSource.get("v.name");
        action.setParams({
            "expenseId": eventId
        });
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                let message = response.getReturnValue();
                if(message.Status === 'SUCCESS'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        'title': 'Sucess!',
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': message.Message
                    });
                    toastEvent.fire();
                }else if(message.Status === 'FAILED'){
                    toastEvent.setParams({
                        'title': 'Error!',
                        'type': 'error',
                        'mode': 'dismissable',
                        'message': message.Message
                    });
                    toastEvent.fire();
                }
            }else{
                alert('Error getting data');
            }
        });
        $A.enqueueAction(action);
    }
})