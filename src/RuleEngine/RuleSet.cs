using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine
{
    public class RuleSet
    {
        public RuleSet(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
        public IList<Rule> Rules { get; set; } = new List<Rule>();
        public IList<RuleOverride> RuleOverrides { get; set; } = new List<RuleOverride>();

        public RuleSet AddRule(Rule rule)
        {
            Rules.Add(rule);

            return this;
        }

        public RuleSet AddRuleOverride(RuleOverride ruleOverride)
        {
            RuleOverrides.Add(ruleOverride);

            return this;
        }
            
        public Proposition Evaluate(RuleContext context)
        {
            IDictionary<string, Proposition> ruleResults = new Dictionary<string, Proposition>();
            foreach (var r in Rules)
            {
                ruleResults.Add(r.Name, r.Evaluate(context));
            }

            foreach(var ro in RuleOverrides)
            {
                ruleResults.TryGetValue(ro.RuleName, out Proposition result);
                if (result != null)
                    result.Value = ro.Value;
            }

            bool finalResult = false;
            foreach(var pair in ruleResults)
            {
                finalResult = finalResult && (bool)pair.Value.Value;
            }
            return new Proposition(Name, finalResult);
        }
    }
}
