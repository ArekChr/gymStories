using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class CommentDto
    {
        public Guid UserId { get; set; }
        public string Content { get; set; }
    }
}