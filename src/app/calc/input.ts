import { Operator, AddOperator, SubtractOperator, MultiplyOperator, DivideOperator } from './operator';

export class Input {
    constructor(private c: string) { }

    isPoint() {
        return this.c == '.';
    }
    isDigit() {
        return /\d/.test(this.c);
    }
    isMinus() {
        return this.c == '-';
    }

    isOperator() {
        return /[+\-*/]/.test(this.c);
    }
    asChar() {
        return this.c;
    }
    parseAsDigit() {
        return parseInt(this.c);
    }
    parseAsOperator() {
        console.log("parsing as operator: " + this.c);
        switch (this.c) {
            case "+":
                return new AddOperator();
            case "-":
                return new SubtractOperator();
            case "/":
                return new DivideOperator();
            case "*":
                return new MultiplyOperator();
            default:
                throw "Unknown operator: " + this.c;
        }
    }
    isNumericComponent() {
        return this.isPoint() || this.isDigit();
    }
}
