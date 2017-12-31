using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace RuleEngine
{
    public enum Operators
    {
        [DisplayName("And")]
        And = 0,
        [DisplayName("Or")]
        Or = 1,
        [DisplayName("Not")]
        Not = 2,
        [DisplayName("Xor")]
        Xor = 3,
        [DisplayName("Equal")]
        Equal = 4,
        [DisplayName("NotEqual")]
        NotEqual = 5,
        [DisplayName("LessThan")]
        LessThan = 6,
        [DisplayName("GreaterThan")]
        GreaterThan = 7,
        [DisplayName("LessThanOrEqual")]
        LessThanOrEqual = 8,
        [DisplayName("GreaterThanOrEqual")]
        GreaterThanOrEqual = 9,

        [DisplayName("Contains")]
        Contains = 10,

        [DisplayName("StartGrouping")]
        StartGrouping = 11,
        [DisplayName("EndGrouping")]
        EndGrouping = 12,
    }
}
