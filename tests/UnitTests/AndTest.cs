using Microsoft.VisualStudio.TestTools.UnitTesting;
using RuleEngine;

namespace UnitTests
{
    [TestClass]
    public class AndTest
    {
        [TestMethod]
        public void IsEqual()
        {
            var rule = new Rule("IsCat")
                .AddVariable("ExpectedAnimal", "Cat")
                .AddVariable("ActualAnimal")
                .AddOperator(Operators.Equal);

            var ruleContext = new RuleContext("IsCat")
                .AddVariable("ExpectedAnimal", "Cat")
                .AddVariable("ActualAnimal", "Cat");

            var proposition = rule.Evaluate(ruleContext);
            Assert.IsTrue((bool)proposition.Value);
        }

        [TestMethod]
        public void IsNotEqual()
        {
            var rule = new Rule("IsCat")
                .AddVariable("ExpectedAnimal", "Dog")
                .AddVariable("ActualAnimal")
                .AddOperator(Operators.NotEqual);

            var ruleContext = new RuleContext("IsCat")
                .AddVariable("ActualAnimal", "Cat");

            var proposition = rule.Evaluate(ruleContext);
            Assert.IsTrue((bool)proposition.Value);
        }

        [TestMethod]
        public void IsGreaterThan()
        {
            var rule = new Rule("32GreaterThan5")
                .AddVariable("LHS", 32)
                .AddVariable("RHS")
                .AddOperator(Operators.GreaterThan);

            var ruleContext = new RuleContext("32GreaterThan5")
                .AddVariable("RHS", 5);

            var proposition = rule.Evaluate(ruleContext);
            Assert.IsTrue((bool)proposition.Value);

        }

        [TestMethod]
        public void ComplexTest()
        {
            var rule = new Rule("DougIs30")
                .AddVariable("ExpectedPerson", "Doug")
                .AddVariable("ActualPerson")
                .AddOperator(Operators.Equal)
                .AddVariable("ExpectedAge", 30)
                .AddVariable("ActualAge")
                .AddOperator(Operators.Equal)
                .AddOperator(Operators.And);

            var dougIs29 = new RuleContext("DougIsNot30")
                .AddVariable("ActualPerson", "Doug")
                .AddVariable("ActualAge", 29);

            var dougIs30 = new RuleContext("DougIs30")
                .AddVariable("ActualPerson", "Doug")
                .AddVariable("ActualAge", 30);

            var dougIs40 = new RuleContext("DougIs40")
                .AddVariable("ActualPerson", "Doug")
                .AddVariable("ActualAge", 40);

            var rule2 = new Rule("32GreaterThan5")
                .AddVariable("LHS", 32)
                .AddVariable("RHS")
                .AddOperator(Operators.GreaterThan);

            var rule2Context = new RuleContext("32GreaterThan5")
                .AddVariable("RHS", 5);

            var rule2Context2 = new RuleContext("32GreaterThan43")
                .AddVariable("RHS", 43);

            var rule3 = new Rule("ContainsDog")
                .AddVariable("Values", "Dog, Cat, Lizard, Fox")
                .AddVariable("Value")
                .AddOperator(Operators.Contains);

            var rule3Context = new RuleContext("ContainsLizard")
                .AddVariable("Value", "Lizard");

            for (int i = 0; i < 1000000; i++)
            {
                var propositionDougIs29 = rule.Evaluate(dougIs29);
                Assert.IsFalse((bool)propositionDougIs29.Value);

                var propositionDougIs30 = rule.Evaluate(dougIs30);
                Assert.IsTrue((bool)propositionDougIs30.Value);

                var propositionDougIs40 = rule.Evaluate(dougIs40);
                Assert.IsFalse((bool)propositionDougIs40.Value);

                var propositionRule2Context = rule2.Evaluate(rule2Context);
                Assert.IsTrue((bool)propositionRule2Context.Value);

                var propositionRule2Context2 = rule2.Evaluate(rule2Context2);
                Assert.IsFalse((bool)propositionRule2Context2.Value);

                var propositionRule3Context = rule3.Evaluate(rule3Context);
                Assert.IsTrue((bool)propositionRule3Context.Value);
            }
        }
    }
}
