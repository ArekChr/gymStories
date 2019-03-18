using gymNotebook.Infrastructure.Commands;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class CommentDto : IResult
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string ImageURL { get; set; }
        public string Content { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}