using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine
{
    public class Rule
    {
        public Rule(string name)
        {
            Name = name;
        }

        private IDictionary<string, Proposition> cache = new Dictionary<string, Proposition>();
        private Stack<IRuleElement> _stack = new Stack<IRuleElement>();


        public List<IRuleElement> Elements { get; set; } = new List<IRuleElement>();
        public string Name { get; set;  }

        public Rule AddProposition(string statement, bool value = false)
        {
            Elements.Add(new Proposition(statement, value));

            return this;
        }

        public Rule AddVariable(string name, object value = default(object))
        {
            Elements.Add(new Variable(name, value));

            return this;
        }

        public Rule AddOperator(Operators @operator)
        {
            Elements.Add(new Operator(@operator));

            return this;
        }

        public Proposition Evaluate(RuleContext context, Queue<IRuleElement> elements = default(Queue<IRuleElement>))
        {
            if (elements == null)
            {
                elements = new Queue<IRuleElement>(Elements.ToArray());
            }

            int count = elements.Count;
            int groupCount = 0;
            for (int i = 0; i < count; i++)
            {
                IRuleElement e = elements.Dequeue();
                IRuleElement element = context.Find(e.Name);
                if (e.GetType() != typeof(Operator))
                    _stack.Push(element ?? e);
                else if ((Operators)e.Value == Operators.StartGrouping)
                {
                    groupCount++;

                    var rule = new Rule($"Group_{groupCount}");
                    var proposition = rule.Evaluate(context, elements);
                    _stack.Push(proposition);
                    count = elements.Count + 1;
                }
                else if ((Operators)e.Value == Operators.EndGrouping)
                {
                    if (_stack.Count > 1)
                    {
                        throw new InvalidOperationException("Invalid group expression.");
                    }
                    return (Proposition)_stack.Pop();
                }
                else
                {
                    string cacheName = string.Join(" ", Name, context.Name);
                    if (!cache.TryGetValue(cacheName, out Proposition proposition))
                    {
                        proposition = ProcessOperator(context.Id, (Operator)e);

                        if (i == (count - 1))
                        {
                            cache.TryAdd(cacheName, proposition);
                            return proposition;
                        }
                    }

                    if (i == (count - 1))
                        return proposition;
                    else
                        _stack.Push(proposition);
                }
            }

            return (Proposition)_stack.Pop();
        }

        private Proposition ProcessOperator(Guid contextId, Operator @operator)
        {
            IRuleElement rhs = _stack.Pop();
            IRuleElement lhs = _stack.Pop();

            string propName = string.Empty;
            if ((Operators)@operator.Value == Operators.Not)
                propName = string.Join(" ", "(", @operator.Name, lhs.Name, ":", lhs.Value, ")");
            else
                propName = string.Join(" ", "(", string.Join("", lhs.Name, ":", lhs.Value), @operator.Name, string.Join("", rhs.Name, ":", rhs.Value), ")");

            return new Proposition(propName, lhs.Process(rhs, @operator));
        }
    }
}
