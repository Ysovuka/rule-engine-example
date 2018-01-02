using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine.Models
{
    public class RuleElementViewModel
    {
        public string Name { get; set; }
        public object Value { get; set; }

        public string Condition { get; set; }
        public string Type { get; set; }
        public string Operator { get; set; }
    }
}
