import * as ko from "knockout"

import { RuleElementOperators } from "./RuleElementOperators"
import { RuleElementConditions } from "./RuleElementConditions"
import { RuleElementTypes } from "./RuleElementTypes"
import { EnumExtensions } from "../../extensions/EnumExtensions"
import { KeyValuePair } from "../../key-value-pair/KeyValuePair"

export class RuleElementViewModel {
    constructor() {
        this.Name = ko.observable("");
        this.Value = ko.observable("");

        this.Condition = ko.observable(RuleElementConditions.LessThan);
        this.Conditions = ko.observableArray<KeyValuePair<string, string>>(EnumExtensions.GetNamesAndValues(RuleElementConditions));

        this.Type = ko.observable(RuleElementTypes.Proposition);
        this.Types = ko.observableArray<KeyValuePair<string, string>>(EnumExtensions.GetNamesAndValues(RuleElementTypes));

        this.Operator = ko.observable(RuleElementOperators.None);
        this.Operators = ko.observableArray<KeyValuePair<string, string>>(EnumExtensions.GetNamesAndValues(RuleElementOperators));
    }

    public Name: KnockoutObservable<string>;
    public Value: KnockoutObservable<any>;

    public Condition: KnockoutObservable<RuleElementConditions>;
    public Conditions: KnockoutObservableArray<KeyValuePair<string, string>>;

    public Type: KnockoutObservable<RuleElementTypes>;
    public Types: KnockoutObservableArray<KeyValuePair<string, string>>;

    public Operator: KnockoutObservable<RuleElementOperators>;
    public Operators: KnockoutObservableArray<KeyValuePair<string, string>>;

    public TypeChanged(): void {
        this.Value("");

        if (this.Type().toString() === "Operator") {
            this.Name("");
        }
        else {
            this.Operator(RuleElementOperators.None);
        }
    }
}