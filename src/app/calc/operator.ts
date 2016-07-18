//TODO: get rid of unnecessary constructor use
//TODO: find best pattern for these singleton instances of the operators.
export abstract class Operator {

    abstract apply(a: number, b: number);
    abstract symbol(): string;
    toString(): string {
        return this.symbol();
    }
}

export class AddOperator extends Operator {
    constructor() { super() }

    symbol() { return "+"; }
    apply(a, b) {
        return a + b;
    }
}
export class SubtractOperator extends Operator {
    constructor() { super() }
    symbol() { return "-"; }
    apply(a, b) {
        return a - b;
    }
}
export class DivideOperator extends Operator {
    constructor() { super() }
    symbol() { return "/"; }
    apply(a, b) {
        return a / b;
    }
}
export class MultiplyOperator extends Operator {
    constructor() { super() }
    symbol() { return "*"; }
    apply(a, b) {
        return a * b;
    }
}