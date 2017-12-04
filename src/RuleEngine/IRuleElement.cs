using System;

namespace RuleEngine
{
    public interface IRuleElement
    {
        Guid Id { get; set; }
        string Name { get; set; }
        object Value { get; set; }

        bool Process(IRuleElement lhs, Operator @operator);
    }
}
