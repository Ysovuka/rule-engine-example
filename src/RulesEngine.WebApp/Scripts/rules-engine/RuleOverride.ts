export class RuleOverride {
    constructor(ruleName: string, value: boolean) {
        this.RuleName = ruleName;
        this.Value = value;
    }

    public RuleName: string = "";
    public Value: boolean = false;
}