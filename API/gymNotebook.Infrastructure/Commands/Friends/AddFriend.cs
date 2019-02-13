using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Friends
{
    public class AddFriend : AuthenticatedCommandBase
    {
        public Guid FriendId { get; set; }

        public Status Status { get; set; }
    }
}
