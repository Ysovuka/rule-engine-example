using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace RuleEngine
{
    public class Variable : IRuleElement
    {
        public Variable(string name, object value)
        {
            Name = name;
            Value = value;
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public object Value { get; set; }

        public bool Process(IRuleElement variable, Operator @operator)
        {
            switch (@operator.Value)
            {
                case Operators.NotEqual:
                    return NotEqual(Value, variable.Value);
                case Operators.Equal:
                    return Equal(Value, variable.Value);
                case Operators.GreaterThan:
                    return GreaterThan(Value, variable.Value);
                case Operators.GreaterThanOrEqual:
                    return GreaterThanOrEqual(Value, variable.Value);
                case Operators.LessThan:
                    return LessThan(Value, variable.Value);
                case Operators.LessThanOrEqual:
                    return LessThanOrEqual(Value, variable.Value);
                case Operators.Contains:
                    return Contains(Value, variable.Value);
                default:
                    throw new ArgumentOutOfRangeException(nameof(@operator));
            }
        }

        private bool NotEqual<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare(lhs, (T)rhs) != 0;
        }

        private bool Equal<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare(lhs, (T)rhs) == 0;
        }

        private bool GreaterThan<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare(lhs, (T)rhs) > 0;
        }

        private bool GreaterThanOrEqual<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare(lhs, (T)rhs) >= 0;
        }

        private bool LessThan<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare((T)rhs, lhs) < 0;
        }

        private bool LessThanOrEqual<T>(T lhs, object rhs)
        {
            return Comparer<T>.Default.Compare((T)rhs, lhs) <= 0;
        }

        private bool Contains<T>(T lhs, object rhs)
        {
            return lhs.ToString().Contains(((T)rhs).ToString());
        }
    }
}
