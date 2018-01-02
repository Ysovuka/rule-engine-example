using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine.Models
{
    public class RuleViewModel
    {
        public string Name { get; set; }
        public IList<RuleElementViewModel> Elements { get; set; } = new List<RuleElementViewModel>();

        public Rule CreateRule()
        {
            var rule = new Rule(Name);

            int count = Elements.Count;
            int varCount = 0;
            RuleElementViewModel @operator = null;
            
            for (int i = 0; i < count; i++) {
                RuleElementViewModel e = Elements[i];
                switch (e.Type)
                {
                    case "Operator":
                        switch (e.Operator)
                        {
                            case "StartGrouping":
                            case "EndGrouping":
                                rule.AddOperator((Operators)Enum.Parse(typeof(Operators), e.Operator));
                                break;
                            case "And":
                            case "Not":
                            case "Or":
                            case "Xor":
                                if (varCount <= 1)
                                {
                                    @operator = e;
                                }
                                else
                                {
                                    rule.AddOperator((Operators)Enum.Parse(typeof(Operators), e.Operator));
                                    @operator = null;
                                    varCount = 0;
                                }
                                break;
                        }
                        break;
                    case "Proposition":
                        varCount++;

                        rule.AddProposition(e.Name, Convert.ToBoolean(e.Value));

                        if (varCount == 2 && @operator != null) {
                            rule.AddOperator((Operators)Enum.Parse(typeof(Operators), @operator.Operator));
                            @operator = null;
                            varCount = 0;
                        }
                        break;
                    case "Variable":
                        varCount++;

                        rule.AddVariable("Expected" + e.Name, e.Value);
                        rule.AddVariable("Actual" + e.Name, null);
                        rule.AddOperator((Operators)Enum.Parse(typeof(Operators), e.Condition));

                        if (varCount == 2 && @operator != null) {
                            rule.AddOperator((Operators)Enum.Parse(typeof(Operators), @operator.Operator));
                            @operator = null;
                            varCount = 0;
                        }
                        break;
                }
            }

            if (@operator != null) {
                rule.AddOperator((Operators)Enum.Parse(typeof(Operators), @operator.Operator));
                @operator = null;
                varCount = 0;
            }

            return rule;
        }
    }
}
