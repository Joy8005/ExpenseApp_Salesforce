public class ExpApp_ExpenseController {
    @AuraEnabled
    public static Decimal ExpApp_TotalExpenses(){
        AggregateResult expenses = [SELECT SUM(Total_Expense__c)totalExpense FROM Expense_Item__c];
        Decimal TotalExpense = (Decimal)expenses.get('totalExpense');
        return TotalExpense;
    }
    
    @AuraEnabled
    public static User getUserInfo(){
        return [select Id, Name, SmallPhotoUrl, FullPhotoUrl
                from User
                where Id = :UserInfo.getUserId()];
    }
     
}