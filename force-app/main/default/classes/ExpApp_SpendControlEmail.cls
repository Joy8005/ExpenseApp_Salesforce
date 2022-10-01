global class ExpApp_SpendControlEmail implements Queueable {
    
   	private List<ExpApp_Expense__c> thisExpenses;
    //class constructor to initiate list into 'thisExpenses'
    public SpendControlEmail(List<ExpApp_Expense__c> allexpenses) {
        this.thisExpenses = allexpenses;
    }
    public void execute(QueueableContext context){
        //Get the spend control value from the custom object
        Decimal spendControl = (Decimal)[select Id, Spend_Control__c
                                         from Expense_Spend_Control__c].Spend_Control__c;
        //Get the sum of total expenses (aggregateresult) 
        AggregateResult expenses = [SELECT SUM(Total_Expense__c) totalExpense FROM Expense_Item__c];
        Decimal totalExpense = (Decimal)expenses.get('totalExpense');
        
        
        //for each new trigger 
        for(ExpApp_Expense__c myExpense : thisExpenses){
            // check if the total expenses is greater than or equal to spend control value
            if((totalExpense + myExpense.Expense_Amount__c) >= spendControl){ 
                // get the email Id of the user who created the record
                String Email = (String)[select Id, Email
                                        from User
                                        where Id = :myExpense.CreatedById].Email;
                //create an instance of Messaging.SingleEmailMessage 
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                //Get the visualforce template Id
                EmailTemplate et = [Select Id from EmailTemplate where Name = 'Expense Alert'];
                //Attach the visualforce template Id
                mail.setTemplateId(et.Id);
                //set the target object
                mail.setTargetObjectId(myExpense.CreatedById); 
                //Attach the addresses to send the emails to
                mail.setToAddresses(new String[] { Email });
                // set activity as false
                mail.saveAsActivity = false;
                //call 'sendEmail' messaging method to send the email
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            }
        }
        
        
    }
}