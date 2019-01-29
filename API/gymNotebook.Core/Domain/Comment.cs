using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Core.Domain
{
    public class Comment : Entity
    {
        public Guid UserId { get; protected set; }
        public string Content { get; protected set; }
    }
}
