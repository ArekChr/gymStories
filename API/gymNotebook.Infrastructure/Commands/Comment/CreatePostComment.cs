using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Comment
{
    public class CreatePostComment : AuthenticatedCommandBase
    {
        public Guid PostId { get; set; }
        public string Content { get; set; }
    }
}
