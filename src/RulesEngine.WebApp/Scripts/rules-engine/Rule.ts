import { Describer } from "../describer/Describer"
import { IRuleElement } from "./IRuleElement"
import { Proposition } from "./Proposition"
import { Variable } from "./Variable"
import { Operators } from "./Operators"
import { Operator } from "./Operator"
import { RuleContext } from "./RuleContext"

export class Rule {
    constructor(name: string) {
        this.Name = name;
    }

    private _stack: Array<IRuleElement> = [];

    public Name: string = "";
    public Elements: Array<IRuleElement> = [];

    public AddProposition(statement: string, value: boolean): Rule {
        this.Elements.push(new Proposition(statement, value));
        return this;
    }

    public AddVariable(name: string, value: any): Rule {
        this.Elements.push(new Variable(name, value));
        return this;
    }

    public AddOperator(operator: Operators): Rule {
        this.Elements.push(new Operator(operator));
        return this;
    }

    public Evaluate(context: RuleContext, elements: Array<IRuleElement> = null): Proposition {
        if (elements == null) {
            elements = this.Elements;
        }

        let count: number = elements.length;
        let groupCount: number = 0;
        for (let i: number = 0; i < count; i++) {
            let e: IRuleElement = elements[0];
            elements.shift();
            if (Describer.Describe(e) !== 'Operator') {
                let element: IRuleElement = context.Find(e.Name);
                this._stack.push(element == null ? e : element);
            } else if (<Operators>e.Value === Operators.StartGrouping) {
                groupCount++;

                let rule: Rule = new Rule("Group_" + groupCount.toString());
                let proposition: Proposition = rule.Evaluate(context, elements);
                this._stack.push(proposition);
                count = elements.length + 1;
            } else if (<Operators>e.Value === Operators.EndGrouping) {
                if (this._stack.length > 1) {
                    throw new SyntaxError("Invalid group expression.")
                }
                return <Proposition>this._stack.pop();
            } else {
                let proposition: Proposition = this.ProcessOperator(<Operator>e);
                this._stack.push(proposition);
            }
        }

        if (this._stack.length > 1)
            throw new EvalError("Syntax error, please evaluate the rule and try again.");

        return <Proposition>this._stack.pop();
    }

    private ProcessOperator(operator: Operator): Proposition {
        let rhs: IRuleElement = this._stack.pop();
        let lhs: IRuleElement = this._stack.pop();

        let propName: string = "";
        if (<Operators>operator.Value === Operators.Not)
            propName = "( " + operator.Name + " " + lhs.Name + ":" + lhs.Value + " )";
        else
            propName = "( " + lhs.Name + ":" + lhs.Value + " " + operator.Name + " " + rhs.Name + ":" + rhs.Value + ")";

        let value: boolean = lhs.Process(rhs, operator);
        return new Proposition(propName, value);
    }
}