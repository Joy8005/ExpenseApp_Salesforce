trigger SendExpensesSpendControlEmail on XpenseApp__Expense__c (After insert, After update) {
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)){
        //passing each trigger to a new instance of 'spendControlEmail' class 
        System.enqueuejob(new  SpendControlEmail(Trigger.new));
    }
}