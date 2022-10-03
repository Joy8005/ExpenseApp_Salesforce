public class ExpApp_GetDetailedExpensesClass {
    @AuraEnabled
    public static Expense[] getDetailedExpenses(){
        //creating Expense class list
        Expense[] allExpenses = new Expense[]{};
            //getting each record from the query
            for(ExpApp_Expense__c myExpense : [select Id, ExpApp_Expense_Item__r.Name, ExpApp_Expense_Amount__c, ExpApp_Expense_Date__c
                                        from ExpApp_Expense__c
                                        where ExpApp_Expense_Amount__c > 0.00
                                        order by ExpApp_Expense_Date__c DESC]){
                                            //storing the record in to a list and processing it using class
                                            allExpenses.add(new Expense(myExpense));
                                        }
        //returning the list
        return allExpenses;
    }
    //creating a domiain class that would return a list, instead of the object
    class Expense{
        @AuraEnabled public String Id {get;set;}
        @AuraEnabled public String expenseName {get;set;}
        @AuraEnabled public Decimal expenseAmount {get;set;}
        @AuraEnabled public Date expenseDate {get;set;}
        
        //class constructor
        public Expense(ExpApp_Expense__c myExpense){
            this.Id = myExpense.Id;
            this.expenseName = myExpense.ExpApp_Expense_Item__r.Name;
            this.expenseAmount = myExpense.ExpApp_Expense_Amount__c;
            this.expenseDate = myExpense.ExpApp_Expense_Date__c;
        }
    }
    
    
    @AuraEnabled
    public static Map<String, String> deleteExpense(Id expenseId){
        ExpApp_Expense__c expenseToDelete = [select Id 
                                      from ExpApp_Expense__c
                                      where Id =: expenseId];
        Map<String, String> resultMap = new Map<String, String>();
        
        try{
            delete expenseToDelete;
            resultMap.put('Status', 'SUCCESS');
            resultMap.put('Message', 'Record deleted successfully.');
            
        }catch(Exception ex){
            resultMap.put('Status', 'FAILED');
            resultMap.put('Message', ex.getMessage());
        }
        return resultMap;
    }
}