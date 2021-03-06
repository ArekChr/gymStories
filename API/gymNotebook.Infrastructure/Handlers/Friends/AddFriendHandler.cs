﻿using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Friends;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Friends
{
    public class AddFriendHandler : ICommandHandler<AddFriend>
    {
        private readonly IFriendService _friendService;

        public AddFriendHandler(IFriendService friendService)
        {
            _friendService = friendService;
        }
        public async Task HandleAsync(AddFriend command)
        {
            await _friendService.CreateAsync(command.UserId, command.FriendId, command.Status);
        }
    }
}
