using System;

namespace gymNotebook.Core.Exceptions
{
    public abstract class GnException : Exception
    {
        public string Code { get; }

        protected GnException()
        {
        }

        public GnException(string code)
        {
            Code = code;
        }

        public GnException(string message, params object[] args) : this(string.Empty, message, args)
        {
        }

        public GnException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        public GnException(Exception innerException, string message, params object[] args) 
            : this(innerException, string.Empty, message, args)
        {
        }

        public GnException(Exception innerException, string code, string message, params object[] args) 
            : base(string.Format(message, args), innerException)
        {
            Code = code;
        }
    }
}
