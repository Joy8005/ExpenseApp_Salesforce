public class ExpenseController {
    @AuraEnabled
    public static Decimal TotalExpenses(){
        AggregateResult expenses = [SELECT SUM(XpenseApp__Total_Expense__c)totalExpense FROM XpenseApp__Expense_Item__c];
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