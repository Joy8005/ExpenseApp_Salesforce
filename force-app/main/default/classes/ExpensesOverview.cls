public class ExpensesOverview {
    @AuraEnabled
    public static List<Decimal> getMonthExpenses(){
        Date myDate = Date.today();
        Date weekStart = myDate.toStartofWeek();
        
        List<Decimal> expensesOverview = new List<Decimal>();
        
        AggregateResult weekExpense = [select sum(XpenseApp__Expense_Amount__c) weekExpense
                                       from XpenseApp__Expense__c
                                       where XpenseApp__Expense_Date__c = THIS_WEEK];
        expensesOverview.add((Decimal)weekExpense.get('weekExpense'));
        
        AggregateResult monthExpense = [select sum(XpenseApp__Expense_Amount__c) monthExpense
                                        from XpenseApp__Expense__c
                                        where XpenseApp__Expense_Date__c = THIS_MONTH];
        expensesOverview.add((Decimal)monthExpense.get('monthExpense'));
        
        AggregateResult yearExpense = [select sum(XpenseApp__Expense_Amount__c) yearExpense
                                       from XpenseApp__Expense__c
                                       where XpenseApp__Expense_Date__c = THIS_YEAR];
        expensesOverview.add((Decimal)yearExpense.get('yearExpense'));
        
        for(Integer i=0; i<expensesOverview.size(); i++){
            if(expensesOverview[i] == null){
                expensesOverview[i] = 0.00;
            }
        }
        
        return expensesOverview;
        
    }
}