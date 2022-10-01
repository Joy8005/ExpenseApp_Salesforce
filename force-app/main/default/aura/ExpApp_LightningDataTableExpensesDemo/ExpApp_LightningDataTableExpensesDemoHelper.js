({
    getExpenses : function(component) {
        let action = component.get('c.getDetailedExpenses');
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                component.set("v.data", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.data");
        var reverse = sortDirection !== 'asc';
        
        data = Object.assign([],
                             data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
                            );
        cmp.set("v.data", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer
        ? function(x) {
            return primer(x[field]);
        }
        : function(x) {
            return x[field];
        };
        
        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
    },
    
    getRowActions: function (cmp, row, doneCallback) {
        var actions = [{
            'label': 'Edit',
            'iconName': 'utility:edit',
            'name': 'edit'
        },
        {
            'label': 'Delete',
            'iconName': 'utility:delete',
            'name': 'delete'
        }];
        
        doneCallback(actions);
    },
    
    saveChanges : function(component, changedValues){
        var action = component.get("c.saveChanges");
        action.setParams({
            changedValuesJson: JSON.stringify(changedValues)
        });
        //call another function (below given)
        this.callAction(component, action, function(response){
            var data = component.get("v.data");
            for(var i=0; i<data.length; i++){
                for(var j=0; j<changedValues.length;j++){
                    if(data[i].Id == changedValues[j].Id){
                        data[i] = Object.assign(data[i], changedValues[j]);
                        break;
                    }
                }
            }
            component.set("v.draftValues", []);
            component.set("v.data", data);
            this.showToast(component, "Saved", "Saved Changes", "success");
        });
    },
    
    callAction : function(component, action, successHandler, errorHandler){
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                successHandler(response);
            }else if(state === "ERROR"){
                if(errorHandler){
                    errorHandler(response);
                }else{
                    var errorMessage = "";
                    var errors = response.getError();
                    if(errors && errors[0] && errors[0].message){
                        errorMessage = errors[0].message;
                    }
                    if(errorMessage === ""){
                        errorMessage = "Unknown Error";
                    }
                    this.showNotice(component, "Error", errorMessage, "error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    showToast : function(component, title, message, type){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
                                'title': title,
                                'type': type,
                                'mode': 'dismissable',
                                'message': message
                            });
                            toastEvent.fire();
    },
    
    showNotice : function(component, title, message, type){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
                                'title': title,
                                'type': type,
                                'mode': 'dismissable',
                                'message': message
                            });
                            toastEvent.fire();
    }
})