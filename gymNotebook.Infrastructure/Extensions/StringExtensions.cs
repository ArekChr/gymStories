using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static bool Empty(this string value)
            => string.IsNullOrWhiteSpace(value);
    }
}
