public class TotalExpensesClass {
    @AuraEnabled
    public Decimal getTotalExpenses(){
        AggregateResult expenses = [SELECT SUM(Total_Expense__c)totalExpense FROM Expense_Item__c];
        Decimal TotalExpense = (Decimal)expenses.get('totalExpense');
        return TotalExpense;
    }
}