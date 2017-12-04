using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine
{
    public class Proposition : IRuleElement
    {
        public Proposition(string name, object value)
        {
            Name = name;
            Value = value;
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public object Value { get; set; }

        public bool Process(IRuleElement inProposition, Operator @operator)
        {
            switch (@operator.Value)
            {
                case Operators.And:
                    return And((bool)Value, (bool)inProposition.Value);
                case Operators.Not:
                    return Not((bool)Value);
                case Operators.Or:
                    return Or((bool)Value, (bool)inProposition.Value);
                case Operators.Xor:
                    return Xor((bool)Value, (bool)inProposition.Value);
                default:
                    throw new ArgumentOutOfRangeException(nameof(@operator));
            }
        }

        private bool And(bool lhs, bool rhs) => lhs && rhs;

        private bool Or(bool lhs, bool rhs) => lhs || rhs;

        private bool Xor(bool lhs, bool rhs) => lhs != rhs;

        private bool Not(bool lhs) => !lhs;
    }
}
