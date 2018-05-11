using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Friends
{
    public class AddFriend : ICommand
    {
        public Guid UserId { get; set; }

        public Guid FriendId { get; set; }

        public Status Status { get; set; }
    }
}
