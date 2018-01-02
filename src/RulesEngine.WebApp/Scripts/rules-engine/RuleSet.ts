import { Rule } from "./Rule"
import { RuleOverride } from "./RuleOverride"
import { Proposition } from "./Proposition"
import { RuleContext } from "./RuleContext"

export class RuleSet {
    constructor(name: string) {
        this.Name = name;
    }

    public Name: string = "";
    public Rules: Array<Rule> = [];
    public RuleOverrides: Array<RuleOverride> = [];

    public AddRule(rule: Rule): RuleSet {
        this.Rules.push(rule);
        return this;
    }

    public AddRuleOverride(ruleOverride: RuleOverride): RuleSet {
        this.RuleOverrides.push(ruleOverride);
        return this;
    }

    public Evaluate(context: RuleContext): Proposition {
        let ruleResults: Array<{ name: string, value: Proposition }> = []

        let count: number = this.Rules.length;
        for (let i: number = 0; i < count; i++) {
            let rule: Rule = this.Rules[i];
            ruleResults.push({ name: rule.Name, value: rule.Evaluate(context) });
        }

        count = this.RuleOverrides.length;
        let resultCount: number = ruleResults.length;
        for (let i: number = 0; i < count; i++) {
            let ruleOverride: RuleOverride = this.RuleOverrides[i];
            for (let j: number = 0; j < resultCount; j++) {
                let result: { name: string, value: Proposition } = ruleResults[j];
                if (result.name === ruleOverride.RuleName) {
                    ruleResults[j].value = new Proposition(ruleResults[j].value.Name, ruleOverride.Value);
                }
            }
        }

        let finalResult: boolean = false;
        for (let i: number = 0; i < resultCount; i++) {
            finalResult = finalResult && <boolean>ruleResults[i].value.Value;
        }

        return new Proposition(this.Name, finalResult);
    }
}