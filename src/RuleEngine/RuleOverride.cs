using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine
{
    public class RuleOverride
    {
        public RuleOverride(string ruleName, bool value)
        {
            RuleName = ruleName;
            Value = value;
        }

        public string RuleName { get; set; }
        public bool Value { get; set; }

    }
}
