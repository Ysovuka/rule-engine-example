import * as RuleEngine from "./RuleEngine"
import { expect } from 'chai';
import 'mocha';

describe('Complex Rule Test', () => {

    it('Is either a cat or dog and under 30 age', () => {
        let rule: RuleEngine.Rule = new RuleEngine.Rule('IsCatOrDogUnder30')
            .AddOperator(RuleEngine.Operators.StartGrouping)
            .AddVariable("ExpectedAnimal", "Cat")
            .AddVariable("Animal", "")
            .AddOperator(RuleEngine.Operators.Equal)
            .AddVariable("ExpectedAnimal", "Dog")
            .AddVariable("Animal", "")
            .AddOperator(RuleEngine.Operators.Equal)
            .AddOperator(RuleEngine.Operators.Or)
            .AddOperator(RuleEngine.Operators.EndGrouping)
            .AddVariable("ExpectedAge", "30")
            .AddVariable("Age", "")
            .AddOperator(RuleEngine.Operators.LessThanOrEqual)
            .AddOperator(RuleEngine.Operators.And);

        let context: RuleEngine.RuleContext = new RuleEngine.RuleContext("CatUnder30")
            .AddVariable("Animal", "Cat")
            .AddVariable("Age", "25");

        const result = rule.Evaluate(context).Value;
        expect(result).to.equal(true);
    })
});