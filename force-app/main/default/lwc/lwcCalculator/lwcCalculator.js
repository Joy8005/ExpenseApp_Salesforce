import { LightningElement, track } from 'lwc';

export default class LwcCalculator extends LightningElement {
    firstNumber;
    secondNumber;
    @track finalAnswer;
    @track currentResult;
    @track showResults = false;
    @track resultsArray = [];


    numberChangeHandler(event){
        const inputboxName = event.target.name;
        if(inputboxName === "firstNumber"){
            this.firstNumber = event.target.value;
        }else if(inputboxName === "secondNumber"){
            this.secondNumber = event.target.value;
        }
    }

    addHandler(){
        const addFirstNumber = parseInt(this.firstNumber);
        const addSecondNumber = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of ' + 
                                addFirstNumber + 
                                ' + ' + 
                                addSecondNumber + 
                                ' is ' + 
                                (addFirstNumber+addSecondNumber);
        this.resultsArray.push(this.currentResult);
    }

    substractHandler(){
        const addFirstNumber = parseInt(this.firstNumber);
        const addSecondNumber = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of ' + 
                                addFirstNumber + 
                                ' - ' + 
                                addSecondNumber + 
                                ' is ' + 
                                (addFirstNumber-addSecondNumber);
        this.resultsArray.push(this.currentResult);
    }

    multiplyHandler(){
        const addFirstNumber = parseInt(this.firstNumber);
        const addSecondNumber = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of ' + 
                                addFirstNumber + 
                                ' * ' + 
                                addSecondNumber + 
                                ' is ' + 
                                (addFirstNumber*addSecondNumber);
        this.resultsArray.push(this.currentResult);
    }

    divideHandler(){
        const addFirstNumber = parseInt(this.firstNumber);
        const addSecondNumber = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of ' + 
                                addFirstNumber + 
                                ' / ' + 
                                addSecondNumber + 
                                ' is ' + 
                                (addFirstNumber/addSecondNumber);
        this.resultsArray.push(this.currentResult);
    }

    showAllResultsCheckboxHandler(event){
        this.showResults = event.target.checked;
    }


}