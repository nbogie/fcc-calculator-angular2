import { Component, OnInit } from '@angular/core';

//TODO: one export for all of these?
import { Calculator } from '../calc/calculator';
import { State } from '../calc/state';
import { Operator } from '../calc/operator';
import { Input } from '../calc/input';

@Component({
    moduleId: module.id,
    selector: 'app-calculator',
    templateUrl: 'calculator.component.html',
    styleUrls: ['calculator.component.css']
})
export class CalculatorComponent implements OnInit {
    calc: Calculator;

    get state(): State {
        return this.calc.state;
    }
    get operator(): Operator {
        return this.calc.operator;
    }

    get operandString(): string {
        return this.calc.operandString;
    }
    get numInMem(): number {
        return this.calc.numInMem;
    }
    get display(): string {
        return this.calc.display;
    }
    get errorMsg(): string {
        return this.calc.errorMsg;
    }

    constructor() { }
    currentStateAcceptsChar(c){
        return c === 'C' || this.calc.state.acceptsInput(new Input(c));
    }
    
    currentlyAcceptedChars() {
        return '0.123456789*/+-=C'.split('').filter(c => this.calc.state.acceptsInput(new Input(c)));
    }

    ngOnInit() {
        this.calc = new Calculator();        
    }

    onClick(n) {
        console.log("clicked: " + n);
        this.calc.handleInput(n);
    }
}
