import { Input } from './input';
import { Calculator } from './calculator';

export interface State {
    acceptsInput(inp: Input): boolean;
    consumeInput(inp: Input): void;
    name(): string;
}

abstract class BaseState implements State {
    constructor(protected calc: Calculator) { }
    abstract acceptsInput(inp: Input): boolean;
    abstract consumeInput(inp: Input): void;
    abstract name(): string;

}

export class StateAwaitOperandStart extends BaseState {
    name() { return 'StateAwaitOperandStart'; };

    acceptsInput(inp: Input): boolean {
        return inp.isDigit() || inp.isMinus();
    }
    consumeInput(inp): void {
        this.calc.operandString += inp.asChar();
        console.log("opStr: " + this.calc.operandString);
        let ctor = null;

        if (inp.isMinus()) {
            ctor = StateAwaitDigitOrPoint;
        } else {
            ctor = StateAwaitEither;
        }
        this.calc.changeState(new ctor(this.calc));
    }
}
//This should probably be a composite state that delegates.
export class StateAwaitEither extends BaseState {
    name() { return 'StateAwaitEither'; };


    acceptsInput(inp) {
        return inp.isDigit() || (inp.isPoint() && !this.calc.operandStringHasPoint()) || inp.isOperator();
    }
    consumeInput(inp: Input): void {
        if (inp.isOperator()) {
            this.calc.finishAnyPreviousOperation();
            this.calc.operator = inp.parseAsOperator();
            this.calc.display = "" + this.calc.operator;
            this.calc.changeState(new StateAwaitOperandStart(this.calc));
        } else {
            this.calc.operandString += inp.asChar();
        }
    }
}
//This should probably be a composite state that delegates.
export class StateAwaitDigitOrPoint extends BaseState {
    name() { return 'StateAwaitDigitOrPoint'; };

    acceptsInput(inp) {
        return (inp.isPoint() && !this.calc.operandStringHasPoint()) || inp.isDigit();
    }
    consumeInput(inp: Input): void {
        //TODO: guard against illegal number strings e.g. "13...41"
        this.calc.operandString += inp.asChar();
        this.calc.changeState(new StateAwaitEither(this.calc));
    }
}
