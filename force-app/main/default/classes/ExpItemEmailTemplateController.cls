public class ExpItemEmailTemplateController
{
    public Decimal spendControl = 0.00;
    public Decimal fullExpense = 0.00;
    public list<AggregateResult> lstAR = new list<AggregateResult>();
    /*
Note that any query that includes an aggregate function returns its results in an array of AggregateResult objects. AggregateResult is a read-only sObject and is only used for query results.
Aggregate functions become a more powerful tool to generate reports when you use them with a GROUP BY clause. For example, you could find the count of all opportunities for a CloseDate.

*/
    public ExpItemEmailTemplateController()
    {
        lstAR = [select Name, sum(XpenseApp__Total_Expense__c) totalExpense 
                                               from XpenseApp__Expense_Item__c  
                                               where XpenseApp__Total_Expense__c > 0.00
                                               group by Name]; 
        
        //Get the sum of total expenses (aggregateresult) 
        AggregateResult expenses = [SELECT SUM(XpenseApp__Total_Expense__c) totalExpense FROM XpenseApp__Expense_Item__c];
        fullExpense = (Decimal)expenses.get('totalExpense');
        
        //Get the spend Control value
        spendControl = (Decimal)[select Id, Spend_Control__c
                                 from XpenseApp__Expense_Spend_Control__c].Spend_Control__c;
    }
    
    public list<OppClass> getResults()
    {
        list<OppClass> lstResult = new list<OppClass>();
        for (AggregateResult ar: lstAR)
        {
            oppClass objOppClass = new oppClass(ar, spendControl, fullExpense);
            lstResult.add(objOppClass);
        }
        return lstResult;
    }
    
    class oppClass
    {
        public String Name
        { get;set; }
        
        public Decimal totalExpense
        { get;set; }
        
        public Decimal mySpendControl
        { get;set;}
        
        public Decimal myFullExpense
        { get;set;}
        
        public oppClass(AggregateResult myExpense, Decimal spendControl, Decimal fullExpense)
        {
            //Note that ar returns objects as results, so you need type conversion here
            Name = (String)myExpense.get('Name');
            totalExpense = (Decimal)myExpense.get('totalExpense');
            mySpendControl = spendControl;
            myFullExpense = fullExpense;
        }
    }
}