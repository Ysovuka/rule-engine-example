using System;
using System.Collections.Generic;
using System.Text;

namespace RuleEngine.Models
{
    public class RuleContextViewModel
    {
        public string Name { get; set; }
        public IList<RuleElementViewModel> Elements { get; set; } = new List<RuleElementViewModel>();

        public RuleContext CreateContext()
        {
            RuleContext context = new RuleContext(Name);

            foreach (var e in Elements)
            {
                context.AddVariable(e.Name, e.Value);
            }

            return context;
        }
    }
}
