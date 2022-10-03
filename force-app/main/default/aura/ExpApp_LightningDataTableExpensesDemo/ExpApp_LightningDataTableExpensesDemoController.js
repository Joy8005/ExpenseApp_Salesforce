({
    doInit : function(component, event, helper) {
        //getting row action from the helper class 
        let actions = helper.getRowActions.bind(this, component);
        
        //set the columns of the dataTable
        component.set("v.columns", [
            { label: "Item", fieldName: "expenseName", type: "text", sortable: "true"},
            { label: "Date", fieldName: "expenseDate", type: "date", sortable: "true",
             typeAttributes:{
                 timeZone: $A.get('$Locale.timezone')},
             editable: true
            },
            { label: "Amount", fieldName: "expenseAmount", type: "currency", sortable: "true",
             typeAttributes: { 
                 currencyCode: 'NZD'},
             cellAttributes: {
                 alignment: "left"},
             editable: true
            },
            { type: "action", typeAttributes:{
                rowActions: actions
            }}
        ]);
        
        //Call the helper method to get the data
        helper.getExpenses(component);
    },
    
    newExpense: function(component, event, helper) {
        // Global event force:createRecord is used
        var createExpense = $A.get("e.force:createRecord");
        // Parameters like apiName and defaultValues are set
        createExpense.setParams({
            "entityApiName": "ExpApp_Expense__c"
        });
        // Event fired and new contact dialog open
        createExpense.fire();
    },
    
    newExpenseItem: function(component, event, helper) {
        // Global event force:createRecord is used
        var createExpenseItem = $A.get("e.force:createRecord");
        // Parameters like apiName and defaultValues are set
        createExpenseItem.setParams({
            "entityApiName": "ExpApp_Expense_Item__c"
        });
        // Event fired and new contact dialog open
        createExpenseItem.fire();
    },
    
    handleSort : function (component, event, helper){
        setTimeout($A.getCallback(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            component.set("v.sortedBy", fieldName);
            component.set("v.sortedDirection", sortDirection);
            helper.sortData(component, fieldName, sortDirection);
        }), 0);
    },
    
    handleRowAction : function(component, event, helper){
        //get the action - (type: "action" on the doInit function) parameter
        var action = event.getParam("action");
        //get the whole "row" - its ought to be there (required)
        //its standard for lightning:dataTable - already existing
        var row = event.getParam("row");
        
        switch (action.name){
            case "edit":
                var evt = $A.get("e.force:editRecord");
                evt.setParams({
                    recordId: row.Id
                });
                evt.fire();
                break;
            case "delete":
                var deleteAction = component.get("c.deleteExpense");
                var toastEvent = $A.get("e.force:showToast");
                deleteAction.setParams({
                    expenseId: row.Id
                });
                deleteAction.setCallback(this, function(response){
                    if(response.getState() === 'SUCCESS'){
                        let message = response.getReturnValue();
                        if(message.Status === 'SUCCESS'){
                            toastEvent.setParams({
                                'title': 'Sucess!',
                                'type': 'success',
                                'mode': 'dismissable',
                                'message': message.Message
                            });
                            toastEvent.fire();
                            $A.get("e.force:refreshView").fire();
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
                $A.enqueueAction(deleteAction);
                break;
        }
        
    },
    
    handleRowSelection : function(component, event, helper){
        //get the all "selectedRows" - its ought to be there (required) 
        //its standard for lightning:dataTable - already existing
        var selectedRows = event.getParam("selectedRows");
        component.set("v.selectedRows", selectedRows);
    },
    
    handleSave : function(component, event, helper){
        //get the all "draftValues" - its ought to be there (required) 
        //its standard for lightning:dataTable - already existing
        let changedValues = event.getParam("draftValues");
        helper.saveChanges(component, changedValues);
    }
    
    
})