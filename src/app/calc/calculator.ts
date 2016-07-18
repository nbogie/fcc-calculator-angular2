import { Input } from './input';
import { Operator } from './operator';
import { StateAwaitOperandStart, State }  from './state';

class Error {
    static ILLEGAL_INPUT = "Illegal Input";
    static ILLEGAL_INPUT_FOR_STATE = "Illegal Input for current state";
}

export class Calculator {
    state: State;
    operator: Operator;
    operandString: string;
    numInMem: number;
    display: string;
    errorMsg: string;

    get operand(): number {
        return -1;
    }

    constructor() {
        this.resetState();
    }

    changeState(st) {
        console.log("changeState() to ", st);
        this.state = st;
    }
    finishAnyPreviousOperation() {
        //we MAY have a previous *operation*, waiting its second arg to complete        
        //IF we have a previous operation, we WILL have a *numInMem*, the op's first arg.
        let newArg = parseFloat(this.operandString);
        this.operandString = "";
        if (this.operator) {
            let res = this.operator.apply(this.numInMem, newArg);
            this.numInMem = res;
            this.display = "res: " + res;
        } else {
            this.numInMem = newArg;
            this.display = "";
        }
    }
    operandStringHasPoint() {
        return this.operandString && /[.]/.test(this.operandString);    
    }

    resetState() {
        this.state = new StateAwaitOperandStart(this);
        this.numInMem = null;
        this.operandString = "";
        this.operator = null;
        this.display = "";
        this.numInMem = null;
        this.errorMsg = "";
    }


    indicateError(err) {
        console.log("Error: " + err);
        this.errorMsg = err;
    }

    handleInput(key) {
        console.log("handling input: " + key);
        this.errorMsg = "";
        if (/^[+\-/*.0-9C]$/.test(key)) {
            if (key === 'C') {
                this.resetState();
            } else {
                let input = new Input(key);
                if (this.state.acceptsInput(input)) {
                    console.log("current state accepts input of ", + key);
                    console.log("consuming: ", key);
                    this.state.consumeInput(input);
                    console.log("operator is now: " + this.operator);                 
                } else {
                    console.log("illegal input for current state...");
                    this.indicateError(Error.ILLEGAL_INPUT_FOR_STATE);
                }
            }
        } else {
            this.indicateError(Error.ILLEGAL_INPUT);
        }
    }
}
