using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace RuleEngine
{
    public class Operator : IRuleElement
    {
        public Operator(Operators @operator)
        {
            Name = @operator.ToString();
            Value = @operator;                
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public object Value { get; set; }

        public bool Process(IRuleElement element, Operator @operator)
        {
            throw new InvalidOperationException("This operation is not available on this rule element.");
        }
    }
}
