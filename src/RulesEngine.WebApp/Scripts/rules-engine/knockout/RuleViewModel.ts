import * as ko from "knockout"

import { RuleElementViewModel } from "./RuleElementViewModel"
import { RuleElementTypes } from "./RuleElementTypes"
import { RuleElementConditions } from "./RuleElementConditions"
import { RuleElementOperators } from "./RuleElementOperators"

import * as RuleEngine from "../RuleEngine"

export class RuleViewModel {
    public Name: KnockoutObservable<string>;
    public Elements: KnockoutObservableArray<RuleElementViewModel>;

    constructor() {
        this.Name = ko.observable("");
        this.Elements = ko.observableArray([]);
    }

    public AddElement(): void {
        this.Elements.push(new RuleElementViewModel());
    }

    public RemoveElement(data: RuleElementViewModel): void {
        this.Elements.remove(data);
    }

    public CreateRule(): RuleEngine.Rule {
        var rule = new RuleEngine.Rule(this.Name());

        let count: number = this.Elements().length;
        let operator: RuleElementViewModel = null;
        let varCount: number = 0;
        for (let i: number = 0; i < count; i++) {
            let e: RuleElementViewModel = this.Elements()[i];
            switch (e.Type().toString()) {
                case "Operator":
                    switch (e.Operator().toString()) {
                        case "StartGrouping":
                        case "EndGrouping":
                            rule.AddOperator(RuleEngine.Operators[e.Operator().toString()]);
                            break;
                        case "And":
                        case "Not":
                        case "Or":
                        case "Xor":
                            if (varCount <= 1) {
                                operator = e;
                            }
                            else {
                                rule.AddOperator(RuleEngine.Operators[e.Operator().toString()]);
                                operator = null;
                                varCount = 0;
                            }
                            break;
                    }
                    break;
                case "Proposition":
                    varCount++;

                    rule.AddProposition(e.Name(), e.Value());

                    if (varCount == 2 && operator != null) {
                        rule.AddOperator(RuleEngine.Operators[operator.Operator().toString()]);
                        operator = null;
                        varCount = 0;
                    }
                    break;
                case "Variable":
                    varCount++;

                    rule.AddVariable("Expected" + e.Name(), e.Value());
                    rule.AddVariable(e.Name(), null);
                    rule.AddOperator(RuleEngine.Operators[e.Condition().toString()]);

                    if (varCount == 2 && operator != null) {
                        rule.AddOperator(RuleEngine.Operators[operator.Operator().toString()]);
                        operator = null;
                        varCount = 0;
                    }
                    break;
            }
        }

        if (operator != null) {
            rule.AddOperator(RuleEngine.Operators[operator.Operator().toString()]);
            operator = null;
            varCount = 0;
        }

        return rule;
    }
}