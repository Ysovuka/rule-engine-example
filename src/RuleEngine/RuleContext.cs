using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine
{
    public class RuleContext
    {
        public RuleContext(string name)
        {
            Name = name;
        }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public List<IRuleElement> Elements { get; set; } = new List<IRuleElement>();

        public RuleContext AddProposition(string statement, bool value)
        {
            Elements.Add(new Proposition(statement, value));

            return this;
        }

        public RuleContext AddVariable(string name, object value)
        {
            Elements.Add(new Variable(name, value));

            return this;
        }

        public IRuleElement Find(string name)
        {
            int count = Elements.Count;
            for (int i = 0; i < count; i++)
            {
                var e = Elements[i];
                if (e.Name == name)
                    return e;
            }

            return default(IRuleElement);
        }

        public RuleContext Append(RuleContext context)
        {
            foreach (var e in context.Elements)
            {
                Elements.Add(e);
            }

            return this;
        }
    }
}
