using System;

namespace gymNotebook.Core.Domain
{
    public class Like : Entity
    {
        public Guid UserId { get; protected set; }

        protected Like()
        {
        }

        public Like(Guid userId)
        {
            UserId = userId;
        }
    }
}
