using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Core.Domain
{
    public class Friend : Entity
    {
        public Guid FriendId { get; protected set; }

        public bool Pending { get; protected set; }
    }
}
